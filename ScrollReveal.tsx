import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: React.ReactNode
  stagger?: number
  y?: number
  duration?: number
  triggerStart?: string
  className?: string
}

export default function ScrollReveal({
  children,
  stagger = 0.08,
  y = 40,
  duration = 0.8,
  triggerStart = 'top 80%',
  className = '',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    const elements = containerRef.current.children
    if (elements.length === 0) return

    gsap.fromTo(
      elements,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        stagger,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerStart,
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
