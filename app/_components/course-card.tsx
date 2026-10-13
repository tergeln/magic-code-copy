import Image from "next/image"
import { Button, Icon } from "./ui"

export type CourseCardProps = {
  chip: string
  title: string
  description: string
  meta: string[]
  footer: string
  action: { label: string; href: string }
  featured?: boolean
  coverImage?: string | null
}

export function CourseCard({
  chip,
  title,
  description,
  meta,
  footer,
  action,
  featured,
  coverImage
}: CourseCardProps) {
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-3xl border bg-surface ${
        featured ? "border-vip" : "border-line"
      }`}
    >
      <div
        className={`relative flex h-[200px] shrink-0 items-center justify-center overflow-hidden bg-linear-to-r ${
          featured ? "from-[#3d2b0d] to-[#171233]" : "from-[#1c1640] to-[#0a2933]"
        }`}
      >
        {coverImage ? (
          <Image src={coverImage} alt='' fill unoptimized className='object-cover' />
        ) : (
          <Icon name={featured ? "cover-star-vip" : "cover-star"} width={56} />
        )}
      </div>
      <div className='flex flex-1 flex-col items-start gap-4 p-6'>
        <div
          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${
            featured ? "border-vip" : "border-line-strong"
          }`}
        >
          <Icon name={featured ? "chip-dot-vip" : "chip-dot"} width={6} />
          <span
            className={`text-caption ${featured ? "text-vip" : "text-ink-2"}`}
          >
            {chip}
          </span>
        </div>
        <h3 className='text-h3 text-ink'>{title}</h3>
        <p className='text-body-s text-ink-2'>{description}</p>
        <div className='flex gap-4 text-caption text-ink-3 uppercase'>
          {meta.map(m => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <div className='mt-auto h-px w-full bg-line' />
        <div className='flex w-full items-center justify-between gap-4'>
          <span className='text-h4 text-ink'>{footer}</span>
          <Button href={action.href} variant='ghost'>
            {action.label}
          </Button>
        </div>
      </div>
    </article>
  )
}
