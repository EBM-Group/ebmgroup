import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import StatCounter from '../components/StatCounter'

gsap.registerPlugin(ScrollTrigger)

const impactStats = [
  { value: 1000, prefix: '+', suffix: '', label: 'Empleos verdes generados' },
  { value: 5, prefix: '', suffix: '', label: 'MW potencia firme (Biomasa)' },
  { value: 10, prefix: '', suffix: ' M', label: 'Litros/año de Bioetanol', decimals: 0 },
  { value: 50000, prefix: '', suffix: '', label: 'Hectareas de ecosistemas restaurados' },
]

export default function Impacto() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const quote = sectionRef.current.querySelector('.tesis-quote')
    if (quote) {
      gsap.fromTo(quote,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: quote, start: 'top 80%', toggleActions: 'play none none none' }
        }
      )
    }

    const closing = sectionRef.current.querySelector('.closing-quote')
    if (closing) {
      gsap.fromTo(closing,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: closing, start: 'top 85%', toggleActions: 'play none none none' }
        }
      )
    }
  }, { scope: sectionRef })

  return (
    <section id="impacto" ref={sectionRef} className="bg-void-black w-full py-24 md:py-32">
      <div className="content-max section-padding">
        {/* Part A — Impact headline */}
        <div className="text-center">
          <p className="text-caption text-muted-gold mb-4">IMPACTO PROYECTADO</p>
          <div className="text-display-xl text-solar-gold font-bold">
            +<StatCounter value={50000} suffix=" millones COP" className="text-display-xl text-solar-gold font-bold" />
          </div>
          <p className="text-body-l text-[rgba(255,255,255,0.72)] mt-4 max-w-[600px] mx-auto">
            Inversion inicial estimada para el despliegue del ecosistema GEE-USO en el territorio de Arauca.
          </p>
        </div>

        {/* Part B — Impact grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {impactStats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-stat text-solar-gold">
                {stat.prefix}
                <StatCounter value={stat.value} className="text-stat text-solar-gold" />
                {stat.suffix}
              </div>
              <p className="text-[rgba(255,255,255,0.72)] mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full max-w-[200px] h-[1px] bg-[rgba(255,255,255,0.1)] mx-auto my-16" />

        {/* Part C — Tesis Central */}
        <div className="text-center max-w-[800px] mx-auto">
          <p className="text-caption text-muted-gold mb-4">TESIS CENTRAL</p>
          <p className="tesis-quote text-display-l text-white font-medium italic">
            "La transicion energetica se financia mediante la restauracion forestal, creando un circulo virtuoso donde la conservacion genera los recursos para la descarbonizacion."
          </p>
        </div>

        {/* Divider */}
        <div className="w-full max-w-[200px] h-[1px] bg-[rgba(255,255,255,0.1)] mx-auto my-16" />

        {/* Part D — Closing message */}
        <div className="text-center max-w-[700px] mx-auto">
          <p className="closing-quote text-body-l text-[rgba(255,255,255,0.72)]">
            "Nuestra mayor victoria no es alcanzar el exito, sino consolidar un legado: empresas con identidad, tecnologia que restaura y un territorio en equilibrio. No esperamos el cambio; lo diseñamos."
          </p>
        </div>
      </div>
    </section>
  )
}
