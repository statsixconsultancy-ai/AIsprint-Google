'use client'

import { useState } from 'react'

type ApplicationFormProps = {
  courseType: string
  courseTitle: string
  coursePrice: string
  onSuccess?: () => void
}

export default function ApplicationForm({
  courseType,
  courseTitle,
  coursePrice,
  onSuccess,
}: ApplicationFormProps) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget

    setLoading(true)
    setErrors({})

    const formData = new FormData(form)

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      experience: formData.get('experience'),
      career_goal: formData.get('career_goal'),
      course_type: courseType,
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.errors) {
          const fieldErrors: Record<string, string> = {}
          data.errors.forEach((err: any) => {
            fieldErrors[err.field] = err.message
          })
          setErrors(fieldErrors)
        }

        throw new Error(data.message || 'Something went wrong')
      }

      // ✅ SUCCESS FLOW
      setSubmitted(true)

      // Close modal after showing success
      setTimeout(() => {
        onSuccess?.()
      }, 1200)

    } catch (err: any) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ✅ SUCCESS SCREEN (NO FORM RENDERED)
  if (submitted) {
    return (
      <div className="text-center py-10 space-y-4">
        <h2 className="text-xl font-semibold">
          🎉 Application Submitted!
        </h2>
        <p className="text-gray-500">
          Our advisor will contact you soon.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">{courseTitle}</h2>
        <p className="text-gray-500">{coursePrice}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg"
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg"
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        <div>
          <select
            name="experience"
            className="w-full p-3 border rounded-lg"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select Experience Level
            </option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {errors.experience && (
            <p className="text-red-500 text-sm">
              {errors.experience}
            </p>
          )}
        </div>

        <div>
          <textarea
            name="career_goal"
            placeholder="What is your career goal?"
            className="w-full p-3 border rounded-lg"
            rows={4}
            required
          />
          {errors.career_goal && (
            <p className="text-red-500 text-sm">
              {errors.career_goal}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Apply Now'}
        </button>
      </form>
    </div>
  )
}