import { Calendar } from 'lucide-react'
import { experience } from '../data/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

// First letter of each word in company name
function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const companyColors = ['#38bdf8', '#a78bfa', '#34d399']

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-pad"
      aria-labelledby="experience-heading"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(56,189,248,0.025) 50%, transparent)' }}
    >
      <div className="container-max">
        <SectionHeading title="Professional Experience" />

        <ol className="relative space-y-0" aria-label="Work history">
          {experience.map((job, i) => (
            <li key={i} className="relative pl-10 pb-10 last:pb-0">
              {/* Timeline line */}
              {i < experience.length - 1 && (
                <span
                  className="absolute left-4 top-10 bottom-0 w-px"
                  style={{ background: 'linear-gradient(180deg, var(--border-hi) 0%, var(--border) 100%)' }}
                  aria-hidden="true"
                />
              )}

              {/* Company initial badge */}
              <div
                className="absolute left-0 top-1.5 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                aria-hidden="true"
                style={{
                  background: `${companyColors[i]}18`,
                  border: `1.5px solid ${companyColors[i]}40`,
                  color: companyColors[i],
                }}
              >
                {initials(job.company)}
              </div>

              <Reveal delay={i * 100}>
                <div className="card p-6 ml-2">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3
                        className="font-semibold text-base leading-snug"
                        style={{ color: 'var(--text)' }}
                      >
                        {job.role}
                      </h3>
                      <p
                        className="text-sm font-semibold mt-1"
                        style={{ color: companyColors[i] }}
                      >
                        {job.company}
                      </p>
                    </div>

                    <span
                      className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full shrink-0"
                      style={{
                        background: 'var(--surface-2, #172641)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-2)',
                      }}
                    >
                      <Calendar size={10} aria-hidden="true" />
                      {job.period}
                    </span>
                  </div>

                  <ul className="space-y-2" aria-label={`Responsibilities at ${job.company}`}>
                    {job.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex gap-2.5 text-sm leading-relaxed"
                        style={{ color: 'var(--text-2)' }}
                      >
                        <span
                          className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                          style={{ background: 'var(--sky-dim)' }}
                          aria-hidden="true"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
