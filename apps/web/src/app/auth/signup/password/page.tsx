import PasswordStepForm from '@/components/forms/PasswordStepForm'

export default function PasswordPage({
  searchParams,
}: {
  searchParams: { email?: string }
}) {
  const email = searchParams.email || ''

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4">

      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-sm border">
        <PasswordStepForm email={email} />
      </div>

    </main>
  )
}