import { useEffect, useRef, useState } from 'react';

// Эх JS: сонгосон элементүүдэд `.reveal` нэмж, харагдмагц (threshold .12) `.in` нэмээд observe-ийг зогсооно.
export default function useReveal(baseClass = '') {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const className = `${baseClass ? `${baseClass} ` : ''}reveal${shown ? ' in' : ''}`;
  return [ref, className];
}
