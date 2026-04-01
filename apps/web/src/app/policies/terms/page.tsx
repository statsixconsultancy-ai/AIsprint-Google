import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions — AiSprint',
  description: 'AiSprint Terms and Conditions. Please read these terms carefully before using our services.',
}

export default function TermsPage() {
  return (
    <div className="pt-16">
      <section className="bg-gray-50 pt-20 pb-12">
        <div className="container-custom max-w-3xl">
          <h1 className="section-heading mb-2">Terms & Conditions</h1>
          <p className="text-sm text-gray-400 font-body">Last updated: 1 January 2025</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="space-y-10 font-body text-gray-700 leading-relaxed text-sm">

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing AiSprint.in or enrolling in any AiSprint program, you agree to be bound by these Terms & Conditions, our Privacy Policy, and all applicable laws of India. If you do not agree to these terms, you may not use our services. These terms constitute a legally binding agreement between you and AiSprint Technologies Pvt. Ltd.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">2. Services Description</h2>
              <p>AiSprint provides personalized 1:1 live mentorship programs in Artificial Intelligence, Machine Learning, and Prompt Engineering. Our services include live video sessions, curriculum materials, project assignments, career support, and access to an alumni community. We reserve the right to modify, suspend, or discontinue any service with reasonable notice.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">3. Eligibility</h2>
              <p>You must be at least 16 years of age to enroll. By enrolling, you represent that all information provided in your application is accurate and complete. AiSprint reserves the right to deny enrollment or terminate access if any information is found to be false or misleading.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">4. Payment Terms</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Enrollment is confirmed only upon receipt of full payment or first EMI installment.</li>
                <li>All prices are in Indian Rupees (INR) unless otherwise specified and are inclusive of applicable GST.</li>
                <li>EMI plans are offered through third-party financial partners. AiSprint is not responsible for interest charges or penalties from EMI partners.</li>
                <li>Payments must be made before the commencement of the program unless a deferred payment plan has been agreed in writing.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">5. Scheduling and Attendance</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Sessions must be rescheduled with at least 24-hour advance notice. No-shows without notice will be counted as consumed sessions.</li>
                <li>Students may reschedule up to 4 sessions per program without penalty.</li>
                <li>AiSprint reserves the right to reschedule sessions with 24-hour notice in cases of mentor unavailability due to illness or emergencies.</li>
                <li>Programs have a validity period of 1.5× the standard program duration. Extensions beyond this require a fee.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">6. Intellectual Property</h2>
              <p>All curriculum materials, session recordings, documents, templates, and other content provided by AiSprint are the intellectual property of AiSprint Technologies Pvt. Ltd. and are licensed to enrolled students for personal educational use only. You may not:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Reproduce, redistribute, or commercially exploit any course materials</li>
                <li>Share login credentials or session recordings with third parties</li>
                <li>Record sessions without explicit written consent from your mentor</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">7. Placement Guarantee Terms</h2>
              <p>Our placement guarantee applies when ALL of the following conditions are met:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>You have completed 100% of program requirements, including all projects and assignments</li>
                <li>You have attended at least 85% of scheduled live sessions</li>
                <li>You have actively engaged with our placement team and applied to at least 15 recommended positions</li>
                <li>You have completed all provided mock interviews and implemented feedback</li>
                <li>You have made yourself available for interviews within reasonable timeframes</li>
              </ul>
              <p className="mt-3">If these conditions are met and you have not received a suitable offer within 6 months of program completion, AiSprint will provide extended placement support at no additional cost. This guarantee does not constitute a guarantee of employment.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">8. Code of Conduct</h2>
              <p>All students are expected to maintain professional and respectful conduct with mentors, staff, and other community members. AiSprint reserves the right to terminate enrollment without refund for behaviour that is:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Abusive, harassing, or threatening towards mentors or staff</li>
                <li>Involves academic dishonesty or plagiarism</li>
                <li>Violates applicable laws or regulations</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">9. Limitation of Liability</h2>
              <p>AiSprint&apos;s total liability for any claim arising from these terms shall not exceed the amount paid by you for the specific service giving rise to the claim. AiSprint shall not be liable for indirect, incidental, special, or consequential damages. We do not guarantee specific employment outcomes or salary levels.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">10. Governing Law & Jurisdiction</h2>
              <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka, India. We encourage resolution through good-faith negotiation before formal proceedings.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">11. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Material changes will be communicated via email 30 days prior to taking effect. Continued use of our services constitutes acceptance of modified terms.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">12. Contact</h2>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p><strong>AiSprint Technologies Pvt. Ltd.</strong></p>
                <p>Email: legal@AiSprint.in</p>
                <p>Address: Bengaluru, Karnataka, India – 560001</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
