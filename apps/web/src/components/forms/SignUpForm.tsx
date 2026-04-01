'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUpForm() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  // 🔥 GOOGLE LOGIN
  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google'
  }

  // ✅ EMAIL STEP (FIXED - no async, no loading)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Email is required')
      return
    }

    router.push(
      `/auth/signup/password?email=${encodeURIComponent(email)}`
    )
  }

  return (
    <div className="space-y-5">

      {/* 🔥 Google Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg p-3 text-sm font-medium bg-white hover:bg-gray-100 transition"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      {/* Email Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Email address
          </label>

          <input
            type="email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* ✅ Continue Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          Continue
        </button>

      </form>
    </div>
  )
}