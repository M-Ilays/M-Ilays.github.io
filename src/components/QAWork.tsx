import { qaWork } from '../data/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

export default function QAWork() {
  return (
    <section
      id="qa-work"
      className="section-pad"
      aria-labelledby="qa-work-heading"
    >
      <div className="container-max">
        <SectionHeading
          title="QA Work"
          subtitle="Products I tested professionally"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {qaWork.map((item, i) => (
            <Reveal key={item.name} delay={i * 60}>
              <article className="card card-lift p-5 flex flex-col h-full group">
                {/* Category badge */}
                <span
                  className="inline-block text-[12px] font-medium mb-3 px-2.5 py-0.5 rounded-full self-start"
                  style={{
                    background: 'rgba(56,189,248,0.08)',
                    border: '1px solid rgba(56,189,248,0.2)',
                    color: 'var(--sky)',
                  }}
                >
                  {item.category}
                </span>

                {/* Product name */}
                <h3
                  className="text-base font-bold mb-2 leading-snug transition-colors duration-200"
                  style={{ color: 'var(--text)' }}
                >
                  {item.name}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed flex-1 mb-4"
                  style={{ color: 'var(--text-2)' }}
                >
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5" role="list" aria-label="Testing approaches">
                  {item.tags.map((tag) => (
                    <span key={tag} role="listitem" className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
