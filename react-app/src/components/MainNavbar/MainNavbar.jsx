import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { navLinks } from '../../data/navLinks';
import Tr from '../Tr/Tr';
import PouchIcon from './PouchIcon';

const hoverCapable = () => window.matchMedia('(hover:hover) and (pointer:fine)').matches;

export default function MainNavbar({ cartCount, onCartClick }) {
  const { lang, t, toggleLang } = useLang();
  const { toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const timer = useRef(0);

  const setMenu = (value) => {
    clearTimeout(timer.current);
    setOpen(value);
  };
  const enter = () => {
    if (hoverCapable()) setMenu(true);
  };
  const leave = () => {
    if (hoverCapable()) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setOpen(false), 180);
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenu(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(timer.current);
    };
  }, []);

  const onBlur = () => {
    setTimeout(() => {
      const active = document.activeElement;
      if (menuRef.current && !menuRef.current.contains(active) && active !== triggerRef.current) setMenu(false);
    }, 0);
  };

  return (
    <header onBlur={onBlur}>
      <div className="wrap">
        <a className="brand" href="#home" aria-label="Magic Code AI">
          <img className="brand-logo" src="/assets/magic-code-logo.png" alt="Magic Code AI" width="332" height="214" />
        </a>
        <nav
          id="nav"
          ref={menuRef}
          className={open ? 'open' : undefined}
          onPointerEnter={enter}
          onPointerLeave={leave}
          onFocus={() => setMenu(true)}
        >
          {navLinks.map((link) => (
            <a key={link.hash} href={link.hash} onClick={() => setOpen(false)}>
              <Tr text={link} />
            </a>
          ))}
        </nav>
        <div className="tools">
          <button id="themeToggle" aria-label={t('Өдрийн болон шөнийн горим солих', 'Switch light or dark theme')} onClick={toggleTheme}>
            <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 3a9 9 0 0 0 0 18Z" fill="currentColor" />
            </svg>
          </button>
          <button
            className="language"
            id="language"
            role="switch"
            aria-checked={lang === 'en'}
            aria-label={t('Хэл солих', 'Switch language')}
            onClick={toggleLang}
          >
            <span className={`lang-option${lang === 'mn' ? ' active' : ''}`}>MN</span>
            <span className={`lang-option${lang === 'en' ? ' active' : ''}`}>EN</span>
          </button>
          <button className="language" id="cartBtn" aria-label={t('Сонирхсон бүтээгдэхүүн', 'Shopping bag')} onClick={onCartClick}>
            <PouchIcon />
            <span className="cart-count" id="count">{cartCount}</span>
          </button>
          <a href="#courses" className="btn"><Tr mn="Элсэх ↗" en="Get started ↗" /></a>
          <button
            className="mobile"
            id="menuBtn"
            ref={triggerRef}
            aria-label={t('Цэс нээх', 'Open menu')}
            aria-expanded={open}
            onPointerEnter={enter}
            onPointerLeave={leave}
            onFocus={() => setMenu(true)}
            onClick={() => (hoverCapable() ? setMenu(true) : setOpen((o) => !o))}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
