const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/+$/, '')

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''


// ============================================================
// SUPABASE CONFIGURATION CHECK
// ============================================================

export const isCloudConfigured = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY
)


// ============================================================
// SESSION
// ============================================================

const getSession = () => {
  try {
    const raw = localStorage.getItem(
      'higrove_supabase_session'
    )

    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}


export const getAccessToken = () =>
  getSession()?.access_token || ''


// ============================================================
// HEADERS
// ============================================================

const headers = (token = '') => ({
  apikey: SUPABASE_ANON_KEY,

  Authorization: `Bearer ${
    token || SUPABASE_ANON_KEY
  }`,

  'Content-Type': 'application/json',
})


// ============================================================
// SAFE SUPABASE REQUEST
// ============================================================

const request = async (
  path,
  options = {},
  token = ''
) => {
  if (!isCloudConfigured) {
    throw new Error(
      'Supabase is not configured'
    )
  }

  const response = await fetch(
    `${SUPABASE_URL}${path}`,
    {
      ...options,

      headers: {
        ...headers(token),
        ...(options.headers || {}),
      },
    }
  )

  // ==========================================================
  // READ RESPONSE SAFELY
  // ==========================================================

  const text = await response.text()


  // ==========================================================
  // HANDLE HTTP ERRORS
  // ==========================================================

  if (!response.ok) {
    throw new Error(
      text ||
      `Supabase request failed (${response.status})`
    )
  }


  // ==========================================================
  // HANDLE EMPTY RESPONSES
  //
  // Supabase returns empty body for:
  // - Prefer: return=minimal
  // - Some POST requests
  // - PATCH requests
  // - DELETE requests
  // - 204 No Content
  // ==========================================================

  if (
    response.status === 204 ||
    !text ||
    text.trim() === ''
  ) {
    return null
  }


  // ==========================================================
  // PARSE JSON SAFELY
  // ==========================================================

  try {
    return JSON.parse(text)
  } catch (error) {
    throw new Error(
      `Invalid JSON response from Supabase: ${text}`
    )
  }
}


// ============================================================
// SUPABASE CONNECTION TEST
// ============================================================

export const checkSupabaseConnection =
  async () => {

    if (!isCloudConfigured) {
      return {
        configured: false,
        connected: false,
        message:
          'Supabase environment variables are missing.',
      }
    }

    try {
      await request(
        '/rest/v1/site_content?select=key&limit=1',
        {
          method: 'GET',
        }
      )

      return {
        configured: true,
        connected: true,
        message:
          'Supabase connection is working.',
      }
    } catch (error) {

      return {
        configured: true,
        connected: false,
        message:
          error?.message ||
          'Supabase connection failed.',
      }
    }
  }


// ============================================================
// GET SINGLE CONTENT
// ============================================================

export const getContent = async (key) => {

  const rows = await request(
    `/rest/v1/site_content?key=eq.${encodeURIComponent(
      key
    )}&select=data&limit=1`,

    {
      method: 'GET',
    }
  )

  return rows?.[0]?.data ?? null
}


// ============================================================
// SAVE CONTENT
// ============================================================

export const saveContent = async (
  key,
  data
) => {

  const token = getAccessToken()

  if (!token) {
    throw new Error(
      'Admin session required'
    )
  }

  return request(
    '/rest/v1/site_content?on_conflict=key',

    {
      method: 'POST',

      headers: {
        Prefer:
          'resolution=merge-duplicates,return=minimal',
      },

      body: JSON.stringify({
        key,
        data,
      }),
    },

    token
  )
}


// ============================================================
// GET MULTIPLE CONTENT ITEMS
// ============================================================

export const getAllContent = async (
  keys
) => {

  if (!isCloudConfigured) {
    return {}
  }


  const encoded = keys
    .map(
      (key) =>
        `"${key.replace(
          /"/g,
          '\\"'
        )}"`
    )
    .join(',')


  const rows = await request(

    `/rest/v1/site_content?key=in.(${encodeURIComponent(
      encoded
    )})&select=key,data`,

    {
      method: 'GET',
    }
  )


  return Object.fromEntries(

    (rows || []).map(
      (row) => [
        row.key,
        row.data,
      ]
    )
  )
}


// ============================================================
// GET ENQUIRIES
// ============================================================

export const getEnquiries = async () => {

  const token = getAccessToken()

  if (!token) {
    return []
  }


  const rows = await request(

    '/rest/v1/site_enquiries?select=*&order=created_at.desc',

    {
      method: 'GET',
    },

    token
  )


  return (rows || []).map(
    (row) => ({

      id: row.id,

      name: row.name,

      email: row.email,

      phone:
        row.phone || '',

      company:
        row.company || '',

      websiteType:
        row.website_type || '',

      industry:
        row.industry || '',

      features:
        row.features || '',

      message:
        row.message || '',

      status:
        row.status || 'New',

      notes:
        row.notes || '',

      createdAt:
        row.created_at,

    })
  )
}


// ============================================================
// INSERT ENQUIRY
// ============================================================

export const insertEnquiry = async (
  enquiry
) => {

  if (!isCloudConfigured) {
    throw new Error(
      'Supabase is not configured'
    )
  }


  return request(

    '/rest/v1/site_enquiries',

    {
      method: 'POST',

      headers: {
        Prefer:
          'return=representation',
      },

      body: JSON.stringify(
        enquiry
      ),
    }
  )
}


// ============================================================
// UPDATE ENQUIRY
// ============================================================

export const updateEnquiryRemote =
  async (
    id,
    updates
  ) => {

    const token =
      getAccessToken()


    if (!token) {
      throw new Error(
        'Admin session required'
      )
    }


    return request(

      `/rest/v1/site_enquiries?id=eq.${encodeURIComponent(
        id
      )}`,

      {
        method: 'PATCH',

        headers: {
          Prefer:
            'return=minimal',
        },

        body: JSON.stringify(
          updates
        ),
      },

      token
    )
  }


// ============================================================
// DELETE ENQUIRY
// ============================================================

export const deleteEnquiryRemote =
  async (id) => {

    const token =
      getAccessToken()


    if (!token) {
      throw new Error(
        'Admin session required'
      )
    }


    return request(

      `/rest/v1/site_enquiries?id=eq.${encodeURIComponent(
        id
      )}`,

      {
        method: 'DELETE',

        headers: {
          Prefer:
            'return=minimal',
        },
      },

      token
    )
  }