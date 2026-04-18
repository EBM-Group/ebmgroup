import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface StatCounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
  className?: string
}

export default function StatCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  decimals = 0,
  className = '',
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (!ref.current) return

    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration,
      ease: 'power2.out',
      snap: decimals === 0 ? { val: 1 } : undefined,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (ref.current) {
          const formatted = decimals === 0
            ? Math.round(obj.val).toLocaleString('es-CO')
            : obj.val.toFixed(decimals)
          ref.current.textContent = `${prefix}${formatted}${suffix}`
        }
      },
    })
  }, { scope: ref })

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>
}
