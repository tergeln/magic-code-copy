import * as THREE from 'three'

const SHAPES = ['home', 'manifesto', 'courses', 'about', 'activities', 'method', 'journey', 'merch', 'contact'] as const

export function mountParticleUniverse() {
  if (!window.WebGLRenderingContext) return () => undefined
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const narrow = window.innerWidth < 760
  const count = narrow ? 2600 : 7000
  const canvas = document.createElement('canvas')
  canvas.id = 'pg'
  canvas.setAttribute('aria-hidden', 'true')
  document.body.prepend(canvas)

  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
  } catch {
    canvas.remove()
    return () => undefined
  }
  document.documentElement.classList.add('original-universe-ready')

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.z = 9
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const targets = [0, 1, 2, 3, 4, 5].map(() => new Float32Array(count * 3))
  const blue = new THREE.Color(0x3a5bff)
  const gold = new THREE.Color(0xe8d5a3)
  const mix = new THREE.Color()
  const grid = Math.ceil(Math.sqrt(count))
  const cube = Math.round(Math.cbrt(count))

  for (let i = 0; i < count; i += 1) {
    const j = i * 3
    const f = i / count
    const a1 = f * 6.2832
    const w1 = ((i * 0.618) % 1 - 0.5) * 1.1
    targets[0].set([Math.sin(a1) * 3.4 + w1 * Math.cos(a1 / 2) * 0.6, Math.sin(2 * a1) * 1.1 + w1 * Math.sin(a1 / 2), Math.cos(a1) * 1.8], j)
    const u = f * 6.2832
    const v = i * 2.4
    const q = 2 + Math.cos(3 * u)
    targets[1].set([q * Math.cos(2 * u) * 1.1 + Math.cos(v) * 0.35, q * Math.sin(2 * u) * 1.1 + Math.sin(v) * 0.35, Math.sin(3 * u) * 1.4], j)
    const gx = (i % grid) / grid - 0.5
    const gz = Math.floor(i / grid) / grid - 0.5
    targets[2].set([gx * 13, Math.sin(gx * 14) * Math.cos(gz * 14) * 0.9 - 1, gz * 13], j)
    const t = f * 38 + (i % 2) * Math.PI
    targets[3].set([Math.cos(t) * 1.8, (f - 0.5) * 9, Math.sin(t) * 1.8], j)
    const gr = Math.sqrt(f) * 5.6
    const ga = gr * 1.7 + (i % 3) * 2.094 + (Math.random() - 0.5) * 0.4
    targets[4].set([Math.cos(ga) * gr, (Math.random() - 0.5) * 0.4 * (1.3 - gr / 6), Math.sin(ga) * gr], j)
    const lx = (i % cube) / cube - 0.5
    const ly = (Math.floor(i / cube) % cube) / cube - 0.5
    const lz = (Math.floor(i / (cube * cube)) % cube) / cube - 0.5
    const twist = ly * 2.2
    targets[5].set([(lx * Math.cos(twist) - lz * Math.sin(twist)) * 5.5, ly * 5.5, (lx * Math.sin(twist) + lz * Math.cos(twist)) * 5.5], j)
    positions.set([(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30], j)
    mix.copy(blue).lerp(gold, ((Math.sin(i * 0.37) + 1) / 2) * (0.4 + f * 0.6))
    colors.set([mix.r, mix.g, mix.b], j)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const material = new THREE.PointsMaterial({
    size: narrow ? 0.06 : 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  })
  const points = new THREE.Points(geometry, material)
  scene.add(points)

  const resize = () => {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, narrow ? 1.5 : 2))
    renderer.setSize(window.innerWidth, window.innerHeight, false)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }

  const shapeOf: Record<string, number> = { home: 0, manifesto: 4, courses: 0, about: 1, activities: 5, method: 3, journey: 2, merch: 4, contact: 5 }
  const offsets = [2.7, -2.7, 2.5, 0, 2.6, -2.6]
  const opacities = [0.95, 0.6, 0.55, 0.5, 0.7, 0.6]
  let shape = 0
  let ready = false
  let pointerX = 0
  let pointerY = 0
  let lastY = window.scrollY
  let velocity = 0
  let spin = 0
  let alive = true
  let frame = 0

  const onPointer = (event: PointerEvent) => {
    pointerX = event.clientX / window.innerWidth - 0.5
    pointerY = event.clientY / window.innerHeight - 0.5
  }
  const boot = window.setTimeout(() => {
    ready = true
  }, 1100)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) shape = shapeOf[entry.target.id] ?? shape
      })
    },
    { rootMargin: '-45% 0px -45% 0px' },
  )
  SHAPES.forEach((id) => {
    const element = document.getElementById(id)
    if (element) observer.observe(element)
  })

  const render = () => {
    if (!alive) return
    frame = window.requestAnimationFrame(render)
    if (document.hidden) return
    const ease = ready ? 0.045 : 0
    const target = targets[shape] ?? targets[0]
    for (let i = 0; i < count * 3; i += 1) positions[i] += (target[i] - positions[i]) * ease
    const position = geometry.getAttribute('position')
    if (position) position.needsUpdate = true
    velocity += (window.scrollY - lastY - velocity) * 0.1
    lastY = window.scrollY
    if (!reduced) spin += 0.003
    points.rotation.y += (spin + pointerX * 1.2 + velocity * 0.02 - points.rotation.y) * 0.05
    points.rotation.x += (((shape === 2 || shape === 4 ? 0.9 : pointerY * 0.6) - points.rotation.x) * 0.04)
    points.position.x += ((narrow ? 0 : offsets[shape] ?? 0) - points.position.x) * 0.04
    points.position.y += ((narrow ? 2 : 0) - points.position.y) * 0.04
    const nextOpacity = narrow ? (opacities[shape] ?? 0.6) * 0.55 : (opacities[shape] ?? 0.6)
    material.opacity += (nextOpacity - material.opacity) * 0.05
    camera.position.z = 9 - Math.min(Math.abs(velocity) * 0.05, 2)
    renderer.render(scene, camera)
  }

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onPointer)
  frame = window.requestAnimationFrame(render)

  return () => {
    alive = false
    window.clearTimeout(boot)
    window.cancelAnimationFrame(frame)
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onPointer)
    observer.disconnect()
    geometry.dispose()
    material.dispose()
    renderer.dispose()
    canvas.remove()
    document.documentElement.classList.remove('original-universe-ready')
  }
}
