import { useEffect } from 'react';
import * as THREE from 'three';
import reducedMotion from '../../hooks/reducedMotion';

// section id -> particle хэлбэрийн индекс
const SHAPE_BY_SECTION = { home: 0, manifesto: 4, courses: 0, about: 1, activities: 5, method: 3, journey: 2, merch: 4, contact: 5 };
const X_OFFSET = [2.7, -2.7, 2.5, 0, 2.6, -2.6];
const OPACITY = [0.95, 0.6, 0.55, 0.5, 0.7, 0.6];

// Нэг <canvas id="pg"> үүсгэж, 7000 цэгтэй Three.js particle universe-ийг зурна.
// Unmount үед animation, listener, observer, geometry, material, renderer болон canvas-ыг бүгдийг цэвэрлэнэ.
export default function ParticleUniverse({ onResult }) {
  useEffect(() => {
    const RM = reducedMotion();
    const M = window.innerWidth < 760;
    const N = M ? 2600 : 7000;

    const canvas = document.createElement('canvas');
    canvas.id = 'pg';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    } catch (e) {
      canvas.remove();
      onResult(false);
      return undefined;
    }
    document.documentElement.classList.add('original-universe-ready');
    onResult(true);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 9;

    const P = new Float32Array(N * 3);
    const C = new Float32Array(N * 3);
    const T = [0, 1, 2, 3, 4, 5].map(() => new Float32Array(N * 3));
    const ca = new THREE.Color(0x3a5bff);
    const cb = new THREE.Color(0xe8d5a3);
    const cc = new THREE.Color();
    const g0 = Math.ceil(Math.sqrt(N));
    const n3 = Math.round(Math.cbrt(N));

    for (let i = 0; i < N; i++) {
      const j = i * 3;
      const f = i / N;
      const a1 = f * 6.2832;
      const w1 = (((i * 0.618) % 1) - 0.5) * 1.1;
      T[0].set([Math.sin(a1) * 3.4 + w1 * Math.cos(a1 / 2) * 0.6, Math.sin(2 * a1) * 1.1 + w1 * Math.sin(a1 / 2), Math.cos(a1) * 1.8], j);
      const u = f * 6.2832;
      const v = i * 2.4;
      const q = 2 + Math.cos(3 * u);
      T[1].set([q * Math.cos(2 * u) * 1.1 + Math.cos(v) * 0.35, q * Math.sin(2 * u) * 1.1 + Math.sin(v) * 0.35, Math.sin(3 * u) * 1.4], j);
      const gx = (i % g0) / g0 - 0.5;
      const gz = Math.floor(i / g0) / g0 - 0.5;
      T[2].set([gx * 13, Math.sin(gx * 14) * Math.cos(gz * 14) * 0.9 - 1, gz * 13], j);
      const t = f * 38 + (i % 2) * Math.PI;
      T[3].set([Math.cos(t) * 1.8, (f - 0.5) * 9, Math.sin(t) * 1.8], j);
      const gr = Math.sqrt(f) * 5.6;
      const ga = gr * 1.7 + (i % 3) * 2.094 + (Math.random() - 0.5) * 0.4;
      T[4].set([Math.cos(ga) * gr, (Math.random() - 0.5) * 0.4 * (1.3 - gr / 6), Math.sin(ga) * gr], j);
      const lx = (i % n3) / n3 - 0.5;
      const ly2 = (Math.floor(i / n3) % n3) / n3 - 0.5;
      const lz = (Math.floor(i / (n3 * n3)) % n3) / n3 - 0.5;
      const tw = ly2 * 2.2;
      T[5].set([(lx * Math.cos(tw) - lz * Math.sin(tw)) * 5.5, ly2 * 5.5, (lx * Math.sin(tw) + lz * Math.cos(tw)) * 5.5], j);
      P.set([(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30], j);
      cc.copy(ca).lerp(cb, ((Math.sin(i * 0.37) + 1) / 2) * (0.4 + f * 0.6));
      C.set([cc.r, cc.g, cc.b], j);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(P, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(C, 3));
    const material = new THREE.PointsMaterial({ size: M ? 0.06 : 0.05, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const size = () => {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, M ? 1.5 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', size);
    size();

    let ti = 0;
    let go = false;
    let mx = 0;
    let my = 0;
    let ly = window.scrollY;
    let vel = 0;
    let k = 0;
    const startTimer = setTimeout(() => {
      go = true;
    }, 1100);
    const onPointer = (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('pointermove', onPointer);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) ti = SHAPE_BY_SECTION[e.target.id];
      }),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    Object.keys(SHAPE_BY_SECTION).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      const L = go ? 0.045 : 0;
      const target = T[ti];
      for (let i = 0; i < N * 3; i++) P[i] += (target[i] - P[i]) * L;
      geometry.attributes.position.needsUpdate = true;
      vel += ((window.scrollY - ly) - vel) * 0.1;
      ly = window.scrollY;
      if (!RM) k += 0.003;
      points.rotation.y += ((k + mx * 1.2 + vel * 0.02) - points.rotation.y) * 0.05;
      points.rotation.x += (((ti === 2 || ti === 4) ? 0.9 : my * 0.6) - points.rotation.x) * 0.04;
      points.position.x += ((M ? 0 : X_OFFSET[ti]) - points.position.x) * 0.04;
      points.position.y += ((M ? 2 : 0) - points.position.y) * 0.04;
      material.opacity += ((M ? OPACITY[ti] * 0.55 : OPACITY[ti]) - material.opacity) * 0.05;
      camera.position.z = 9 - Math.min(Math.abs(vel) * 0.05, 2);
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(startTimer);
      observer.disconnect();
      window.removeEventListener('resize', size);
      window.removeEventListener('pointermove', onPointer);
      scene.remove(points);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      document.documentElement.classList.remove('original-universe-ready');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
