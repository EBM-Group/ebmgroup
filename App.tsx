import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Vision from './sections/Vision'
import Origen from './sections/Origen'
import ModeloTransformacion from './sections/ModeloTransformacion'
import CuatroMotores from './sections/CuatroMotores'
import Bioagencia from './sections/Bioagencia'
import Arauca from './sections/Arauca'
import Instrumentos from './sections/Instrumentos'
import Alianzas from './sections/Alianzas'
import Impacto from './sections/Impacto'
import Contacto from './sections/Contacto'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(rafCallback)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="font-space bg-void-black text-white min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Vision />
        <Origen />
        <ModeloTransformacion />
        <CuatroMotores />
        <Bioagencia />
        <Arauca />
        <Instrumentos />
        <Alianzas />
        <Impacto />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}
