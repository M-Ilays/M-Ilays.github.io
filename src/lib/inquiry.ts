export const INQUIRY_TYPES = [
  { value: 'job', label: 'Job opportunity' },
  { value: 'project', label: 'Project' },
] as const

export type InquiryType = (typeof INQUIRY_TYPES)[number]['value']

export interface InquiryPayload {
  name: string
  email: string
  inquiryType: InquiryType | ''
  message: string
  company: string
  startedAt: number
}

export interface FieldErrors {
  name?: string
  email?: string
  inquiryType?: string
  message?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
const MIN_FILL_MS = 2500

export function validateInquiry(data: InquiryPayload): FieldErrors {
  const errors: FieldErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Enter your name.'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  }

  if (!data.email.trim()) {
    errors.email = 'Enter your email address.'
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (data.inquiryType !== 'job' && data.inquiryType !== 'project') {
    errors.inquiryType = 'Select an inquiry type.'
  }

  if (!data.message.trim()) {
    errors.message = 'Tell me about the role or project.'
  } else if (data.message.trim().length < 20) {
    errors.message = 'Please include at least 20 characters so I can understand the request.'
  }

  return errors
}

function accessKey() {
  return String(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '').trim()
}

function web3formsMessage(result: Record<string, unknown>) {
  if (typeof result.message === 'string' && result.message) return result.message
  const body = result.body
  if (body && typeof body === 'object' && 'message' in body) {
    const nested = (body as { message?: unknown }).message
    if (typeof nested === 'string' && nested) return nested
  }
  return ''
}

export async function submitInquiry(data: InquiryPayload): Promise<void> {
  if (data.company.trim() || Date.now() - data.startedAt < MIN_FILL_MS) {
    throw new Error('The inquiry could not be sent. Copy the email address above and write directly.')
  }

  const key = accessKey()
  if (!key) {
    throw new Error(
      'This inquiry form is not configured yet. Copy the email address on this page and write directly.',
    )
  }

  const typeLabel = data.inquiryType === 'job' ? 'Job opportunity' : 'Project'

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: key,
      name: data.name.trim(),
      email: data.email.trim(),
      subject: `Portfolio inquiry: ${typeLabel} from ${data.name.trim()}`,
      from_name: 'Portfolio inquiry form',
      botcheck: false,
      message: [
        `Inquiry type: ${typeLabel}`,
        `Name: ${data.name.trim()}`,
        `Email: ${data.email.trim()}`,
        '',
        data.message.trim(),
      ].join('\n'),
    }),
  })

  let result: Record<string, unknown> = {}
  try {
    result = (await response.json()) as Record<string, unknown>
  } catch {
    result = {}
  }

  if (!response.ok || result.success !== true) {
    throw new Error(
      web3formsMessage(result) ||
        'The inquiry could not be sent. Copy the email address above and write directly.',
    )
  }
}
