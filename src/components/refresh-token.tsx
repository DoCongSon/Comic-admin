import { useEffect } from 'react'
import { ITokens } from '../providers/auth-provider'

export default function RefreshToken() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date()
      const API_URL = import.meta.env.VITE_API_URL
      const tokens: ITokens = JSON.parse(localStorage.getItem('my_tokens') || 'null')
      if (tokens && new Date(tokens.access.expires).getTime() - now.getTime() < 1000 * 60 * 10) {
        if (new Date(tokens.refresh.expires).getTime() - now.getTime() < 0) {
          // logout
          await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            body: JSON.stringify({ refreshToken: tokens.refresh.token }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
          localStorage.removeItem('my_tokens')
          clearInterval(interval)
          return
        }
        const response = await fetch(`${API_URL}/auth/refresh-tokens`, {
          method: 'POST',
          body: JSON.stringify({ refreshToken: tokens.refresh.token }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (response.ok) {
          const data = await response.json()
          localStorage.setItem('my_tokens', JSON.stringify(data))
        }
      }
    }, 1000 * 60 * 5)
    return () => clearInterval(interval)
  }, [])
  return null
}
