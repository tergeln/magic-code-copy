import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { CartDialog } from './components/CartDialog'
import { ChatWidget } from './components/ChatWidget'
import { Classroom } from './components/Classroom'
import { EnrollDialog } from './components/EnrollDialog'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Toast } from './components/Toast'
import { SiteProvider, useSite } from './context/SiteContext'
import { CoursesPage } from './pages/CoursesPage'
import { HomePage } from './pages/HomePage'
import { NewsDetailPage } from './pages/NewsDetailPage'
import { NewsPage } from './pages/NewsPage'

function NavigationEffects() {
  const { pathname, hash, search, key } = useLocation()
  const { openEnroll, closeEnroll, setMenuOpen } = useSite()

  useEffect(() => {
    setMenuOpen(false)
    if (pathname !== '/') closeEnroll()
  }, [pathname, closeEnroll, setMenuOpen])

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return undefined
    }
    const id = decodeURIComponent(hash.slice(1))
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  useEffect(() => {
    if (pathname !== '/') return
    const course = new URLSearchParams(search).get('course')
    if (course === '0' || course === '1' || course === '2') openEnroll(Number(course))
  }, [pathname, search, key, openEnroll])

  useEffect(() => {
    const bar = document.getElementById('scrollProgress')
    const onScroll = () => {
      if (!bar) return
      const progress = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      bar.style.transform = `scaleX(${progress})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  useEffect(() => {
    const sync = () => {
      const home = document.getElementById('home')
      document.documentElement.classList.toggle('hero-in-view', !!home && home.getBoundingClientRect().bottom > window.innerHeight * 0.5)
    }
    sync()
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
      document.documentElement.classList.remove('hero-in-view')
    }
  }, [pathname])

  return null
}

function Shell() {
  return (
    <>
      <div id="scrollProgress" />
      <BrowserRouter>
        <NavigationEffects />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
        </Routes>
        <Footer />
        <ChatWidget />
        <EnrollDialog />
        <CartDialog />
        <Classroom />
        <Toast />
      </BrowserRouter>
    </>
  )
}

export default function App() {
  return (
    <SiteProvider>
      <Shell />
    </SiteProvider>
  )
}
