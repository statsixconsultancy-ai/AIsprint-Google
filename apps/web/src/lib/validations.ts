import { z } from 'zod'

export const LeadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number')
    .or(z.string().regex(/^\+[1-9]\d{7,14}$/, 'Enter a valid international number')),
  experience: z.enum([
    'no-experience',
    'beginner',
    'intermediate',
    'advanced',
  ], {
    errorMap: () => ({ message: 'Please select your experience level' }),
  }),
  career_goal: z
    .string()
    .min(10, 'Please describe your career goal (at least 10 characters)')
    .max(1000, 'Career goal must be less than 1000 characters')
    .trim(),
  course_type: z.enum(['ml-ai', 'prompt-engineering'], {
    errorMap: () => ({ message: 'Invalid course type' }),
  }),
})

export type LeadInput = z.infer<typeof LeadSchema>

export const ContactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100)
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200)
    .trim(),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000)
    .trim(),
})

export type ContactInput = z.infer<typeof ContactSchema>
