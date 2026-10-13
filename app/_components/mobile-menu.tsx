"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function MobileMenu({
  links,
  getStartedLabel
}: {
  links: { label: string; href: string }[]
  getStartedLabel: string
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <div className='md:hidden'>
      <button
        type='button'
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls='mobile-menu'
        onClick={() => setOpen(o => !o)}
        className='flex size-10 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border border-line-strong'
      >
        <span
          className={`h-px w-4 bg-ink transition ${open ? "translate-y-[3px] rotate-45" : ""}`}
        />
        <span
          className={`h-px w-4 bg-ink transition ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <nav
          id='mobile-menu'
          className='absolute inset-x-0 top-full flex flex-col border-b border-line bg-canvas px-6 py-2'
        >
          {links.map(link => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === link.href ? "page" : undefined}
              className='border-b border-line py-4 text-body-m text-ink-2 last:border-b-0 aria-[current=page]:text-ink'
            >
              {link.label}
            </Link>
          ))}
          <Link
            key={"/get-started"}
            href={"/get-started"}
            onClick={() => setOpen(false)}
            aria-current={pathname === "/get-started" ? "page" : undefined}
            className='border-b border-line py-4 text-body-m text-ink-2 last:border-b-0 aria-[current=page]:text-ink'
          >
            {getStartedLabel}
          </Link>
        </nav>
      )}
    </div>
  )
}
