import { skillGroups } from '../data/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

const categoryColors: Record<string, string> = {
  Testing:              '#38bdf8',
  Automation:           '#a78bfa',
  'Languages & Tools':  '#34d399',
  'AI & Emerging':      '#fb923c',
  AI:                   '#fb923c',
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-pad"
      aria-labelledby="skills-heading"
    >
      <div className="container-max">
        <SectionHeading title="Skills" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillGroups.map((group, i) => {
            const color = categoryColors[group.category] ?? '#38bdf8'
            return (
              <Reveal key={group.category} delay={i * 80}>
                <div className="card p-5 h-full">
                  {/* Category label */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="w-2.5 h-2.5 rounded-sm"
                      style={{ background: color }}
                      aria-hidden="true"
                    />
                    <h3
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color }}
                    >
                      {group.category}
                    </h3>
                  </div>

                  {/* Skill pills */}
                  <div
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label={`${group.category} skills`}
                  >
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        role="listitem"
                        className="text-xs px-2.5 py-1 rounded-full font-medium transition-colors duration-200"
                        style={{
                          background: `${color}0d`,
                          border: `1px solid ${color}28`,
                          color: 'var(--text-2)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${color}1a`
                          e.currentTarget.style.color = color
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `${color}0d`
                          e.currentTarget.style.color = 'var(--text-2)'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
