import { useEffect, useState } from 'react';
import reducedMotion from '../../hooks/reducedMotion';

export default function Loader() {
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const step = reducedMotion() ? 100 : 8;
    let value = 0;
    let doneTimer;
    const timer = setInterval(() => {
      value = Math.min(100, value + step);
      setPercent(value);
      if (value === 100) {
        clearInterval(timer);
        doneTimer = setTimeout(() => setDone(true), 200);
      }
    }, 45);
    return () => {
      clearInterval(timer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div className={`immersive-loader${done ? ' done' : ''}`} id="immersiveLoad" aria-hidden="true">
      {String(percent).padStart(3, '0')}%
    </div>
  );
}
