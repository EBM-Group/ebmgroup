import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Zap, Leaf, Brain } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    icon: Zap,
    title: 'Energia Limpia',
    desc: 'Transicion energetica hacia matrices limpias y estables con autonomia productiva.',
  },
  {
    icon: Leaf,
    title: 'Territorio Vivo',
    desc: 'Regeneracion de ecosistemas y bioeconomia como motor real de desarrollo.',
  },
  {
    icon: Brain,
    title: 'Conocimiento Soberano',
    desc: 'Ciencia, tecnologia e innovacion al servicio del territorio y sus comunidades.',
  },
]

export default function ModeloTransformacion() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.modelo-card')
    gsap.fromTo(cards,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' }
      }
    )

    // SVG line draw animation
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll('line')
      paths.forEach((path) => {
        const length = 300
        gsap.fromTo(path,
          { strokeDashoffset: length },
          {
            strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' }
          }
        )
      })
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-void-black w-full py-24 md:py-32">
      <div className="content-max section-padding">
        {/* Header */}
        <div className="text-center">
          <p className="text-caption text-muted-gold mb-4">MODELO DE TRANSFORMACION</p>
          <h2 className="text-display-l text-white font-bold">
            El triangulo estrategico de la transicion justa
          </h2>
          <p className="text-[rgba(255,255,255,0.72)] mt-4">
            Control obrero democratico · Gobernanza transparente · Desarrollo territorial sostenible
          </p>
        </div>

        {/* Triangle Cards */}
        <div className="relative mt-16 max-w-[900px] mx-auto">
          {/* SVG connecting lines */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
            viewBox="0 0 900 400"
            preserveAspectRatio="none"
          >
            <line
              x1="450" y1="80" x2="150" y2="320"
              stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="6,6"
              strokeDashoffset="300"
            />
            <line
              x1="450" y1="80" x2="750" y2="320"
              stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="6,6"
              strokeDashoffset="300"
            />
            <line
              x1="150" y1="320" x2="750" y2="320"
              stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="6,6"
              strokeDashoffset="300"
            />
          </svg>

          {/* Cards layout - triangle on desktop, stack on mobile */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 relative z-10">
            {/* Top card - centered on desktop */}
            <div className="lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2">
              <ModeloCard {...pillars[0]} />
            </div>

            {/* Bottom row */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:mt-[280px]">
              <ModeloCard {...pillars[1]} />
              <ModeloCard {...pillars[2]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ModeloCard({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="modelo-card bg-deep-teal rounded-2xl p-8 max-w-[320px] text-center">
      <Icon size={48} className="text-solar-gold mx-auto" strokeWidth={1.5} />
      <h3 className="text-heading-m text-white font-medium mt-4">{title}</h3>
      <p className="text-[rgba(255,255,255,0.72)] mt-3 leading-relaxed">{desc}</p>
    </div>
  )
}
