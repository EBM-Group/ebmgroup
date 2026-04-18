import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

function MagneticCurvedGrid({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: false })
    if (!ctx) return

    let animId = 0
    let w = 0
    let h = 0
    let mouseX = -1000
    let mouseY = -1000
    let lastMoveTime = 0
    let autoRotateAngle = 0
    let time = 0

    const isMobile = window.innerWidth < 768
    const gridSizeX = isMobile ? 30 : 50
    const gridSizeY = isMobile ? 18 : 30
    const spacing = 18
    const perspective = 800
    const waveSpeed = 0.0015
    const waveAmplitude = 12
    const mouseRadius = 150
    const mouseForce = 80
    const baseRotationX = -25 * (Math.PI / 180)

    const resize = () => {
      w = canvas!.width = window.innerWidth
      h = canvas!.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      lastMoveTime = performance.now()
    }

    const project3D = (x: number, y: number, z: number, rotY: number) => {
      const cx = w / 2
      const cy = h / 2

      // Rotation around X axis (tilt)
      const y1 = y * Math.cos(baseRotationX) - z * Math.sin(baseRotationX)
      const z1 = y * Math.sin(baseRotationX) + z * Math.cos(baseRotationX)

      // Rotation around Y axis
      const x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY)
      const z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY)

      // Perspective projection
      const scale = perspective / (perspective + z2)
      return {
        x: cx + x2 * scale,
        y: cy + y1 * scale,
        scale,
        z: z2,
      }
    }

    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      time += 1

      const now = performance.now()
      const mouseActive = now - lastMoveTime < 3000

      if (mouseActive) {
        autoRotateAngle += 0.0005
      } else {
        autoRotateAngle += 0.003
      }

      const rotY = autoRotateAngle

      // Pre-calculate all grid points
      const points: { x: number; y: number; z: number; px: number; py: number; scale: number; depth: number; brightness: number }[] = []

      for (let gy = 0; gy < gridSizeY; gy++) {
        for (let gx = 0; gx < gridSizeX; gx++) {
          const nx = gx - gridSizeX / 2
          const ny = gy - gridSizeY / 2

          const baseX = nx * spacing
          const baseY = ny * spacing

          // Wave undulation
          const waveZ = Math.sin(nx * 0.15 + time * waveSpeed) * Math.cos(ny * 0.1 + time * waveSpeed * 0.7) * waveAmplitude

          // Curved perspective (bend grid toward vanishing point)
          const curveX = nx * nx * 0.08
          const curveY = ny * ny * 0.05

          let px = baseX + curveX
          let py = baseY + curveY
          let pz = waveZ

          // Mouse interaction
          const proj = project3D(px, py, pz, rotY)
          const dx = proj.x - mouseX
          const dy = proj.y - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseRadius && mouseActive) {
            const force = (1 - dist / mouseRadius) * mouseForce
            const angle = Math.atan2(dy, dx)
            px += Math.cos(angle) * force * 0.3
            py += Math.sin(angle) * force * 0.3
            pz -= force * 0.5
          }

          const final = project3D(px, py, pz, rotY)
          const depthFactor = final.scale
          const brightness = Math.max(0.15, Math.min(0.7, depthFactor * 0.5))

          points.push({
            x: gx,
            y: gy,
            z: pz,
            px: final.x,
            py: final.y,
            scale: depthFactor,
            depth: depthFactor,
            brightness,
          })
        }
      }

      // Draw points
      for (const p of points) {
        const size = Math.max(1, 1.5 * p.scale)

        // Mouse proximity color shift
        const dx = p.px - mouseX
        const dy = p.py - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const goldFactor = mouseActive && dist < mouseRadius ? (1 - dist / mouseRadius) : 0

        const r = Math.round(245 * goldFactor + 255 * (1 - goldFactor))
        const g = Math.round(197 * goldFactor + 255 * (1 - goldFactor))
        const b = Math.round(24 * goldFactor + 255 * (1 - goldFactor))
        const alpha = p.brightness * (0.4 + goldFactor * 0.5)

        // Glow pass
        if (goldFactor > 0.1) {
          ctx.beginPath()
          ctx.arc(p.px, p.py, size * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.08})`
          ctx.fill()
        }

        // Main point
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.fillRect(p.px - size / 2, p.py - size / 2, size, size)
      }

      // Draw connecting lines for nearby points
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        // Connect to right neighbor
        if (p.x < gridSizeX - 1) {
          const right = points[i + 1]
          ctx.beginPath()
          ctx.moveTo(p.px, p.py)
          ctx.lineTo(right.px, right.py)
          ctx.stroke()
        }
        // Connect to bottom neighbor
        if (p.y < gridSizeY - 1) {
          const bottom = points[i + gridSizeX]
          if (bottom) {
            ctx.beginPath()
            ctx.moveTo(p.px, p.py)
            ctx.lineTo(bottom.px, bottom.py)
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [canvasRef])

  return null
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!contentRef.current) return

    const tl = gsap.timeline({ delay: 0.3 })

    // Animate content elements
    const elements = contentRef.current.querySelectorAll('.hero-animate')
    tl.fromTo(
      elements,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' }
    )
  }, { scope: sectionRef })

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center bg-void-black"
    >
      {/* 3D Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      <MagneticCurvedGrid canvasRef={canvasRef} />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center section-padding max-w-[900px] px-4 sm:px-6"
      >
        {/* Pre-label */}
        <p className="hero-animate text-caption text-[rgba(255,255,255,0.45)] tracking-[0.1em] mb-6">
          1923 — 2026 · 103 AÑOS DE HISTORIA OBRERA
        </p>

        {/* Main Headline */}
        <h1 className="hero-animate text-display-xl text-white uppercase" style={{ textShadow: '0 0 40px rgba(0,0,0,0.6)' }}>
          GEE-USO
        </h1>
        <h2 className="hero-animate text-display-l text-[rgba(255,255,255,0.72)] font-light mt-2">
          Grupo Empresarial Estrategico
        </h2>

        {/* Sub-headline */}
        <p className="hero-animate text-body-l text-[rgba(255,255,255,0.45)] mt-4">
          Union Sindical Obrera · Subdirectiva Arauca
        </p>

        {/* Tagline */}
        <p className="hero-animate text-body-l text-[rgba(255,255,255,0.72)] mt-6 max-w-[600px]">
          De la organizacion sindical a la consolidacion de un modelo empresarial estrategico
        </p>

        {/* Stats */}
        <div className="hero-animate flex flex-col sm:flex-row items-center gap-8 sm:gap-12 mt-10">
          <div className="flex flex-col items-center">
            <span className="text-stat text-solar-gold">+1.132</span>
            <span className="text-caption text-[rgba(255,255,255,0.45)] mt-1 text-center">
              AFILIADOS EN LA CADENA<br />ENERGETICA
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-stat text-solar-gold">103</span>
            <span className="text-caption text-[rgba(255,255,255,0.45)] mt-1 text-center">
              AÑOS DE HISTORIA<br />ORGANIZADA
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-stat text-solar-gold">2026</span>
            <span className="text-caption text-[rgba(255,255,255,0.45)] mt-1 text-center">
              AÑO DE<br />TRANSFORMACION
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hero-animate flex flex-col sm:flex-row items-center gap-4 mt-10">
          <button
            onClick={() => handleNavClick('#motores')}
            className="bg-solar-gold text-void-black font-medium text-[1rem] px-8 py-3.5 rounded-lg hover:scale-[1.04] hover:brightness-110 transition-all duration-200 animate-gold-pulse"
          >
            Conoce nuestras unidades
          </button>
          <button
            onClick={() => handleNavClick('#origen')}
            className="bg-transparent border border-[rgba(255,255,255,0.1)] text-white font-medium text-[1rem] px-8 py-3.5 rounded-lg hover:border-solar-gold hover:text-solar-gold transition-all duration-200"
          >
            Nuestra historia
          </button>
        </div>
      </div>
    </section>
  )
}
