import { useState, useEffect } from 'react'
import { Menu, X, Download } from 'lucide-react'
import { GithubIcon } from './Icons'
import { personal } from '../data/content'

const navLinks = [
  { label: 'About',      href: '#about'      },
  { label: 'Experience', href: '#experience' },
  { label: 'QA Work',    href: '#qa-work'    },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Hire Me',    href: '#hire'       },
]

const sectionIds = navLinks.map((l) => l.href.replace('#', ''))

export default function Navbar() {
  const [open, setOpen]           = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [active, setActive]       = useState('')

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const close = () => setOpen(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(10,22,40,0.92)'
          : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
      }}
      role="banner"
    >
      <div className="container-max flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#hero"
          className="font-extrabold text-lg tracking-tight rounded"
          style={{ color: 'var(--sky)' }}
          aria-label="Muhammad Ilyas – back to top"
        >
          MI<span style={{ color: 'var(--text-3)' }}>.</span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = active === link.href.replace('#', '')
            return (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm rounded-md transition-colors duration-200"
                style={{
                  color: isActive ? 'var(--sky)' : 'var(--text-2)',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-0.5 left-3 right-3 h-px rounded-full"
                    style={{ background: 'var(--sky-dim)' }}
                    aria-hidden="true"
                  />
                )}
              </a>
            )
          })}

          <a
            href={personal.resume}
            download={personal.resumeFileName}
            className="ml-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              border: '1px solid var(--border-hi)',
              color: 'var(--text-2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--sky-dim)'
              e.currentTarget.style.color = 'var(--sky)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-hi)'
              e.currentTarget.style.color = 'var(--text-2)'
            }}
          >
            <Download size={14} aria-hidden="true" />
            Resume
          </a>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              border: '1px solid var(--sky-dim)',
              color: 'var(--sky)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(56,189,248,0.1)'
              e.currentTarget.style.boxShadow = '0 0 14px rgba(56,189,248,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <GithubIcon size={14} />
            GitHub
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-md transition-colors"
          style={{ color: 'var(--text-2)' }}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          style={{
            background: 'rgba(10,22,40,0.97)',
            borderBottom: '1px solid var(--border)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <div className="container-max py-3 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href.replace('#', '')
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="px-3 py-2.5 text-sm rounded-md transition-colors"
                  style={{
                    color: isActive ? 'var(--sky)' : 'var(--text-2)',
                    background: isActive ? 'var(--sky-glow)' : 'transparent',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {link.label}
                </a>
              )
            })}
            <a
              href={personal.resume}
              download={personal.resumeFileName}
              onClick={close}
              className="mt-1 flex items-center gap-2 px-3 py-2.5 text-sm rounded-md"
              style={{ border: '1px solid var(--border-hi)', color: 'var(--text-2)' }}
            >
              <Download size={15} aria-hidden="true" />
              Download Resume
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-md"
              style={{ border: '1px solid var(--border-hi)', color: 'var(--sky)' }}
            >
              <GithubIcon size={15} />
              GitHub ↗
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
