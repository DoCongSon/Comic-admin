import { AuthProvider, HttpError } from '@refinedev/core'

const API_URL = import.meta.env.VITE_API_URL

export interface ITokens {
  access: {
    token: string
    expires: Date
  }
  refresh: {
    token: string
    expires: Date
  }
}

export const authProvider: AuthProvider = {
  check: async () => {
    const tokens: ITokens = JSON.parse(localStorage.getItem('my_tokens') || '{}')
    if (!tokens) {
      return { authenticated: false, logout: true }
    }
    if (new Date(tokens?.refresh?.expires) < new Date()) {
      return { authenticated: false, logout: true }
    }

    return { authenticated: Boolean(tokens?.access?.token) }
  },
  // login method receives an object with all the values you've provided to the useLogin hook.
  login: async ({ email, password, remember }) => {
    if (remember) {
      localStorage.setItem('email', email)
      localStorage.setItem('password', password)
    } else {
      localStorage.removeItem('email')
      localStorage.removeItem('password')
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false }
    }

    const userInfo = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${data.access.token}`,
      },
    })

    const userData = await userInfo.json()

    if (!userInfo.ok || userData.role !== 'ADMIN') {
      return { success: false }
    }

    localStorage.setItem('my_tokens', JSON.stringify(data))
    return { success: true, redirectTo: '/' }
  },
  logout: async () => {
    const tokens: ITokens = JSON.parse(localStorage.getItem('my_tokens') || '{}')
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken: tokens.refresh.token }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    localStorage.removeItem('my_tokens')
    // Let's redirect to the login page after a successful logout.
    return { success: true, redirectTo: '/login' }
  },
  getIdentity: async () => {
    const tokens: ITokens = JSON.parse(localStorage.getItem('my_tokens') || '{}')

    const headers: HeadersInit = {
      Authorization: `Bearer ${tokens?.access?.token}`,
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      headers,
    })

    const data = await response.json()

    if (response.ok) {
      return data
    }
    return null
  },
  onError: async (error: HttpError) => {
    if (error.statusCode === 401) {
      localStorage.removeItem('my_tokens')
      return { logout: true }
    }
    return {}
  },
  // ...
}
