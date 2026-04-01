'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // DELETE STATES
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)

  const handleChange = (e: any) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value })
  }

  /* ───────── PASSWORD UPDATE ───────── */
  const handlePasswordUpdate = async () => {
    setLoading(true)
    setError('')
    setMessage('')

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwords),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      setMessage('Password updated successfully ✅')

      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })

    } catch (err: any) {
      setError(err.message || 'Error updating password')
    }

    setLoading(false)
  }

  /* ───────── DELETE ACCOUNT ───────── */
  const handleDeleteAccount = async () => {
    setDeleting(true)
    setDeleteError('')

    try {
      const res = await fetch('/api/user/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmation: deleteConfirm }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      window.location.href = '/'

    } catch (err: any) {
      setDeleteError(err.message || 'Failed to delete account')
    }

    setDeleting(false)
  }

  return (
    <div className="max-w-[40rem] mx-auto px-6 py-8">

      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Settings
      </h1>

      {/* ───────── PASSWORD SECTION ───────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">

        <h2 className="text-sm font-semibold text-gray-900">
          Change Password
        </h2>

        <input
          type="password"
          name="currentPassword"
          placeholder="Current password"
          value={passwords.currentPassword}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
        />

        {/* NEW PASSWORD */}
        <div className="relative">
          <input
            type={showNewPassword ? 'text' : 'password'}
            name="newPassword"
            placeholder="New password"
            value={passwords.newPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg text-sm"
          />

          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            👁
          </button>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm password"
            value={passwords.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg text-sm"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            👁
          </button>
        </div>

        <div className="text-xs">
          {message && <span className="text-green-600">{message}</span>}
          {error && <span className="text-red-500">{error}</span>}
        </div>

        <button
          onClick={handlePasswordUpdate}
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded-lg text-sm"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>

      </div>

      {/* ───────── DANGER ZONE ───────── */}
      <div className="bg-white border border-red-200 rounded-xl p-6 mt-6 space-y-4">

        <h2 className="text-sm font-semibold text-red-600">
          Danger Zone
        </h2>

        <p className="text-xs text-gray-500">
          Type <span className="text-red-600 font-semibold">DELETE</span> to confirm.
        </p>

        <input
          type="text"
          placeholder="Type DELETE"
          value={deleteConfirm}
          onChange={(e) => setDeleteConfirm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
        />

        {deleteError && (
          <p className="text-xs text-red-500">{deleteError}</p>
        )}

        <button
          onClick={handleDeleteAccount}
          disabled={deleteConfirm !== 'DELETE' || deleting}
          className={`px-4 py-2 rounded-lg text-sm text-white ${
            deleteConfirm === 'DELETE'
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {deleting ? 'Deleting...' : 'Delete Account'}
        </button>

      </div>

    </div>
  )
}