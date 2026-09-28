import { useId, useState } from 'react'
import { LoaderCircle, CircleAlert, CircleCheck } from 'lucide-react'
import {
  INQUIRY_TYPES,
  submitInquiry,
  validateInquiry,
  type InquiryPayload,
} from '../lib/inquiry'

const emptyForm: InquiryPayload = {
  name: '',
  email: '',
  inquiryType: '',
  message: '',
  company: '',
  startedAt: Date.now(),
}

export default function InquiryForm() {
  const formId = useId()
  const [form, setForm] = useState<InquiryPayload>(emptyForm)
  const [errors, setErrors] = useState<ReturnType<typeof validateInquiry>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [serverMessage, setServerMessage] = useState('')

  const nameId = `${formId}-name`
  const emailId = `${formId}-email`
  const messageId = `${formId}-message`
  const typeId = `${formId}-type`
  const statusId = `${formId}-status`

  const update = <K extends keyof InquiryPayload>(key: K, value: InquiryPayload[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    if (status === 'error' || status === 'success') {
      setStatus('idle')
      setServerMessage('')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateInquiry(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      const firstInvalid = Object.keys(nextErrors)[0]
      const field = event.currentTarget.querySelector<HTMLElement>(
        `[name="${firstInvalid}"]`,
      )
      field?.focus()
      return
    }

    setStatus('sending')
    setServerMessage('')

    try {
      await submitInquiry(form)
      setStatus('success')
      setServerMessage('Inquiry sent. I will reply to the email address you provided.')
      setForm({ ...emptyForm, startedAt: Date.now() })
      setErrors({})
    } catch (error) {
      setStatus('error')
      setServerMessage(
        error instanceof Error
          ? error.message
          : 'The inquiry could not be sent. Copy the email address above and write directly.',
      )
    }
  }

  const sending = status === 'sending'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[14px] p-5 sm:p-6 relative"
      style={{
        background: 'linear-gradient(145deg, var(--surface) 0%, var(--bg-2) 100%)',
        border: '1px solid var(--border)',
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={nameId} className="form-label">
            Name
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            required
            disabled={sending}
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            className="form-input"
          />
          {errors.name && (
            <p id={`${nameId}-error`} className="form-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={emailId} className="form-label">
            Email address
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            disabled={sending}
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            className="form-input"
          />
          {errors.email && (
            <p id={`${emailId}-error`} className="form-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <fieldset className="mt-4" aria-describedby={errors.inquiryType ? `${typeId}-error` : undefined}>
        <legend className="form-label mb-2">Inquiry type</legend>
        <div className="flex flex-col sm:flex-row gap-3">
          {INQUIRY_TYPES.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg cursor-pointer"
              style={{
                border: `1px solid ${form.inquiryType === option.value ? 'var(--sky-dim)' : 'var(--border-hi)'}`,
                background:
                  form.inquiryType === option.value ? 'rgba(56,189,248,0.08)' : 'var(--bg)',
              }}
            >
              <input
                type="radio"
                name="inquiryType"
                value={option.value}
                required
                disabled={sending}
                checked={form.inquiryType === option.value}
                onChange={() => update('inquiryType', option.value)}
                aria-invalid={Boolean(errors.inquiryType)}
              />
              <span className="text-sm" style={{ color: 'var(--text)' }}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
        {errors.inquiryType && (
          <p id={`${typeId}-error`} className="form-error mt-1.5" role="alert">
            {errors.inquiryType}
          </p>
        )}
      </fieldset>

      <div
        aria-hidden="true"
        className="absolute overflow-hidden"
        style={{ position: 'absolute', left: '-10000px', width: 1, height: 1 }}
      >
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5 mt-4">
        <label htmlFor={messageId} className="form-label">
          Tell me about the role or project
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          disabled={sending}
          rows={5}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${messageId}-error` : undefined}
          className="form-input resize-y min-h-28"
        />
        {errors.message && (
          <p id={`${messageId}-error`} className="form-error" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          className="btn-primary justify-center min-w-40 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={sending}
        >
          {sending ? (
            <>
              <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            'Send Inquiry'
          )}
        </button>

        <p
          id={statusId}
          className="text-sm leading-relaxed flex items-start gap-2"
          role="status"
          aria-live="polite"
          style={{
            color:
              status === 'success' ? '#34d399' : status === 'error' ? '#f87171' : 'transparent',
          }}
        >
          {status === 'success' && <CircleCheck size={16} className="mt-0.5 shrink-0" />}
          {status === 'error' && <CircleAlert size={16} className="mt-0.5 shrink-0" />}
          <span>{serverMessage}</span>
        </p>
      </div>
    </form>
  )
}
