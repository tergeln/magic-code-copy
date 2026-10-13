"use client"

import Link from "next/link"
import { useSyncExternalStore } from "react"
import en from "@/lib/translations/en.json"
import mn from "@/lib/translations/mn.json"
import { MobileMenu } from "./mobile-menu"
import { Button, Logo, sectionX } from "./ui"

const translations = { en, mn }
type Locale = keyof typeof translations
const languageCookie = "site-language"

function subscribeToLocale(callback: () => void) {
  window.addEventListener("site-language-change", callback)
  return () => window.removeEventListener("site-language-change", callback)
}

function getSavedLocale(): Locale {
  const savedLocale = document.cookie
    .split("; ")
    .find(cookie => cookie.startsWith(`${languageCookie}=`))
    ?.split("=")[1]

  return savedLocale === "mn" ? "mn" : "en"
}

function getServerLocale(): Locale {
  return "en"
}

export function Navbar() {
  const locale = useSyncExternalStore(subscribeToLocale, getSavedLocale, getServerLocale)

  const changeLocale = (nextLocale: Locale) => {
    document.cookie = `${languageCookie}=${nextLocale}; path=/; max-age=31536000; samesite=lax`
    window.dispatchEvent(new Event("site-language-change"))
  }

  const content = translations[locale]
  const links = [
    { label: content.nav.home, href: "/" },
    { label: content.nav.aboutUs, href: "/about-us" },
    { label: content.nav.courses, href: "/courses" }
  ]

  return (
    <header
      className={`sticky top-0 z-50 flex h-[82px] items-center justify-between border-b border-line bg-canvas/90 backdrop-blur ${sectionX}`}
    >
      <Logo />
      <nav className='hidden items-center gap-8 md:flex'>
        {links.map(link => (
          <Link
            key={link.label}
            href={link.href}
            className='text-label-m text-ink-2 transition hover:text-ink'
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className='flex items-center gap-3'>
        <div role='group' aria-label='Choose language' className='flex items-center gap-1 text-label-m'>
          <button
            type='button'
            aria-pressed={locale === "en"}
            onClick={() => changeLocale("en")}
            className='cursor-pointer aria-pressed:font-semibold'
          >
            EN
          </button>
          <span aria-hidden='true'>|</span>
          <button
            type='button'
            aria-pressed={locale === "mn"}
            onClick={() => changeLocale("mn")}
            className='cursor-pointer aria-pressed:font-semibold'
          >
            MN
          </button>
        </div>

        <div className='hidden md:block'>
          <Button href='/get-started'>{content.nav.getStarted}</Button>
        </div>

        <MobileMenu links={links} getStartedLabel={content.nav.getStarted} />
      </div>
    </header>
  )
}
