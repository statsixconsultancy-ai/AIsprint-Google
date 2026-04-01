'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface User {
  id: string
  name: string
  email: string
  username: string
  country?: string
  bio?: string
  profile_image_url?: string
  phone?: string
  dob?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signin: (email: string, password: string) => Promise<void>
  signup: (username: string, email: string, password: string) => Promise<void>
  signout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // ✅ Load user on app start
  useEffect(() => {
    refreshUser()
  }, [])

  // ✅ Fetch logged-in user (FIXED)
  const refreshUser = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'include', // 🔥 VERY IMPORTANT
      })

      if (!res.ok) {
        setUser(null)
        return
      }

      const data = await res.json()

      if (data.success) {
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Failed to refresh user:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ Email login
  const signin = async (email: string, password: string) => {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // 🔥 important
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!data.success) {
      throw new Error(data.message || 'Sign in failed')
    }

    setUser(data.user)
  }

  // ✅ Email signup
  const signup = async (
    username: string,
    email: string,
    password: string
  ) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // 🔥 important
      body: JSON.stringify({ username, email, password }),
    })

    const data = await res.json()

    if (!data.success) {
      throw new Error(data.message || 'Sign up failed')
    }

    setUser(data.user)
  }

  // ✅ Logout
  const signout = async () => {
    const res = await fetch('/api/auth/signout', {
      method: 'POST',
      credentials: 'include', // 🔥 important
    })

    const data = await res.json()

    if (!data.success) {
      throw new Error(data.message || 'Sign out failed')
    }

    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signin,
        signup,
        signout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ✅ Hook
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}