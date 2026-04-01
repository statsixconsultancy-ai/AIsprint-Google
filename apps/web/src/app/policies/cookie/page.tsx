import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy — AiSprint',
  description:
    'AiSprint Cookie Policy. Learn how we use cookies and tracking technologies to improve your experience.',
}

export default function CookiePolicyPage() {
  return (
    <div className="pt-16">
      <section className="bg-gray-50 pt-20 pb-12">
        <div className="container-custom max-w-3xl">
          <h1 className="section-heading mb-2">Cookie Policy</h1>
          <p className="text-sm text-gray-400 font-body">
            Last updated: 1 January 2025
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="space-y-10 font-body text-gray-700 leading-relaxed text-sm">

            {/* Intro */}
            <div>
              <p>
                This Cookie Policy explains how AiSprint (&quot;we&quot;,
                &quot;our&quot;, or &quot;us&quot;) uses cookies and similar
                technologies when you visit our website.
              </p>
              <p className="mt-3">
                By continuing to use our website, you agree to our use of
                cookies in accordance with this policy.
              </p>
            </div>

            {/* 1 */}
            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files stored on your device when you
                visit a website. They help websites function properly, improve
                user experience, and provide analytical insights.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">
                2. Types of Cookies We Use
              </h2>

              <h3 className="font-semibold mb-2">a) Essential Cookies</h3>
              <p>
                Required for basic website functionality such as login,
                navigation, and secure access. These cannot be disabled.
              </p>

              <h3 className="font-semibold mt-5 mb-2">b) Performance & Analytics Cookies</h3>
              <p>
                These help us understand how visitors interact with our
                website, allowing us to improve performance and usability.
              </p>

              <h3 className="font-semibold mt-5 mb-2">c) Functional Cookies</h3>
              <p>
                These remember your preferences (such as language or region) to
                enhance your experience.
              </p>

              <h3 className="font-semibold mt-5 mb-2">d) Marketing Cookies</h3>
              <p>
                These may be used to deliver relevant advertisements or measure
                the effectiveness of marketing campaigns.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">
                3. Third-Party Cookies
              </h2>
              <p>
                We may use trusted third-party services such as analytics
                providers or payment gateways that may also place cookies on
                your device. These third parties have their own privacy and
                cookie policies.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">
                4. Managing Cookies
              </h2>
              <p>
                Most web browsers allow you to control cookies through browser
                settings. You may choose to block or delete cookies; however,
                doing so may affect certain features and functionality of our
                website.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">
                5. Changes to This Policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes
                will be posted on this page with an updated revision date.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">
                6. Contact Us
              </h2>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p><strong>AiSprint Support</strong></p>
                <p>Email: support@AiSprint.in</p>
                <p>Response time: Within 24 hours on business days</p>
              </div>
            </div>

          </div>

          <div className="mt-12 p-6 bg-brand-50 rounded-2xl border border-brand-100 text-center">
            <p className="text-brand-800 text-sm font-body mb-3">
              Want to understand how we handle your data?
            </p>
            <Link href="/privacy-policy" className="btn-primary">
              View Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
