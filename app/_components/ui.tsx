import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

export function Icon({
  name,
  width,
  height = width,
  className
}: {
  name: string
  width: number
  height?: number
  className?: string
}) {
  return (
    <Image
      src={`/figma/${name}.svg`}
      alt=''
      width={width}
      height={height}
      unoptimized
      className={`shrink-0 ${className ?? ""}`}
    />
  )
}

export function Logo() {
  return (
    <Link href='/' className='flex items-center gap-2.5'>
      <Image
        src='/brand-logo.svg'
        alt=''
        width={46}
        height={22}
        unoptimized
        className='shrink-0'
      />
      {/* <span className='text-h4 text-ink'>MAGIC CODE AI</span> */}
    </Link>
  )
}

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: "primary" | "outline" | "ghost"
  size?: "md" | "lg"
  className?: string
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = ""
}: ButtonProps) {
  const sizes = { md: "px-[18px] py-2.5", lg: "px-7 py-4" }
  const variants = {
    primary:
      "bg-linear-to-r from-violet to-cyan text-canvas hover:brightness-110",
    outline: "border border-line-strong text-ink hover:bg-white/5",
    ghost: "text-ink hover:bg-white/5"
  }
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full text-label-m whitespace-nowrap transition ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className='flex items-center gap-2.5'>
      <Icon name='live-indicator' width={7} />
      <span className='text-caption text-cyan'>{children}</span>
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = ""
}: {
  eyebrow: string
  title: string
  description: string
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className='text-[32px] leading-[1.08] font-medium tracking-[-0.8px] text-ink md:text-h2'>
        {title}
      </h2>
      <p className='text-body-m text-ink-2'>{description}</p>
    </div>
  )
}

export const sectionX = "px-6 md:px-12 lg:px-24"
