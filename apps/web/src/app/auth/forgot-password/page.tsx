import { Metadata } from "next";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password - AIsprint",
  description: "Reset your AIsprint account password",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-8">

      {/* container */}
      <div className="w-full max-w-md">
        <ForgotPasswordForm />
      </div>

    </main>
  );
}