import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/+$/, '')
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const CLOUD_AUTH = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

const DEFAULT_ADMIN = {
  email: import.meta.env.VITE_ADMIN_EMAIL || 'higrovetechnologies@gmail.com',
  password: import.meta.env.VITE_ADMIN_PASSWORD || '',
  name: import.meta.env.VITE_ADMIN_NAME || 'Admin User',
}

const saveCloudSession = (session) => {
  if (session) localStorage.setItem('higrove_supabase_session', JSON.stringify(session))
  else localStorage.removeItem('higrove_supabase_session')
}

const getCloudSession = () => {
  try {
    const saved = localStorage.getItem('higrove_supabase_session')
    return saved ? JSON.parse(saved) : null
  } catch {
    localStorage.removeItem('higrove_supabase_session')
    return null
  }
}

const refreshCloudSession = async (refreshToken) => {
  if (!CLOUD_AUTH || !refreshToken) return null

  const session = await cloudRequest(
    '/auth/v1/token?grant_type=refresh_token',
    {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    },
  )

  if (session?.access_token) saveCloudSession(session)
  return session
}

const cloudRequest = async (path, options = {}, token = '') => {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token || SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data?.msg || data?.error_description || data?.message || 'Authentication failed')
  }
  return data
}

const verifyAdminUser = async (userId, accessToken) => {
  const rows = await cloudRequest(
    `/rest/v1/admin_users?user_id=eq.${encodeURIComponent(userId)}&select=user_id&limit=1`,
    {},
    accessToken,
  )
  if (!rows?.length) throw new Error('This account is not authorized as an administrator.')
  return true
}

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const hydrateCloudSession = async () => {
      const saved = getCloudSession()
      if (!CLOUD_AUTH || !saved?.access_token) return false

      let activeSession = saved
      try {
        let user
        try {
          user = await cloudRequest('/auth/v1/user', {}, activeSession.access_token)
        } catch (error) {
          if (!activeSession.refresh_token) throw error
          activeSession = await refreshCloudSession(activeSession.refresh_token)
          if (!activeSession?.access_token) throw error
          user = await cloudRequest('/auth/v1/user', {}, activeSession.access_token)
        }

        await verifyAdminUser(user.id, activeSession.access_token)

        if (cancelled) return true

        const profile = {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Admin',
        }
        setAdmin(profile)
        setIsAuthenticated(true)
        localStorage.setItem('admin_session', JSON.stringify(profile))
        window.dispatchEvent(new Event('higrove:auth'))
        return true
      } catch {
        saveCloudSession(null)
        localStorage.removeItem('admin_session')
        return false
      }
    }

    const initialize = async () => {
      const authenticated = await hydrateCloudSession()
      if (!authenticated && !cancelled) {
        const localSaved = localStorage.getItem('admin_session')
        if (localSaved && !CLOUD_AUTH) {
          try {
            setAdmin(JSON.parse(localSaved))
            setIsAuthenticated(true)
          } catch {
            localStorage.removeItem('admin_session')
          }
        }
      }
      if (!cancelled) setLoading(false)
    }

    initialize()

    return () => {
      cancelled = true
    }
  }, [])

  const login = async (email, password) => {
    if (CLOUD_AUTH) {
      const session = await cloudRequest('/auth/v1/token?grant_type=password', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      const user = session.user
      await verifyAdminUser(user.id, session.access_token)
      const profile = {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Admin',
      }
      saveCloudSession(session)
      localStorage.setItem('admin_session', JSON.stringify(profile))
      setAdmin(profile)
      setIsAuthenticated(true)
      window.dispatchEvent(new Event('higrove:auth'))
      return profile
    }

    if (
      DEFAULT_ADMIN.password &&
      email === DEFAULT_ADMIN.email &&
      password === DEFAULT_ADMIN.password
    ) {
      const session = { email, name: DEFAULT_ADMIN.name, id: 'admin-1' }
      localStorage.setItem('admin_session', JSON.stringify(session))
      setAdmin(session)
      setIsAuthenticated(true)
      return session
    }

    if (!DEFAULT_ADMIN.password) {
      throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then use your Supabase Auth admin account.')
    }

    throw new Error('Invalid email or password')
  }

  const logout = async () => {
    const session = getCloudSession()
    if (CLOUD_AUTH && session?.access_token) {
      try {
        await cloudRequest('/auth/v1/logout', { method: 'POST' }, session.access_token)
      } catch {
        // Local cleanup still completes even if the network logout fails.
      }
      saveCloudSession(null)
    }
    localStorage.removeItem('admin_session')
    setAdmin(null)
    setIsAuthenticated(false)
    window.dispatchEvent(new Event('higrove:auth'))
  }

  const updateProfile = async (updates) => {
    if (CLOUD_AUTH && getCloudSession()?.access_token) {
      const session = getCloudSession()
      const user = await cloudRequest(
        '/auth/v1/user',
        {
          method: 'PUT',
          body: JSON.stringify({
            email: updates.email || undefined,
            data: { name: updates.name },
          }),
        },
        session.access_token,
      )
      const updated = {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'Admin',
      }
      setAdmin(updated)
      localStorage.setItem('admin_session', JSON.stringify(updated))
      return updated
    }

    const updated = { ...admin, ...updates }
    localStorage.setItem('admin_session', JSON.stringify(updated))
    setAdmin(updated)
    return updated
  }

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated, loading, login, logout, updateProfile, cloudAuth: CLOUD_AUTH }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
