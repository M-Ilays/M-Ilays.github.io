import { useState } from 'react'
import { Mail, Copy, Check, Download } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { personal } from '../data/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import InquiryForm from './InquiryForm'

const socialLinks = [
  {
    icon: <GithubIcon size={20} />,
    label: 'GitHub',
    value: 'M-Ilays',
    href: personal.github,
    color: '#a78bfa',
  },
  {
    icon: <LinkedinIcon size={20} />,
    label: 'LinkedIn',
    value: 'muhammad-ilyas-qa',
    href: personal.linkedin,
    color: '#34d399',
  },
]

const cardHover = {
  enter: (el: HTMLElement, color: string) => {
    el.style.borderColor = `${color}55`
    el.style.boxShadow = `0 8px 28px rgba(0,0,0,0.25), 0 0 16px ${color}18`
    el.style.transform = 'translateY(-2px)'
  },
  leave: (el: HTMLElement) => {
    el.style.borderColor = 'var(--border)'
    el.style.boxShadow = 'none'
    el.style.transform = 'translateY(0)'
  },
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(personal.email)
    return true
  } catch {
    const field = document.createElement('textarea')
    field.value = personal.email
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.left = '-9999px'
    document.body.appendChild(field)
    field.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(field)
    return ok
  }
}

export default function Contact() {
  return (
    <section
      id="hire"
      aria-labelledby="hire-heading"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(56,189,248,0.03) 50%, transparent)' }}
    >
      <div className="container-max w-full">
        <div className="grid lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:gap-10 lg:items-start">
          <div>
            <SectionHeading
              title="Hire Me"
              subtitle="Job opportunities and project inquiries"
              headingId="hire-heading"
              compact
            />

            <Reveal>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-2)' }}>
                I'm currently open to SQA and QA Automation opportunities. Send an inquiry, or
                copy my email and write directly.
              </p>
            </Reveal>

            <div className="flex flex-col gap-3">
              <Reveal>
                <EmailCard />
              </Reveal>

              <Reveal delay={40}>
                <ResumeCard />
              </Reveal>

              {socialLinks.map(({ icon, label, value, href, color }, i) => (
                <Reveal key={label} delay={(i + 1) * 80}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label}: ${value}`}
                    className="flex items-center gap-4 px-4 py-3 rounded-[14px] transition-all duration-200 group"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                    }}
                    onMouseEnter={(e) => cardHover.enter(e.currentTarget, color)}
                    onMouseLeave={(e) => cardHover.leave(e.currentTarget)}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: `${color}14`,
                        border: `1px solid ${color}28`,
                        color,
                      }}
                      aria-hidden="true"
                    >
                      {icon}
                    </div>

                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: 'var(--text-2)' }}
                      >
                        {label}
                      </p>
                      <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--text)' }}>
                        {value}
                      </p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <Reveal>
              <InquiryForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function EmailCard() {
  const [copied, setCopied] = useState(false)
  const color = '#38bdf8'

  const handleCopy = async () => {
    const ok = await copyEmail()
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="flex items-center gap-4 px-5 py-4 rounded-[14px] transition-all duration-200"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        minWidth: 200,
      }}
      onMouseEnter={(e) => cardHover.enter(e.currentTarget, color)}
      onMouseLeave={(e) => cardHover.leave(e.currentTarget)}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: `${color}14`,
          border: `1px solid ${color}28`,
          color,
        }}
        aria-hidden="true"
      >
        <Mail size={20} />
      </div>

      <div className="min-w-0">
        <p
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: 'var(--text-2)' }}
        >
          Email
        </p>
        <p
          className="text-sm font-medium mt-0.5 break-all"
          style={{ color: 'var(--text)', userSelect: 'all' }}
        >
          {personal.email}
        </p>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className="ml-auto shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
        style={{
          background: copied ? 'rgba(52,211,153,0.12)' : `${color}14`,
          border: `1px solid ${copied ? 'rgba(52,211,153,0.35)' : `${color}28`}`,
          color: copied ? '#34d399' : color,
        }}
        aria-label={copied ? 'Email copied' : `Copy ${personal.email}`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </div>
  )
}

function ResumeCard() {
  const color = '#38bdf8'

  return (
    <a
      href={personal.resume}
      download={personal.resumeFileName}
      aria-label="Download resume as PDF"
      className="flex items-center gap-4 px-4 py-3 rounded-[14px] transition-all duration-200"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={(e) => cardHover.enter(e.currentTarget, color)}
      onMouseLeave={(e) => cardHover.leave(e.currentTarget)}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: `${color}14`,
          border: `1px solid ${color}28`,
          color,
        }}
        aria-hidden="true"
      >
        <Download size={20} />
      </div>
      <div className="min-w-0">
        <p
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: 'var(--text-2)' }}
        >
          Resume
        </p>
        <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--text)' }}>
          Download PDF
        </p>
      </div>
    </a>
  )
}
