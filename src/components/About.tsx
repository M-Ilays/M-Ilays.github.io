import { ShieldCheck, Zap, Bot, TestTube } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

const pillars = [
  {
    icon: <TestTube size={20} />,
    title: 'Manual Testing',
    desc: 'Functional and regression testing across web applications.',
    color: '#38bdf8',
  },
  {
    icon: <Zap size={20} />,
    title: 'QA Automation',
    desc: 'Selenium and Playwright frameworks with Page Object Model, integrated into Jenkins CI/CD pipelines.',
    color: '#a78bfa',
  },
  {
    icon: <ShieldCheck size={20} />,
    title: 'API Testing',
    desc: 'API testing alongside functional coverage for the products I have tested.',
    color: '#34d399',
  },
  {
    icon: <Bot size={20} />,
    title: 'AI-Assisted QA',
    desc: 'Building autonomous agents and AI tooling that augment the software testing workflow end-to-end.',
    color: '#fb923c',
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="section-pad"
      aria-labelledby="about-heading"
    >
      <div className="container-max">
        <SectionHeading title="About" />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <Reveal>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
              <p>
                I'm a{' '}
                <span style={{ color: 'var(--text)', fontWeight: 600 }}>
                  Software Quality Assurance Engineer
                </span>{' '}
                with more than one year of professional SQA experience in manual testing,
                automation frameworks, and AI-assisted QA.
              </p>
              <p>
                My day-to-day spans{' '}
                <span style={{ color: 'var(--text)', fontWeight: 500 }}>manual testing</span> of
                complex workflows,{' '}
                <span style={{ color: 'var(--text)', fontWeight: 500 }}>
                  Selenium and Playwright automation
                </span>{' '}
                with CI/CD integration, and{' '}
                <span style={{ color: 'var(--text)', fontWeight: 500 }}>API testing</span>.
                I hold a BS in Information Technology from Bahria University.
              </p>
              <p>
                Beyond professional work I build{' '}
                <span style={{ color: 'var(--text)', fontWeight: 500 }}>
                  AI-assisted QA tools
                </span>
                — autonomous browser agents, intelligent bug reporters, and collaborative
                platforms — exploring how AI can reduce the manual burden of quality assurance.
              </p>
            </div>
          </Reveal>

          {/* Pillars grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div
                  className="card card-lift p-5 h-full"
                  style={{ '--accent': p.color } as React.CSSProperties}
                >
                  {/* Icon badge */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{
                      background: `${p.color}18`,
                      color: p.color,
                      border: `1px solid ${p.color}30`,
                    }}
                    aria-hidden="true"
                  >
                    {p.icon}
                  </div>
                  <h3
                    className="text-sm font-semibold mb-1.5"
                    style={{ color: 'var(--text)' }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
