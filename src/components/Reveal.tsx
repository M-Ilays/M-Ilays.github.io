import { useInView } from '../hooks/useInView'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

/** Wraps children in a scroll-triggered fade-up reveal. */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'visible' : ''} ${className}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
