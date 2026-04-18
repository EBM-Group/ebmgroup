import ScrollReveal from '../components/ScrollReveal'
import { Award, TreePine, Handshake } from 'lucide-react'

const instrumentos = [
  {
    icon: Award,
    title: 'Bonos de Carbono',
    cert: 'VERRA / Gold Standard',
    desc: 'Certificacion internacional para proyectos de reduccion de emisiones. Acceso a mercados de carbono globales.',
  },
  {
    icon: TreePine,
    title: 'Creditos de Biodiversidad',
    cert: '',
    desc: 'Bancos de habitat, bosques para siempre y pasivos ambientales transformados en activos productivos.',
  },
  {
    icon: Handshake,
    title: 'Pagos por Servicios Ambientales',
    cert: 'Ley 2294/23',
    desc: 'Obras por Impuestos (Ecopetrol) e instrumentos de compensacion. Incentivo Forestal CIF (Ley 139/94).',
  },
]

export default function Instrumentos() {
  return (
    <section className="bg-void-black w-full py-24 md:py-32">
      <div className="content-max section-padding">
        {/* Header */}
        <div className="text-center">
          <p className="text-caption text-muted-gold mb-4">INSTRUMENTOS FINANCIEROS ACTIVOS</p>
          <h2 className="text-display-l text-white font-bold">Finanzas climaticas y sostenibles</h2>
          <p className="text-body-l text-[rgba(255,255,255,0.72)] mt-4">
            La transicion energetica se financia con sostenibilidad social, economica y ambiental
          </p>
        </div>

        {/* 3-column grid */}
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" stagger={0.12} y={40}>
          {instrumentos.map((inst, i) => (
            <div
              key={i}
              className="bg-abyssal-blue rounded-xl p-8 border border-[rgba(255,255,255,0.1)]"
            >
              <inst.icon size={36} className="text-solar-gold" strokeWidth={1.5} />
              <h3 className="text-heading-m text-white font-medium mt-4">{inst.title}</h3>
              {inst.cert && (
                <p className="text-caption text-muted-gold mt-2">{inst.cert}</p>
              )}
              <p className="text-[rgba(255,255,255,0.72)] mt-4 leading-relaxed">{inst.desc}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
