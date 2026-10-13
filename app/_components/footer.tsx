import Link from "next/link"
import { getSiteContent } from "@/lib/magic-api"
import { Logo } from "./ui"

export async function Footer() {
  const { contact, footer } = await getSiteContent()
  const links = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "About us", href: "/about-us" },
    { label: "Contact us", href: `mailto:${contact.email}` }
  ]
  return (
    <footer className='bg-surface px-6 py-8 md:px-12 lg:px-[120px]'>
      <div className='flex flex-col gap-10 border-t border-line pt-12 pb-8'>
        <div className='flex flex-col justify-between gap-8 md:flex-row md:items-start'>
          <div className='flex flex-col gap-3'>
            <Logo />
            <p className='text-body-s text-ink-2'>{footer.tagline}</p>
          </div>
          <nav className='flex flex-wrap gap-9'>
            {links.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className='text-body-s text-ink-2 transition hover:text-ink'
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className='flex justify-between text-caption text-ink-3'>
          <span>{footer.copyright}</span>
          <a href={`mailto:${contact.email}`} className='hover:text-ink-2'>
            {contact.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
