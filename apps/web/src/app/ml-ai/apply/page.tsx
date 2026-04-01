import type { Metadata } from 'next'
import ApplicationForm from '@/components/forms/ApplicationForm'

export const metadata: Metadata = {
  title: 'Apply for ML & AI Program',
  description:
    "Apply for AIsprint's Machine Learning & AI 1:1 live mentorship program. 16 weeks, 32 live sessions, guaranteed placement support.",
}

export default function MLAIApplyPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">

            {/* Left */}
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <h1 className="text-3xl font-bold mb-4">
                Apply for ML & AI Program
              </h1>
            </div>

            {/* Right */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <ApplicationForm
                  courseType="ml-ai"
                  courseTitle="ML & AI Program"
                  coursePrice="₹79,000"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}