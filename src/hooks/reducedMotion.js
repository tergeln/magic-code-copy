export default function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion:reduce)').matches;
}
