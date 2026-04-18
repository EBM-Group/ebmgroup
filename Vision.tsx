import ScrollReveal from '../components/ScrollReveal'

export default function Vision() {
  return (
    <section className="bg-void-black w-full py-24 md:py-32">
      <div className="content-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Left column - Text */}
          <ScrollReveal>
            <div>
              <p className="text-caption text-muted-gold tracking-[0.08em] mb-4">
                VISION ESTRATEGICA
              </p>
              <h2 className="text-display-l text-white font-bold">
                Transformar la organizacion obrera en un ecosistema productivo sostenible, competitivo e inclusivo
              </h2>
              <p className="text-body-l text-[rgba(255,255,255,0.72)] mt-6">
                GEE-USO impulsa una economia social vibrante, una transicion energetica innovadora y la soberania territorial.
              </p>
              <p className="text-[rgba(255,255,255,0.72)] mt-4 leading-relaxed">
                Una corporacion de propiedad obrera que articula produccion, innovacion, sostenibilidad y desarrollo territorial, inspirada en los modelos de economia social mas exitosos a nivel global.
              </p>

              {/* Declaration quote */}
              <blockquote className="mt-8 border-l-2 border-solar-gold pl-6">
                <p className="text-body-l text-white italic">
                  "La USO, vanguardia historica, hoy lidera la transicion hacia una economia al servicio de la vida. El GEE-USO es innovacion social que dinamiza la economia solidaria y el desarrollo territorial."
                </p>
                <cite className="text-caption text-[rgba(255,255,255,0.45)] mt-3 block not-italic">
                  — Junta Directiva Nacional USO · Subdirectiva Arauca, 2026
                </cite>
              </blockquote>
            </div>
          </ScrollReveal>

          {/* Right column - Image */}
          <ScrollReveal y={20}>
            <div className="relative">
              <img
                src="./images/img-vision-arauca.jpg"
                alt="Arauca, Colombia — Territorio estrategico del futuro"
                className="w-full rounded-xl object-cover"
                style={{ aspectRatio: '4/5', transform: 'rotate(1.5deg)' }}
              />
              <p className="text-caption text-[rgba(255,255,255,0.45)] mt-4">
                Arauca, Colombia — Territorio estrategico del futuro
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
