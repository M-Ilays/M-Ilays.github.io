import { personal } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer
      role="contentinfo"
      style={{ borderTop: '1px solid var(--border)' }}
      className="py-8"
    >
      <div
        className="container-max flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
        style={{ color: 'var(--text-3)' }}
      >
        <p>
          © {year}{' '}
          <span style={{ color: 'var(--text-2)' }}>{personal.name}</span>. All rights reserved.
        </p>
        <p className="flex items-center gap-3">
          <a
            href={personal.resume}
            download={personal.resumeFileName}
            className="transition-colors"
            style={{ color: 'var(--text-2)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sky)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
          >
            Download Resume
          </a>
          <span aria-hidden="true">·</span>
          Built with React · TypeScript · Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
