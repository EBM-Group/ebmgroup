import ScrollReveal from '../components/ScrollReveal'

const motores = [
  {
    num: '01',
    title: 'USO SOLAR',
    subtitle: 'Granja Solar y Comunidades Energeticas',
    details: ['20 MW de capacidad', '+2.000 hogares beneficiados', '-30% costos energeticos'],
    image: './images/img-motor-solar.jpg',
  },
  {
    num: '02',
    title: 'HUB ENERGETICO',
    subtitle: 'Zona Franca Permanente Especial (ZFPE)',
    details: ['Energia renovable', 'Agroindustria', 'Logistica estrategica', 'C+T+I'],
    image: './images/img-motor-hub.jpg',
  },
  {
    num: '03',
    title: 'BIOAGENCIA DIVERSA',
    subtitle: 'Bioeconomia, Restauracion y Transicion Energetica',
    details: ['Biomasa → energia', 'Maiz → bioetanol', 'Restauracion → desarrollo economico'],
    image: './images/img-motor-bio.jpg',
  },
  {
    num: '04',
    title: 'FUNEDO-UNIOBRERA',
    subtitle: 'Think Tank + Parque Tecnologico',
    details: ['IA aplicada a energia', 'Modelacion climatica', 'Incubadora de startups'],
    image: './images/img-motor-funedo.jpg',
  },
]

export default function CuatroMotores() {
  return (
    <section id="motores" className="bg-abyssal-blue w-full py-24 md:py-32">
      <div className="content-max section-padding">
        {/* Header */}
        <div className="text-center">
          <p className="text-caption text-muted-gold mb-4">CUATRO MOTORES DE TRANSFORMACION</p>
          <h2 className="text-display-l text-white font-bold">
            Ingenieria, infraestructura, tecnologia y conocimiento
          </h2>
          <p className="text-body-l text-[rgba(255,255,255,0.72)] mt-6 max-w-[700px] mx-auto">
            Cuatro motores estrategicos que articulan ingenieria, infraestructura sostenible, ciencia, tecnologia e innovacion para liderar la transicion energetica justa y consolidar la soberania territorial.
          </p>
        </div>

        {/* 4-column grid */}
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-16" stagger={0.12} y={60}>
          {motores.map((motor) => (
            <div
              key={motor.num}
              className="bg-void-black rounded-2xl border border-[rgba(255,255,255,0.1)] overflow-hidden group hover:-translate-y-2 hover:border-[rgba(245,197,24,0.3)] transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={motor.image}
                  alt={motor.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-display-l text-solar-gold font-bold opacity-40">{motor.num}</span>
                <h3 className="text-heading-m text-white font-medium mt-2">{motor.title}</h3>
                <p className="text-[rgba(255,255,255,0.72)] mt-2">{motor.subtitle}</p>
                <ul className="mt-4 space-y-1">
                  {motor.details.map((d, i) => (
                    <li key={i} className="text-[rgba(255,255,255,0.72)] text-sm">· {d}</li>
                  ))}
                </ul>
                <span className="text-caption text-solar-gold uppercase mt-4 inline-block cursor-default">
                  Ver mas →
                </span>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
