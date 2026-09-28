import { Reveal } from './Reveal'

interface Props {
  title: string
  subtitle?: string
  headingId?: string
  compact?: boolean
}

export function SectionHeading({ title, subtitle, headingId, compact = false }: Props) {
  return (
    <Reveal>
      <div>
        <h2
          id={headingId}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm mt-1.5" style={{ color: 'var(--text-3)' }}>
            {subtitle}
          </p>
        )}
        <div
          className="section-line"
          style={compact ? { marginBottom: '1rem' } : undefined}
          aria-hidden="true"
        />
      </div>
    </Reveal>
  )
}
