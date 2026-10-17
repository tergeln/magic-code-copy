import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from '../context/SiteContext'

const links = [
  { href: '/#about', mn: 'Бидний тухай', en: 'About us' },
  { href: '/#activities', mn: 'Үйл ажиллагаа', en: 'What we do' },
  { href: '/#courses', mn: 'Сургалт', en: 'Courses' },
  { href: '/#merch', mn: 'Бүтээгдэхүүн', en: 'Merch' },
  { href: '/#contact', mn: 'Холбоо барих', en: 'Contact' },
]

export function Header() {
  const { lang, t, toggleLang, toggleTheme, cart, setCartOpen, menuOpen, setMenuOpen } = useSite()
  const timer = useRef(0)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const header = headerRef.current
    const onFocusOut = () => {
      window.setTimeout(() => {
        const nav = document.getElementById('nav')
        const trigger = document.getElementById('menuBtn')
        const active = document.activeElement
        if (nav && !nav.contains(active) && active !== trigger) setMenuOpen(false)
      }, 0)
    }
    window.addEventListener('keydown', onKey)
    header?.addEventListener('focusout', onFocusOut)
    return () => {
      window.clearTimeout(timer.current)
      window.removeEventListener('keydown', onKey)
      header?.removeEventListener('focusout', onFocusOut)
    }
  }, [setMenuOpen])

  const hoverFine = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const setOpen = (open: boolean) => {
    window.clearTimeout(timer.current)
    setMenuOpen(open)
  }

  return (
    <header ref={headerRef}>
      <div className="wrap">
        <Link className="brand" to="/" aria-label="Magic Code AI">
          <img className="brand-logo" src="/assets/magic-code-logo.png" alt="Magic Code AI" width="332" height="214" />
        </Link>
        <nav
          id="nav"
          className={menuOpen ? 'open' : undefined}
          onPointerEnter={() => {
            if (hoverFine()) setOpen(true)
          }}
          onPointerLeave={() => {
            if (hoverFine()) timer.current = window.setTimeout(() => setMenuOpen(false), 180)
          }}
          onFocus={() => setOpen(true)}
        >
          {links.map((link) => (
            <Link key={link.href} to={link.href} onClick={() => setOpen(false)}>
              {t(link.mn, link.en)}
            </Link>
          ))}
        </nav>
        <div className="tools">
          <button
            id="themeToggle"
            type="button"
            aria-label={t('Өдрийн болон шөнийн горим солих', 'Switch light or dark theme')}
            onClick={toggleTheme}
          >
            <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 3a9 9 0 0 0 0 18Z" fill="currentColor" />
            </svg>
          </button>
          <button
            className="language"
            id="language"
            type="button"
            role="switch"
            aria-checked={lang === 'en'}
            aria-label={t('Англи хэл рүү солих', 'Switch to Mongolian')}
            onClick={toggleLang}
          >
            <span className={lang === 'mn' ? 'lang-option active' : 'lang-option'}>MN</span>
            <span className={lang === 'en' ? 'lang-option active' : 'lang-option'}>EN</span>
          </button>
          <button
            className="language"
            id="cartBtn"
            type="button"
            aria-label={t('Сонирхсон бүтээгдэхүүн', 'Shopping bag')}
            onClick={() => setCartOpen(true)}
          >
            <svg className="pouch-icon" viewBox="0 0 32 36" width="27" height="30" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="pouchFabric" x1="6" y1="10" x2="27" y2="33" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#876587" />
                  <stop offset=".5" stopColor="#533852" />
                  <stop offset="1" stopColor="#302333" />
                </linearGradient>
              </defs>
              <path d="M10 11 7 5l5 1 4-3 4 3 5-1-3 6" fill="#61435F" stroke="#DAC795" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M10 12C8 16 3 21 4 27c1 5 6 7 12 7s11-2 12-7c1-6-4-11-6-15Z" fill="url(#pouchFabric)" stroke="#DAC795" strokeWidth="1.4" />
              <path d="M12 15c-3 7-4 11-2 15m6-15v17m4-17c3 7 4 11 2 15" stroke="#C4A77C" strokeWidth="1" opacity=".65" />
              <path d="M9 12c4 1 10 1 14 0M10 12c-5 0-7 5-5 8m17-8c5 0 7 5 5 8" stroke="#E8D5A3" strokeWidth="1.5" strokeLinecap="round" />
              <path d="m15 21 1-3 1 3 3 1-3 1-1 3-1-3-3-1Z" fill="#E8D5A3" />
            </svg>
            <span className="cart-count">{cart.length}</span>
          </button>
          <button
            className="mobile"
            id="menuBtn"
            type="button"
            aria-label={t('Цэс нээх', 'Open menu')}
            aria-expanded={menuOpen}
            onPointerEnter={() => {
              if (hoverFine()) setOpen(true)
            }}
            onPointerLeave={() => {
              if (hoverFine()) timer.current = window.setTimeout(() => setMenuOpen(false), 180)
            }}
            onFocus={() => setOpen(true)}
            onClick={() => {
              if (hoverFine()) setOpen(true)
              else setMenuOpen(!menuOpen)
            }}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  )
}
