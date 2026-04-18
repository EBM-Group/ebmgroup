import ScrollReveal from '../components/ScrollReveal'
import { Globe, Mail, Phone, MapPin } from 'lucide-react'

const contacts = [
  {
    icon: Globe,
    label: 'WEB',
    value: 'ebm-group.github.io/ebmgroup/',
    href: 'https://ebm-group.github.io/ebmgroup/',
    external: true,
  },
  {
    icon: Mail,
    label: 'EMAIL',
    value: 'engineeringsas@hotmail.com',
    href: 'mailto:engineeringsas@hotmail.com',
    external: false,
  },
  {
    icon: Phone,
    label: 'WHATSAPP',
    value: '+57 313 280 0733',
    href: 'https://wa.me/573132800733',
    external: true,
  },
  {
    icon: MapPin,
    label: 'UBICACION',
    value: 'Arauca, Colombia',
    href: null,
    external: false,
  },
]

export default function Contacto() {
  return (
    <section id="contacto" className="bg-abyssal-blue w-full py-24 md:py-32">
      <div className="content-max section-padding">
        {/* Header */}
        <div className="text-center">
          <p className="text-caption text-muted-gold mb-4">CONTACTO ESTRATEGICO</p>
          <h2 className="text-display-l text-white font-bold">Conectemos</h2>
          <p className="text-body-l text-[rgba(255,255,255,0.72)] mt-4">
            Construyamos juntos el modelo economico del territorio
          </p>
        </div>

        {/* Contact cards */}
        <ScrollReveal
          className="flex flex-wrap justify-center gap-6 mt-12"
          stagger={0.1}
          y={20}
        >
          {contacts.map((contact, i) => {
            const CardContent = (
              <div className="bg-void-black rounded-xl border border-[rgba(255,255,255,0.1)] px-8 py-6 min-w-[240px] text-center hover:border-[rgba(245,197,24,0.3)] transition-colors duration-200">
                <contact.icon size={24} className="text-solar-gold mx-auto" strokeWidth={1.5} />
                <p className="text-caption text-[rgba(255,255,255,0.45)] mt-4">{contact.label}</p>
                <p className="text-[rgba(255,255,255,0.72)] font-medium mt-1">{contact.value}</p>
              </div>
            )

            if (contact.href) {
              return (
                <a
                  key={i}
                  href={contact.href}
                  target={contact.external ? '_blank' : undefined}
                  rel={contact.external ? 'noopener noreferrer' : undefined}
                  className="block"
                >
                  {CardContent}
                </a>
              )
            }

            return <div key={i}>{CardContent}</div>
          })}
        </ScrollReveal>
      </div>
    </section>
  )
}
