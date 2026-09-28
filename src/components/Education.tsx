import { GraduationCap, Calendar } from 'lucide-react'
import { education } from '../data/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

export default function Education() {
  return (
    <section
      id="education"
      className="section-pad pt-0"
      aria-labelledby="education-heading"
    >
      <div className="container-max">
        <SectionHeading title="Education" />

        <Reveal>
          <div
            className="card p-6 flex items-start gap-5 max-w-md transition-all duration-300"
            style={{ cursor: 'default' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)'
              e.currentTarget.style.boxShadow = '0 0 24px rgba(56,189,248,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: 'rgba(56,189,248,0.1)',
                border: '1px solid rgba(56,189,248,0.25)',
              }}
              aria-hidden="true"
            >
              <GraduationCap size={20} style={{ color: 'var(--sky)' }} />
            </div>
            <div>
              <h3 className="font-semibold text-base" style={{ color: 'var(--text)' }}>
                {education.degree}
              </h3>
              <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--sky)' }}>
                {education.institution}
              </p>
              <p
                className="flex items-center gap-1.5 text-xs mt-2"
                style={{ color: 'var(--text-2)' }}
              >
                <Calendar size={11} aria-hidden="true" />
                {education.period}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
