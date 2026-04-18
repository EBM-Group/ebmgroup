import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  {
    year: '1923',
    title: 'Nacimiento en Barrancabermeja',
    desc: 'La USO nace el 10 de febrero de 1923 como fuerza organizada en defensa de la dignidad de los trabajadores del sector petrolero.',
  },
  {
    year: '+100 años',
    title: 'Liderazgo historico',
    desc: 'Durante mas de un siglo, la USO ha liderado luchas que transformaron el sector energetico y consolidaron derechos colectivos fundamentales.',
  },
  {
    year: '2026',
    title: 'Transformacion estrategica',
    desc: 'La USO Subdirectiva Arauca da un paso historico: de la defensa de derechos a la construccion de valor economico. Nace el GEE-USO.',
  },
]

export default function Origen() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const nodes = sectionRef.current.querySelectorAll('.timeline-node')
    const texts = sectionRef.current.querySelectorAll('.timeline-text')

    gsap.fromTo(nodes,
      { scale: 0, opacity: 0 },
      {
        scale: 1, opacity: 1, stagger: 0.15, duration: 0.5, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' }
      }
    )

    gsap.fromTo(texts,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="origen" ref={sectionRef} className="bg-abyssal-blue w-full py-24 md:py-32">
      <div className="content-max section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-caption text-muted-gold mb-4">ORIGEN Y EVOLUCION</p>
          <h2 className="text-display-l text-white font-bold max-w-[800px] mx-auto">
            Del corazon de la industria petrolera al motor de la transicion energetica
          </h2>
        </div>

        {/* Timeline + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.1)]" />

            <div className="flex flex-col gap-10">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-6 items-start">
                  {/* Node */}
                  <div className="timeline-node relative z-10 w-[48px] h-[48px] rounded-full border-2 border-solar-gold bg-void-black flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-solar-gold" />
                  </div>
                  {/* Content */}
                  <div className="timeline-text pt-1">
                    <span className="text-heading-m text-solar-gold font-bold">{m.year}</span>
                    <h3 className="text-[1rem] text-white font-medium mt-1">{m.title}</h3>
                    <p className="text-[rgba(255,255,255,0.72)] mt-2 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Evolution text */}
          <div className="flex flex-col justify-center">
            <h3 className="timeline-text text-heading-m text-white font-medium">
              Hoy, esa historia evoluciona
            </h3>
            <p className="timeline-text text-body-l text-[rgba(255,255,255,0.72)] mt-4">
              La USO pasa de la defensa de derechos a la construccion de valor. Ya no solo negocia pliegos — construye poder economico.
            </p>
            <button
              onClick={() => document.querySelector('#motores')?.scrollIntoView({ behavior: 'smooth' })}
              className="timeline-text text-solar-gold mt-6 flex items-center gap-2 hover:underline group"
            >
              Conoce nuestra historia
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
