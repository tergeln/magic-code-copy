import { useEffect, useState } from 'react';
import Tr from '../../components/Tr/Tr';
import { chapterLinks } from '../../data/navLinks';

// CSS-ээр үргэлж нуугдсан (display:none!important) боловч эх markup болон scroll-ийн active төлөвийг хадгалав.
export default function ChapterIndex() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const update = () => {
      const h = window.innerHeight;
      let current = '';
      chapterLinks.forEach((link) => {
        const el = document.querySelector(link.hash);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < h * 0.6 && r.bottom > h * 0.3) current = link.hash;
      });
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <nav className="chapter-index" aria-label="Chapters">
      {chapterLinks.map((link) => (
        <a key={link.hash} href={link.hash} className={active === link.hash ? 'active' : undefined}>
          <Tr text={link} />
        </a>
      ))}
    </nav>
  );
}
