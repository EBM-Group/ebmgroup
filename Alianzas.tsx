import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Shield, Users, GraduationCap, Building2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    icon: Shield,
    title: 'USO',
    desc: 'Propiedad y control estrategico. Garantia de estabilidad, vision de largo plazo y alineacion con el desarrollo territorial.',
  },
  {
    icon: Users,
    title: 'Comunidades',
    desc: 'Desarrollo territorial directo. Las comunidades son protagonistas activas del modelo productivo.',
  },
  {
    icon: GraduationCap,
    title: 'Academia',
    desc: 'Conocimiento y formacion. Universidad Obrera de Colombia y redes academicas nacionales.',
  },
  {
    icon: Building2,
    title: 'Sector Privado',
    desc: 'Aliado estrategico. Capital, conocimiento y capacidades dentro de estructuras claras y seguras.',
  },
]

export default function Alianzas() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const items = sectionRef.current.querySelectorAll('.alianza-pillar')
    const icons = sectionRef.current.querySelectorAll('.alianza-icon')

    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      }
    )

    gsap.fromTo(icons,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-abyssal-blue w-full py-24 md:py-32">
      <div className="content-max section-padding">
        {/* Header */}
        <div className="text-center">
          <p className="text-caption text-muted-gold mb-4">ALIADOS · ECOSISTEMAS ESTRATEGICOS</p>
          <h2 className="text-display-l text-white font-bold">Modelo sin perdida de soberania</h2>
          <p className="text-body-l text-[rgba(255,255,255,0.72)] mt-4 max-w-[700px] mx-auto">
            El GEE-USO implementa un modelo de gobernanza que prioriza el control estrategico por parte de sus miembros fundadores.
          </p>
        </div>

        {/* Four pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {pillars.map((p, i) => (
            <div key={i} className="alianza-pillar text-center">
              <div className="alianza-icon w-16 h-16 rounded-full border border-solar-gold flex items-center justify-center mx-auto">
                <p.icon size={32} className="text-solar-gold" strokeWidth={1.5} />
              </div>
              <h3 className="text-heading-m text-white font-medium mt-6">{p.title}</h3>
              <p className="text-[rgba(255,255,255,0.72)] mt-3 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Governance note */}
        <p className="text-center text-[rgba(255,255,255,0.72)] mt-12 max-w-[700px] mx-auto">
          Claridad en roles · Seguridad juridica · Beneficio mutuo · Sostenibilidad del modelo
        </p>
      </div>
    </section>
  )
}
