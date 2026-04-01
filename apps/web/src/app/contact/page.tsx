'use client'

import type { Metadata } from 'next'
import { useState } from 'react'

const contactInfo = [
  {
    icon: '📧',
    label: 'Email Us',
    value: 'admission@goaisprint.com',
    sub: 'We reply within 24 hours on business days',
    href: 'mailto:admission@goaisprint.com',
  },
  {
    icon: '📞',
    label: 'Call / WhatsApp',
    value: '+91 73050 15593',
    sub: 'Mon–Fri 9AM–7PM IST',
    href: 'tel:+917305015593',
  },
  {
    icon: '📍',
    label: 'Registered Office',
    value: 'Chennai, Tamil Nadu',
    sub: 'India · IN · 600032',
    href: null,
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1000))
    setStatus('success')
  }

  return (
    <div className="pt-16">
      <section className="bg-white pt-20 pb-16">
        <div className="container-custom max-w-4xl text-center">
          <span className="badge-blue mb-4">Contact</span>
          <h1 className="section-heading mt-3 mb-4">Get in Touch</h1>
          <p className="section-subheading mx-auto">
            Whether you have a question about our courses, pricing, or partnerships — we&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-xl font-bold text-neutral-950 mb-6">Contact Information</h2>
              <div className="flex flex-col gap-5">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 font-body uppercase tracking-wide mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-medium text-neutral-950 hover:text-brand-600 transition-colors font-body text-sm">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-neutral-950 font-body text-sm">{item.value}</p>
                      )}
                      <p className="text-xs text-gray-400 font-body mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-5 bg-brand-50 rounded-2xl border border-brand-100">
                <p className="font-heading font-bold text-sm text-brand-900 mb-2">Admissions Queries</p>
                <p className="text-sm text-brand-700 font-body">
                  For course-specific questions, use our direct apply pages to get the fastest response from our admissions team.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="font-heading text-xl font-bold text-neutral-950 mb-6">Send a Message</h2>

                {status === 'success' ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-neutral-950 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 text-sm font-body">We&apos;ll get back to you within 24 hours on business days.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="label">Full Name</label>
                        <input id="contact-name" name="name" type="text" required placeholder="Your name" value={form.name} onChange={handleChange} className="input-field" />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="label">Email Address</label>
                        <input id="contact-email" name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={handleChange} className="input-field" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="label">Subject</label>
                      <input id="contact-subject" name="subject" type="text" required placeholder="What is your inquiry about?" value={form.subject} onChange={handleChange} className="input-field" />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="label">Message</label>
                      <textarea id="contact-message" name="message" rows={5} required placeholder="Tell us more about your question or requirement..." value={form.message} onChange={handleChange} className="input-field resize-none" />
                    </div>
                    <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full justify-center py-4">
                      {status === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
