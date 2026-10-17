declare module 'three' {
  export class Color {
    constructor(color?: number)
    r: number
    g: number
    b: number
    copy(color: Color): this
    lerp(color: Color, alpha: number): this
  }

  export class Scene {
    add(object: object): void
  }

  export class PerspectiveCamera {
    constructor(fov: number, aspect: number, near: number, far: number)
    position: { z: number }
    aspect: number
    updateProjectionMatrix(): void
  }

  export class BufferGeometry {
    setAttribute(name: string, attribute: BufferAttribute): void
    getAttribute(name: string): { needsUpdate: boolean } | undefined
    dispose(): void
  }

  export class BufferAttribute {
    constructor(array: Float32Array, itemSize: number)
  }

  export class PointsMaterial {
    constructor(parameters: object)
    opacity: number
    dispose(): void
  }

  export class Points {
    constructor(geometry: BufferGeometry, material: PointsMaterial)
    rotation: { x: number; y: number }
    position: { x: number; y: number }
  }

  export class WebGLRenderer {
    constructor(parameters: { canvas: HTMLCanvasElement; alpha: boolean; antialias: boolean })
    setPixelRatio(value: number): void
    setSize(width: number, height: number, updateStyle: boolean): void
    render(scene: Scene, camera: PerspectiveCamera): void
    dispose(): void
  }
}
