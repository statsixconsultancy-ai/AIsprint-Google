'use client'

type ApplicationFormProps = {
  courseType: string
  courseTitle: string
  coursePrice: string
}

export default function ApplicationForm({
  courseType,
  courseTitle,
  coursePrice,
}: ApplicationFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{courseTitle}</h2>
        <p className="text-gray-500">{coursePrice}</p>
      </div>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          Apply Now
        </button>
      </form>
    </div>
  )
}