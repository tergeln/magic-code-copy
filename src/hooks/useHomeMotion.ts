import { useEffect } from 'react'
import type { Lang } from '../data/content'

export function useHomeMotion(lang: Lang) {
  useEffect(() => {
    const manifesto = document.querySelector('#manifesto .serif')
    const journey = document.getElementById('journey')
    const track = document.getElementById('journeyTrack')
    const chapters = [...document.querySelectorAll<HTMLAnchorElement>('.chapter-index a')]

    const onScroll = () => {
      const view = window.innerHeight
      chapters.forEach((link) => {
        const href = link.getAttribute('href')
        const target = href ? document.querySelector(href) : null
        if (!target) return
        const rect = target.getBoundingClientRect()
        link.classList.toggle('active', rect.top < view * 0.6 && rect.bottom > view * 0.3)
      })
      if (manifesto) {
        const rect = manifesto.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, (view * 0.85 - rect.top) / (rect.height + view * 0.2)))
        ;[...manifesto.children].forEach((word, index) => {
          word.classList.toggle('lit', index < Math.ceil(progress * manifesto.children.length))
        })
      }
      if (journey && track) {
        const progress = Math.max(0, Math.min(1, -journey.getBoundingClientRect().top / (journey.offsetHeight - view)))
        track.style.transform = `translateX(${-(track.scrollWidth - window.innerWidth) * progress}px)`
      }
    }

    onScroll()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('.section-head,.card,.about-copy,.activity,.product-info,.contact,.journey-panel').forEach((element) => {
      observer.observe(element)
    })
    const resizeObserver = new ResizeObserver(onScroll)
    if (track) resizeObserver.observe(track)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [lang])
}
