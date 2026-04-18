import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Motores', href: '#motores' },
  { label: 'Arauca', href: '#arauca' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(8,8,8,0.92)] backdrop-blur-[16px] border-b border-[rgba(255,255,255,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full section-padding flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col">
            <span className="text-[1.125rem] font-bold tracking-[-0.02em] text-white leading-tight">
              GEE-USO
            </span>
            <span className="text-caption text-[rgba(255,255,255,0.45)]">
              Con Capital Obrero
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="relative text-[0.9375rem] font-medium text-[rgba(255,255,255,0.72)] hover:text-solar-gold transition-colors duration-250 group"
              >
                {link.label}
                <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-solar-gold transition-all duration-250 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#contacto')}
              className="bg-solar-gold text-void-black font-medium text-[0.875rem] px-5 py-2 rounded-lg hover:scale-[1.03] transition-transform duration-200 animate-gold-pulse"
            >
              Contactar
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-void-black flex flex-col items-center justify-center gap-8 animate-in fade-in duration-300">
          <button
            className="absolute top-5 right-5 text-white text-2xl"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar"
          >
            <X size={32} />
          </button>
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-display-l text-white hover:text-solar-gold transition-colors"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
