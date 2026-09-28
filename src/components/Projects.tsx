import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './Icons'
import { projects } from '../data/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

const accents = [
  { color: '#38bdf8' },
  { color: '#f472b6' },
  { color: '#a78bfa' },
]

export default function Projects() {
  return (
    <section
      id="projects"
      className="section-pad"
      aria-labelledby="projects-heading"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(56,189,248,0.025) 50%, transparent)' }}
    >
      <div className="container-max">
        <SectionHeading
          title="AI & Software Projects"
          subtitle="Applications I designed and built"
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {projects.map((proj, i) => {
            const { color } = accents[i]
            return (
              <Reveal key={proj.name} delay={i * 80}>
                <article
                  className="relative flex flex-col rounded-[14px] overflow-hidden h-full transition-all duration-300"
                  style={{
                    background: 'linear-gradient(145deg, var(--surface) 0%, var(--bg-2) 100%)',
                    border: '1px solid var(--border)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = `${color}55`
                    el.style.transform = 'translateY(-3px)'
                    el.style.boxShadow = `0 16px 36px rgba(0,0,0,0.35), 0 0 20px ${color}14`
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--border)'
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{ height: 3, background: `linear-gradient(90deg, ${color}, ${color}44)` }}
                  />

                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    <p
                      className="text-xs font-semibold tracking-wide mb-3"
                      style={{ color }}
                    >
                      {proj.subtitle}
                    </p>

                    <h3
                      className="text-lg font-bold leading-snug mb-3"
                      style={{ color: 'var(--text)' }}
                    >
                      {proj.name}
                    </h3>

                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: 'var(--text-2)' }}
                    >
                      {proj.description}
                    </p>

                    {proj.highlights.length > 0 && (
                      <ul
                        className="space-y-1.5 mb-5 flex-1"
                        aria-label="Project details"
                      >
                        {proj.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex gap-2.5 text-sm leading-relaxed"
                            style={{ color: 'var(--text-2)' }}
                          >
                            <span
                              className="mt-2 w-1 h-1 rounded-full shrink-0"
                              style={{ background: color }}
                              aria-hidden="true"
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div
                      className="flex flex-wrap gap-1.5 mb-5"
                      role="list"
                      aria-label="Topics"
                    >
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          role="listitem"
                          className="text-[12px] px-2.5 py-0.5 rounded-full font-medium"
                          style={{
                            background: `${color}10`,
                            border: `1px solid ${color}28`,
                            color: 'var(--text)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold mt-auto self-start"
                      style={{ color }}
                      aria-label={`View ${proj.name} on GitHub`}
                    >
                      <GithubIcon size={15} />
                      View on GitHub
                      <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
