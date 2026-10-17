import { skills } from '../data/content'

interface Live {
  selected: number
}

interface MountArgs {
  universe: HTMLCanvasElement
  constellation: HTMLCanvasElement
  cursorGlow: HTMLElement | null
  live: { current: Live }
  onSelect: (index: number) => void
}

export function mountHomeCanvas({ universe, constellation, cursorGlow, live, onSelect }: MountArgs) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const uctx = universe.getContext('2d')
  const cctx = constellation.getContext('2d')
  if (!uctx || !cctx) return () => undefined

  let width = window.innerWidth
  let height = window.innerHeight
  let time = 0
  let last = 0
  let mx = 0.5
  let my = 0.5
  let morph = 0
  let alive = true
  let frame = 0
  const count = window.innerWidth < 760 ? 650 : 1600
  const pts = Array.from({ length: count }, (_, i) => ({
    i,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    z: Math.random(),
    a: i * 2.39996,
  }))
  let positions: [number, number][] = []

  const color = (name: string) => getComputedStyle(document.getElementById('home') ?? document.body).getPropertyValue(name).trim()

  const resize = () => {
    width = window.innerWidth
    height = window.innerHeight
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    for (const canvas of [universe, constellation]) {
      const rect = canvas.getBoundingClientRect()
      const context = canvas.getContext('2d')
      if (!context || rect.width === 0 || rect.height === 0) continue
      canvas.width = rect.width * ratio
      canvas.height = rect.height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
  }

  const onScroll = () => {
    const sections = [...document.querySelectorAll('main section')]
    const index = sections.findIndex((section) => section.getBoundingClientRect().bottom > height * 0.5)
    morph = Math.max(0, index) % 6
  }

  const onPointerMove = (event: PointerEvent) => {
    mx = event.clientX / width
    my = event.clientY / height
    if (cursorGlow) cursorGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
  }

  const onPointerDown = (event: PointerEvent) => {
    const rect = constellation.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    let nearest = -1
    let dist = 48
    positions.forEach((point, index) => {
      const gap = Math.hypot(point[0] - x, point[1] - y)
      if (gap < dist) {
        nearest = index
        dist = gap
      }
    })
    if (nearest >= 0) onSelect(nearest)
  }

  const draw = (now: number) => {
    frame = window.requestAnimationFrame(draw)
    if (!alive || document.hidden || now - last < (reduced ? 160 : 30)) return
    last = now
    if (!reduced) time += 0.009
    uctx.clearRect(0, 0, width, height)
    const glow = color('--glow') || '#8497FF'
    const accent = color('--blue') || '#CDB67F'
    const ink = color('--ink') || '#E8ECFA'
    const centerX = width < 760 ? width * 0.5 : width * 0.72
    const centerY = height * 0.45
    const scale = Math.min(width, height) * 0.26
    const spin = Math.cos(time * 0.2)
    const sine = Math.sin(time * 0.2)
    const dark = document.documentElement.dataset.theme === 'dark'
    pts.forEach((point) => {
      const f = point.i / count
      let x = 0
      let y = 0
      let z = 0
      if (morph === 1) {
        const radius = 2 + Math.cos(f * Math.PI * 6)
        x = radius * Math.cos(f * Math.PI * 4)
        y = radius * Math.sin(f * Math.PI * 4)
        z = Math.sin(f * Math.PI * 6)
      } else if (morph === 2) {
        x = ((point.i % 40) / 40 - 0.5) * 8
        z = (Math.floor(point.i / 40) / Math.ceil(count / 40) - 0.5) * 8
        y = Math.sin(x * 2 + time) * Math.cos(z * 2) * 0.6
      } else if (morph === 3) {
        x = Math.cos(f * 38 + (point.i % 2) * Math.PI) * 1.6
        y = (f - 0.5) * 7
        z = Math.sin(f * 38 + (point.i % 2) * Math.PI) * 1.6
      } else if (morph === 4) {
        const radius = Math.sqrt(f) * 4
        const angle = radius * 1.7 + (point.i % 3) * 2.094
        x = Math.cos(angle) * radius
        y = (point.z - 0.5) * 0.5
        z = Math.sin(angle) * radius
      } else if (morph === 5) {
        x = ((point.i % 12) / 12 - 0.5) * 5
        y = ((Math.floor(point.i / 12) % 12) / 12 - 0.5) * 5
        z = (Math.floor(point.i / 144) / Math.ceil(count / 144) - 0.5) * 5
      } else {
        const angle = f * Math.PI * 2
        const band = (point.z - 0.5) * 0.8
        x = Math.sin(angle) * 3.4 + band * Math.cos(angle / 2)
        y = Math.sin(angle * 2) * 1.1 + band
        z = Math.cos(angle) * 1.8
      }
      const rx = x * spin - z * sine
      const rz = x * sine + z * spin
      const ry = y * Math.cos(0.3 + my * 0.3) - rz * Math.sin(0.3 + my * 0.3)
      const perspective = 8 / (8 + rz)
      const targetX = centerX + (rx + (mx - 0.5) * 0.3) * scale * 0.72 * perspective
      const targetY = centerY + ry * scale * 0.72 * perspective
      point.x += (targetX - point.x) * 0.055
      point.y += (targetY - point.y) * 0.055
      uctx.globalAlpha = (dark ? 0.52 : 0.36) * (width < 760 ? 0.6 : 1)
      uctx.fillStyle = point.i % 5 === 0 ? accent : glow
      uctx.beginPath()
      uctx.arc(point.x, point.y, ((point.i % 3) * 0.22 + 0.65) * perspective, 0, Math.PI * 2)
      uctx.fill()
    })
    uctx.globalAlpha = 1

    const rect = constellation.getBoundingClientRect()
    if (rect.bottom > 0 && rect.width > 0) {
      const cw = rect.width
      const ch = rect.height
      cctx.clearRect(0, 0, cw, ch)
      const narrow = width < 760
      positions = skills.map((skill, index) => [
        (narrow ? 0.1 + skill.x * 0.8 : skill.x) * cw + Math.sin(time + index * 1.7) * 10,
        skill.y * ch * (narrow ? 0.8 : 1) + Math.cos(time * 0.8 + index * 2.1) * 10,
      ])
      positions.forEach((a, i) => {
        positions.forEach((b, j) => {
          if (j <= i) return
          const distance = Math.hypot(a[0] - b[0], a[1] - b[1])
          const max = Math.max(cw, ch) * 0.3
          if (distance >= max) return
          cctx.strokeStyle = glow
          cctx.globalAlpha = (1 - distance / max) * 0.5
          cctx.beginPath()
          cctx.moveTo(a[0], a[1])
          cctx.lineTo(b[0], b[1])
          cctx.stroke()
          const u = (time * 0.5 + i * 0.37 + j * 0.21) % 1
          cctx.fillStyle = accent
          cctx.globalAlpha = 0.85
          cctx.beginPath()
          cctx.shadowColor = accent
          cctx.shadowBlur = 8
          cctx.arc(a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, 2.6, 0, Math.PI * 2)
          cctx.fill()
          cctx.shadowBlur = 0
        })
      })
      const selected = live.current.selected
      const mongolian = document.documentElement.lang === 'mn'
      positions.forEach((point, index) => {
        const halo = cctx.createRadialGradient(point[0], point[1], 0, point[0], point[1], 24)
        halo.addColorStop(0, index === selected ? accent : glow)
        halo.addColorStop(1, 'transparent')
        cctx.globalAlpha = 0.3
        cctx.fillStyle = halo
        cctx.beginPath()
        cctx.arc(point[0], point[1], 24, 0, Math.PI * 2)
        cctx.fill()
        cctx.globalAlpha = 1
        cctx.fillStyle = index === selected ? accent : ink
        cctx.beginPath()
        cctx.arc(point[0], point[1], index === selected ? 5.5 : 3.5, 0, Math.PI * 2)
        cctx.fill()
        cctx.globalAlpha = 0.7
        cctx.font = "300 14px 'Roboto', sans-serif"
        cctx.fillText(mongolian ? skills[index].mn : skills[index].en, point[0] + 13, point[1] + 5)
        if (index === selected) {
          cctx.strokeStyle = accent
          cctx.beginPath()
          cctx.arc(point[0], point[1], 14 + Math.sin(time * 4) * 2, 0, Math.PI * 2)
          cctx.stroke()
        }
      })
      cctx.globalAlpha = 1
    }
  }

  resize()
  onScroll()
  const observer = new ResizeObserver(resize)
  observer.observe(universe)
  observer.observe(constellation)
  window.addEventListener('resize', resize)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('pointermove', onPointerMove)
  constellation.addEventListener('pointerdown', onPointerDown)
  frame = window.requestAnimationFrame(draw)

  return () => {
    alive = false
    window.cancelAnimationFrame(frame)
    observer.disconnect()
    window.removeEventListener('resize', resize)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('pointermove', onPointerMove)
    constellation.removeEventListener('pointerdown', onPointerDown)
  }
}
