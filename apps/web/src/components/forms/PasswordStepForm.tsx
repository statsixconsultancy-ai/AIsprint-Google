'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PasswordStepForm({ email }: { email: string }) {
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ✅ Password rules
  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  }

  const allValid = Object.values(rules).every(Boolean)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!allValid) return

    setLoading(true)

    try {
      // 🔥 Generate username from email
      const username =
        email.split('@')[0] +
        '_' +
        Math.random().toString(36).slice(2, 6)

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 🔥 IMPORTANT for cookies
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })

      const data = await res.json()

      console.log('SIGNUP:', data)

      // ❌ Handle error
      if (!res.ok || !data.success) {
        setError(data.message || 'Signup failed')
        return
      }

      // ✅ Success → go to dashboard
      router.push('/dashboard')

    } catch (err) {
      console.error(err)
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Password Input */}
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 px-4 pr-10 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        />

        {/* Toggle */}
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 3l18 18" />
              <path d="M10.6 10.6A3 3 0 0013.4 13.4" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* Rules */}
      <div className="space-y-2 text-sm">
        <Rule ok={rules.length} text="At least 8 characters" />
        <Rule ok={rules.upper} text="At least 1 uppercase letter" />
        <Rule ok={rules.lower} text="At least 1 lowercase letter" />
        <Rule ok={rules.number} text="At least 1 number" />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={!allValid || loading}
        className="w-full h-12 rounded-xl bg-brand-600 text-white font-medium text-sm 
                   hover:bg-brand-700 disabled:opacity-50 transition"
      >
        {loading ? 'Creating...' : 'Create account'}
      </button>

    </form>
  )
}

/* Rule Component */
function Rule({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-2 ${ok ? 'text-green-600' : 'text-gray-400'}`}>
      <span
        className={`w-4 h-4 flex items-center justify-center rounded-full text-xs ${
          ok ? 'bg-green-100' : 'bg-gray-200'
        }`}
      >
        {ok ? '✓' : '✕'}
      </span>
      {text}
    </div>
  )
}