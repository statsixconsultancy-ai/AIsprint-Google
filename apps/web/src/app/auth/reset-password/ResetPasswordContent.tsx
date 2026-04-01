'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function ResetPasswordContent() {
  const params = useSearchParams()
  const router = useRouter()

  const token = params.get('token')

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    if (!token) {
      setError('Invalid or expired reset link')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.message || 'Failed to reset password')
        return
      }

      setSuccess('Password updated successfully!')

      setTimeout(() => {
        router.push('/auth/signin')
      }, 1800)
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] p-6 sm:p-8">

        <div className="text-center mb-6">
          <h1 className="text-[1.5rem] font-semibold text-gray-900">
            Set new password
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a strong password to secure your account
          </p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="New password"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2">
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm password"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2">
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2.5 rounded-lg"
          >
            {loading ? 'Updating...' : 'Reset Password'}
          </button>

        </form>
      </div>
    </main>
  )
}