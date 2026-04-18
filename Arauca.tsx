import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Leaf, Sun, Truck, Brain } from 'lucide-react'
import StatCounter from '../components/StatCounter'

gsap.registerPlugin(ScrollTrigger)

const ecosystem = [
  { icon: Leaf, title: 'Bioagencia Diversa', desc: 'Soberania genetica y bioinsumos' },
  { icon: Sun, title: 'USO Solar', desc: 'Autonomia energetica y transicion justa' },
  { icon: Truck, title: 'Hub de Frontera', desc: 'Integracion logistica y comercio global' },
  { icon: Brain, title: 'FUNEDO-UNIOBRERA', desc: 'Centro de alto rendimiento en gestion tecnica y tecnologica' },
]

const pills = ['Produccion', 'Innovacion', 'Energia', 'Sostenibilidad']

export default function Arauca() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const items = sectionRef.current.querySelectorAll('.eco-item')
    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="arauca" ref={sectionRef} className="bg-abyssal-blue w-full py-24 md:py-32">
      <div className="content-max section-padding">
        {/* Label */}
        <p className="text-caption text-muted-gold text-center mb-4">
          ARAUCA · LABORATORIO DE LA NUEVA ECONOMIA
        </p>

        {/* Headline */}
        <h2 className="text-display-xl text-white text-center uppercase font-bold">
          El territorio del futuro
        </h2>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mt-12">
          <div className="text-center">
            <StatCounter
              value={1643161}
              className="text-display-xl text-solar-gold font-bold"
            />
            <p className="text-body-l text-[rgba(255,255,255,0.72)] mt-2">
              hectareas de frontera agricola
            </p>
          </div>
          <div className="text-center">
            <span className="text-display-xl text-solar-gold font-bold">+77</span>
            <p className="text-body-l text-[rgba(255,255,255,0.72)] mt-2">
              PJ/año de potencial energetico en biomasa
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full max-w-[400px] h-[1px] bg-[rgba(255,255,255,0.1)] mx-auto my-12" />

        {/* Sub-headline */}
        <h3 className="text-heading-m text-white text-center font-medium">
          El GEE-USO despliega en Arauca un ecosistema integral
        </h3>

        {/* Ecosystem grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {ecosystem.map((item, i) => (
            <div key={i} className="eco-item text-center">
              <item.icon size={32} className="text-solar-gold mx-auto" strokeWidth={1.5} />
              <h4 className="text-[1rem] text-white font-medium mt-4">{item.title}</h4>
              <p className="text-[rgba(255,255,255,0.72)] mt-2">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Integration pills */}
        <div className="flex flex-col items-center mt-12">
          <p className="text-caption text-[rgba(255,255,255,0.45)] mb-4">Integracion de:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {pills.map((pill) => (
              <span
                key={pill}
                className="border border-[rgba(255,255,255,0.1)] rounded-full px-4 py-1.5 text-caption text-[rgba(255,255,255,0.72)]"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
