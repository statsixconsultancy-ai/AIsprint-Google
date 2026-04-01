'use client'

import { useState, useEffect } from 'react'

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    country: '',
    bio: '',
    phone: '',
    dob: '',
    profile_image_url: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  /* ───────── FETCH USER (FIXED) ───────── */
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user/profile')
      const data = await res.json()

      if (data.success) {
        const u = data.user

        setForm({
          name: u.name || '',
          email: u.email || '',
          country: u.country || '',
          bio: u.bio || '',
          phone: u.phone || '',
          dob: u.dob ? u.dob.split('T')[0] : '',
          profile_image_url: u.profile_image_url || '',
        })
      }
    }

    fetchUser()
  }, [])

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  /* ───────── SAVE PROFILE ───────── */
  const handleSubmit = async () => {
    setLoading(true)
    setSuccess('')
    setError('')

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      setForm({
        name: data.user.name || '',
        email: data.user.email || '',
        country: data.user.country || '',
        bio: data.user.bio || '',
        phone: data.user.phone || '',
        dob: data.user.dob ? data.user.dob.split('T')[0] : '',
        profile_image_url: data.user.profile_image_url || '',
      })

      setSuccess('Profile updated successfully ✅')
    } catch (err: any) {
      setError(err.message || 'Error updating profile')
    }

    setLoading(false)
  }

  /* ───────── IMAGE UPLOAD ───────── */
  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = async () => {
      const base64 = reader.result as string

      setForm(prev => ({
        ...prev,
        profile_image_url: base64,
      }))

      await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile_image_url: base64 }),
      })
    }

    reader.readAsDataURL(file)
  }

  return (
    <div className="px-6 lg:px-10 py-8 max-w-[70rem] mx-auto">

      <h1 className="text-xl font-semibold text-gray-900 mb-8">
        Profile Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-8">

        {/* LEFT */}
        <div className="bg-white border rounded-xl p-6 text-center">

          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3">
            {form.profile_image_url ? (
              <img src={form.profile_image_url} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-black text-white flex items-center justify-center text-xl font-semibold">
                {form.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>

          <p className="text-sm font-medium">{form.name}</p>
          <p className="text-xs text-gray-400 mb-4">{form.email}</p>

          <input type="file" accept="image/*" id="upload" className="hidden" onChange={handleImageUpload} />
          <label htmlFor="upload" className="text-xs px-3 py-1.5 border rounded-lg cursor-pointer">
            Change photo
          </label>

        </div>

        {/* RIGHT */}
        <div className="bg-white border rounded-xl p-6 space-y-6">

          <input name="name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
          <input name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />

          <div className="grid grid-cols-2 gap-4">
            <input name="country" value={form.country} onChange={handleChange} className="px-3 py-2 border rounded-lg" />
            <input name="phone" value={form.phone} onChange={handleChange} className="px-3 py-2 border rounded-lg" />
          </div>

          <input type="date" name="dob" value={form.dob} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />

          <textarea name="bio" value={form.bio} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />

          <div className="flex justify-between items-center">
            <div className="text-xs">
              {success && <span className="text-green-600">{success}</span>}
              {error && <span className="text-red-500">{error}</span>}
            </div>

            <button onClick={handleSubmit} className="px-5 py-2 bg-black text-white rounded-lg">
              {loading ? 'Saving...' : 'Save changes'}
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}