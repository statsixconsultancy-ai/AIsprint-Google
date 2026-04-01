'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import Link from 'next/link'

export default function SignInForm() {
  const router = useRouter()
  const { signin, signinWithGoogle } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signin(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">

      {/* ✅ Google Button (FIXED ICON) */}
      <button
        onClick={signinWithGoogle}
        className="w-full h-12 rounded-xl border border-gray-200 bg-white text-sm font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition"
      >
        {/* Google SVG (NO IMAGE ERROR) */}
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.2 0 6.1 1.2 8.4 3.1l6.3-6.3C34.6 2.6 29.6 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.4 5.7C12.1 13.1 17.6 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-2.7-.4-3.9H24v7.4h12.8c-.3 2-1.8 5-5.2 7l8 6.2c4.6-4.3 7-10.6 7-16.7z"/>
          <path fill="#FBBC05" d="M10.1 28.9c-1-2-1.6-4.2-1.6-6.4s.6-4.4 1.6-6.4l-7.4-5.7C1 13.7 0 16.8 0 20s1 6.3 2.7 9.6l7.4-5.7z"/>
          <path fill="#34A853" d="M24 48c6.6 0 12.2-2.2 16.2-6l-8-6.2c-2.2 1.5-5 2.5-8.2 2.5-6.4 0-11.9-3.6-13.9-8.8l-7.4 5.7C6.6 42.6 14.6 48 24 48z"/>
        </svg>

        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 pr-10 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />

          {/* 👁 CLEAN ICON (SVG, NOT EMOJI) */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 3l18 18" />
                <path d="M10.6 10.6A3 3 0 0013.4 13.4" />
                <path d="M9.88 4.24A10.94 10.94 0 0112 4c5 0 9.27 3.11 11 8-1.04 2.94-3.18 5.26-5.88 6.5" />
                <path d="M6.1 6.1C3.93 7.57 2.26 9.64 1 12c1.73 4.89 6 8 11 8 1.61 0 3.14-.32 4.54-.9" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {/* Forgot */}
        <Link
          href="/auth/forgot-password"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Forgot password
        </Link>

        {/* Submit */}
<button
  type="submit"
  disabled={loading}
  className="w-full h-12 rounded-xl bg-brand-600 text-white font-medium text-sm 
             hover:bg-brand-700 active:scale-[0.99] 
             transition-all duration-200 
             disabled:opacity-60 disabled:cursor-not-allowed
             focus:outline-none focus:ring-2 focus:ring-brand-500/30"
>
  {loading ? 'Signing in...' : 'Continue'}
</button>

      </form>
    </div>
  )
}