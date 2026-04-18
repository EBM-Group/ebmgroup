import ScrollReveal from '../components/ScrollReveal'

const nodos = [
  { label: 'NODO LLANOS', active: true },
  { label: 'NODO AMAZONIA', active: false },
  { label: 'NODO ANDINO', active: false },
  { label: 'NODO CARIBE', active: false },
]

export default function Bioagencia() {
  return (
    <section className="bg-void-black w-full py-24 md:py-32">
      <div className="content-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-16 items-center">
          {/* Left - Image */}
          <ScrollReveal y={20} className="order-2 lg:order-1">
            <img
              src="./images/img-bioagencia-piloto.jpg"
              alt="Piloto Arauca Bioagencia Diversa"
              className="w-full rounded-2xl object-cover"
              style={{ aspectRatio: '4/3' }}
            />
          </ScrollReveal>

          {/* Right - Text */}
          <ScrollReveal className="order-1 lg:order-2" stagger={0.1}>
            <div>
              <p className="text-caption text-muted-gold mb-4">
                BIOAGENCIA DIVERSA · PILOTO ARAUCA
              </p>
              <h2 className="text-display-l text-white font-bold">
                La bioeconomia como motor real de transicion energetica
              </h2>
              <p className="text-body-l text-[rgba(255,255,255,0.72)] mt-6">
                BIOAGENCIA DIVERSA emerge como respuesta estructural a los desafios del territorio, articulando la Union Sindical Obrera (USO), la Universidad Obrera de Colombia, el Estado y el capital privado en una arquitectura institucional inedita.
              </p>
              <p className="text-[rgba(255,255,255,0.72)] mt-4 leading-relaxed">
                El Piloto Arauca constituye la celula madre del modelo: un centro de desarrollo e investigacion que transforma la biomasa en energia, el maiz en bioetanol, los residuos agropecuarios en nuevas cadenas productivas y la restauracion ambiental en motor de desarrollo economico regional.
              </p>

              {/* Nodos pills */}
              <div className="flex flex-wrap gap-3 mt-8">
                {nodos.map((nodo) => (
                  <span
                    key={nodo.label}
                    className={`text-caption font-medium px-4 py-2 rounded-full ${
                      nodo.active
                        ? 'bg-solar-gold text-void-black'
                        : 'border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.72)]'
                    }`}
                  >
                    {nodo.label}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
