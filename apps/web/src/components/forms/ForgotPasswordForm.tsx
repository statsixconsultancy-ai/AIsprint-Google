"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AuthLogo,
  InputField,
  MailIcon,
  SpinnerIcon,
  AlertBanner,
} from "./AuthUI";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const validate = (): boolean => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    }
    if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setSuccessMsg("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.message || "Failed to send reset link.");
        return;
      }

      setSuccessMsg(
        "Password reset link sent! Check your email inbox (and spam folder)."
      );
    } catch {
      setServerError(
        "Something went wrong. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card p-8 sm:p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <AuthLogo />
        <h1 className="font-display text-[26px] font-bold text-surface-900 dark:text-white mt-5 tracking-tight">
          Reset your password
        </h1>
        <p className="text-surface-500 dark:text-surface-400 text-[15px] mt-1.5 max-w-xs mx-auto">
          Enter the email linked to your account and we&apos;ll send a reset link
        </p>
      </div>

      {/* Alerts */}
      {serverError && (
        <div className="mb-5">
          <AlertBanner type="error" message={serverError} />
        </div>
      )}

      {successMsg && (
        <div className="mb-5">
          <AlertBanner type="success" message={successMsg} />
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <InputField
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          error={emailError}
          icon={<MailIcon className="w-[18px] h-[18px]" />}
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-2"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <SpinnerIcon className="w-5 h-5" />
              Sending link…
            </span>
          ) : (
            "Send reset link"
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center mt-7">
        <Link
          href="/auth/signin"   // ✅ FIXED ROUTE
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-surface-500 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to sign in
        </Link>
      </div>
    </div>
  );
}