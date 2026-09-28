import { useState } from 'react'
import { ArrowDown, Mail, Download } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { personal } from '../data/content'

export default function Hero() {
  const [emailCopied, setEmailCopied] = useState(false)

  const copyHeroEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
    } catch {
      const field = document.createElement('textarea')
      field.value = personal.email
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.left = '-9999px'
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      document.body.removeChild(field)
    }
    setEmailCopied(true)
    window.setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 70% 55% at 60% -5%, rgba(56,189,248,0.13) 0%, transparent 65%), var(--bg)',
          }}
        />
        {/* Subtle grid */}
        <div
          style={{
            position: 'absolute', inset: 0, opacity: 0.025,
            backgroundImage: 'linear-gradient(var(--border-hi) 1px, transparent 1px), linear-gradient(90deg, var(--border-hi) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />
        {/* Decorative glow orb */}
        <div
          style={{
            position: 'absolute', right: '10%', top: '20%',
            width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div className="container-max w-full px-6 py-24 sm:py-28 lg:py-0" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-14">

          {/* ── Text column ── */}
            <div className="flex-1 text-center lg:text-left">

            {/* Status badge */}
            <div
              className="hero-anim inline-flex items-center gap-2 px-3.5 py-1 mb-7 rounded-full text-sm font-medium"
              style={{
                animationDelay: '0.05s',
                border: '1px solid rgba(56,189,248,0.3)',
                background: 'rgba(56,189,248,0.08)',
                color: 'var(--sky)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--sky)' }}
                aria-hidden="true"
              />
              Open to new opportunities
            </div>

            {/* Name */}
            <h1
              className="hero-anim text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold tracking-tight leading-tight mb-3"
              style={{ animationDelay: '0.15s', color: 'var(--text)' }}
            >
              {personal.name}
            </h1>

            {/* Role */}
            <p
              className="hero-anim text-xl sm:text-2xl font-semibold mb-5"
              style={{ animationDelay: '0.25s', color: 'var(--sky)' }}
            >
              {personal.title}
            </p>

            {/* Description */}
            <p
              className="hero-anim max-w-lg leading-relaxed mb-9 text-base sm:text-lg"
              style={{ animationDelay: '0.35s', color: 'var(--text-2)' }}
            >
              More than one year of professional SQA experience in{' '}
              <span style={{ color: 'var(--text)' }}>manual testing</span>,{' '}
              <span style={{ color: 'var(--text)' }}>QA automation</span>{' '}
              (Selenium · Playwright), and{' '}
              <span style={{ color: 'var(--text)' }}>AI-assisted QA</span>.
            </p>

            {/* CTAs */}
            <div
              className="hero-anim flex flex-wrap justify-center lg:justify-start gap-3 mb-9"
              style={{ animationDelay: '0.45s' }}
            >
              <a href="#experience" className="btn-primary">
                View Experience
              </a>
              <a href="#projects" className="btn-ghost">
                View Projects
              </a>
              <a href="#hire" className="btn-ghost">
                Hire Me
              </a>
              <a
                href={personal.resume}
                download={personal.resumeFileName}
                className="btn-ghost"
              >
                <Download size={16} aria-hidden="true" />
                Download Resume
              </a>
            </div>

            {/* Social links */}
            <div
              className="hero-anim flex justify-center lg:justify-start gap-6"
              style={{ animationDelay: '0.55s' }}
            >
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit My Github profile"
                className="hero-social flex items-center gap-2 text-sm transition-all duration-200 group"
                style={{ color: 'var(--text-2)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sky)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
              >
                <span className="hero-social-tip" role="tooltip">
                  Visit My Github profile
                </span>
                <span className="transition-transform duration-200 group-hover:-translate-y-0.5">
                  <GithubIcon size={17} />
                </span>
                GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit My LinkedIn profile"
                className="hero-social flex items-center gap-2 text-sm transition-all duration-200 group"
                style={{ color: 'var(--text-2)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sky)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
              >
                <span className="hero-social-tip" role="tooltip">
                  Visit My LinkedIn profile
                </span>
                <span className="transition-transform duration-200 group-hover:-translate-y-0.5">
                  <LinkedinIcon size={17} />
                </span>
                LinkedIn
              </a>
              <button
                type="button"
                onClick={copyHeroEmail}
                aria-label={emailCopied ? 'Email copied' : 'Copy Email'}
                className="hero-social flex items-center gap-2 text-sm transition-all duration-200 group"
                style={{ color: emailCopied ? 'var(--sky)' : 'var(--text-2)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sky)')}
                onMouseLeave={(e) => {
                  if (!emailCopied) e.currentTarget.style.color = 'var(--text-2)'
                }}
              >
                <span className="hero-social-tip" role="tooltip">
                  {emailCopied ? 'Copied' : 'Copy Email'}
                </span>
                <span className="transition-transform duration-200 group-hover:-translate-y-0.5">
                  <Mail size={17} />
                </span>
                {emailCopied ? 'Copied' : 'Email'}
              </button>
            </div>
          </div>

          {/* ── Photo column ── */}
          <div
            className="hero-photo-anim shrink-0 flex justify-center"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="relative">
              {/* Outer glow */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: '-16px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)',
                  filter: 'blur(16px)',
                }}
              />
              {/* Dashed ring */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: '-6px',
                  borderRadius: '50%',
                  border: '1px dashed rgba(56,189,248,0.3)',
                }}
              />
              {/* Solid inner ring */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: '-2px',
                  borderRadius: '50%',
                  border: '2px solid rgba(56,189,248,0.45)',
                }}
              />
              {/* Photo */}
              <img
                src="/profile.png"
                alt="Muhammad Ilyas – SQA Engineer"
                className="relative rounded-full object-cover object-top"
                style={{
                  width: 'clamp(148px, 28vw, 240px)',
                  height: 'clamp(148px, 28vw, 240px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                }}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="flex flex-col items-center gap-1 transition-colors duration-200"
          style={{ color: 'var(--text-2)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sky)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
        >
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  )
}
