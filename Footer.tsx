export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-abyssal-blue w-full">
      <div className="content-max section-padding pt-16 pb-8">
        {/* Top row - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Column 1 - Brand */}
          <div>
            <h3 className="text-heading-m font-bold text-white">GEE-USO</h3>
            <p className="text-caption text-[rgba(255,255,255,0.45)] mt-2">
              Grupo Empresarial Estrategico · Union Sindical Obrera · Subdirectiva Arauca
            </p>
            <p className="text-caption text-muted-gold mt-2">Con Capital Obrero</p>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h4 className="text-caption text-[rgba(255,255,255,0.45)] uppercase mb-4">Enlaces</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Inicio', href: '#hero' },
                { label: 'Cuatro Motores', href: '#motores' },
                { label: 'Arauca', href: '#arauca' },
                { label: 'Impacto', href: '#impacto' },
                { label: 'Contacto', href: '#contacto' },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-[rgba(255,255,255,0.72)] hover:text-solar-gold transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 className="text-caption text-[rgba(255,255,255,0.45)] uppercase mb-4">Contacto</h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:engineeringsas@hotmail.com"
                className="text-[rgba(255,255,255,0.72)] hover:text-solar-gold transition-colors"
              >
                engineeringsas@hotmail.com
              </a>
              <a
                href="https://wa.me/573132800733"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(255,255,255,0.72)] hover:text-solar-gold transition-colors"
              >
                +57 313 280 0733
              </a>
              <a
                href="https://ebm-group.github.io/ebmgroup/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(255,255,255,0.72)] hover:text-solar-gold transition-colors"
              >
                ebm-group.github.io/ebmgroup/
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[rgba(255,255,255,0.1)] my-8" />

        {/* Bottom row */}
        <p className="text-caption text-[rgba(255,255,255,0.45)] text-center">
          Marca registrada. Elaborado por EBM Group S.A.S. en articulacion con USO Subdirectiva Arauca.
        </p>
      </div>
    </footer>
  )
}
