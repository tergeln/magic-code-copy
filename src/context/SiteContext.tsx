import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Lang } from '../data/content'

export type Theme = 'light' | 'dark'
export type EnrollStep = 'form' | 'payment' | 'success'
export type PayMethod = 'qpay' | 'bank'

export interface ChatMessage {
  id: number
  text: string
  user: boolean
}

interface SiteValue {
  lang: Lang
  theme: Theme
  t: (mn: string, en: string) => string
  toggleLang: () => void
  toggleTheme: () => void
  cart: number[]
  removeFromCart: (index: number) => void
  clearCart: () => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  toast: string | null
  enrollOpen: boolean
  enrollCourse: number
  enrollStep: EnrollStep
  waitlist: boolean
  payMethod: PayMethod
  setPayMethod: (method: PayMethod) => void
  openEnroll: (course: number) => void
  closeEnroll: () => void
  submitEnroll: () => void
  backToForm: () => void
  finishPayment: () => void
  chatOpen: boolean
  messages: ChatMessage[]
  openChat: (magic?: boolean) => void
  closeChat: () => void
  sendChat: (text: string) => void
  magicOpen: boolean
  casting: boolean
  classroomOpen: boolean
  openClassroom: () => void
  closeClassroom: () => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

const SiteContext = createContext<SiteValue | null>(null)

function readLang(): Lang {
  return localStorage.getItem('mc-lang') === 'en' ? 'en' : 'mn'
}

function readTheme(): Theme {
  return localStorage.getItem('mc-theme') === 'dark' ? 'dark' : 'light'
}

function readCart(): number[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem('mc-cart') || '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is number => Number.isInteger(item) && item >= 0 && item < 3)
  } catch {
    return []
  }
}

function greeting(lang: Lang, id: number): ChatMessage {
  return {
    id,
    user: false,
    text:
      lang === 'mn'
        ? 'Сайн уу! ✳ Сургалт, бүртгэл эсвэл холбоо барих талаар асуугаарай. Би урьдчилан бэлдсэн мэдээлэлтэй туршилтын туслах.'
        : 'Hello! ✳ Ask about courses, enrollment or contact details. I am a demo assistant with prepared answers.',
  }
}

function reply(question: string, lang: Lang) {
  const say = (mn: string, en: string) => (lang === 'mn' ? mn : en)
  const text = question.toLowerCase()
  if (/төлбөр|үнэ|payment|price|qpay/.test(text)) {
    return say(
      'Өгөгдлийн шинжилгээний сургалтын Бүртгүүлэх товчийг дараад мэдээллээ бөглөхөд төлбөрийн туршилтын хэсэг нээгдэнэ. Бодит үнэ, төлбөрийг magiccodeai@gmail.com хаягаар лавлаарай.',
      'Choose Enroll on Data Analysis and complete the form to see the payment demo. Confirm official pricing and payment via magiccodeai@gmail.com.',
    )
  }
  if (/сургалт|course|python|power|vip|элс|enroll/.test(text)) {
    return say(
      'VIP цогц сургалт, Өгөгдлийн шинжилгээ ба Power BI, Компьютерын хэрэглээ гэсэн 3 чиглэлтэй. Өгөгдлийн шинжилгээний сургалтын бүртгэлийн явцыг турших боломжтой, бусад нь хүлээлгийн жагсаалттай.',
      'Explore VIP Course, Data Analysis & Power BI and Computer Skills. Data Analysis has an enrollment demo; the other paths have waitlist demos.',
    )
  }
  if (/merch|бараа|цамц|tote/.test(text)) {
    return say(
      'Бүтээгдэхүүний хэсэгт одоогоор цүнхний загвар зургуудыг түр ашиглаж байна. Байгууллагын бүтээгдэхүүний мэдээллийг и-мэйлээр лавлаарай.',
      'Explore the concept merch collection and add items to your selection. Pricing and stock are not yet confirmed.',
    )
  }
  return say(
    'Бидэнтэй magiccodeai@gmail.com хаягаар холбогдоорой. Сургалт болон төлбөрийн талаар ч асууж болно.',
    'Reach the team at magiccodeai@gmail.com. You can also ask me about courses and payment.',
  )
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readLang)
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [cart, setCart] = useState<number[]>(readCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [enrollOpen, setEnrollOpen] = useState(false)
  const [enrollCourse, setEnrollCourse] = useState(1)
  const [enrollStep, setEnrollStep] = useState<EnrollStep>('form')
  const [waitlist, setWaitlist] = useState(false)
  const [payMethod, setPayMethod] = useState<PayMethod>('qpay')
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [magicOpen, setMagicOpen] = useState(false)
  const [casting, setCasting] = useState(false)
  const [classroomOpen, setClassroomOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const seq = useRef(1)
  const magicTimer = useRef<number[]>([])
  const courseRef = useRef(enrollCourse)
  const langRef = useRef(lang)
  courseRef.current = enrollCourse

  const t = useCallback((mn: string, en: string) => (lang === 'mn' ? mn : en), [lang])

  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem('mc-lang', lang)
    if (langRef.current === lang) return
    langRef.current = lang
    setMessages((prev) => (prev.length ? [greeting(lang, ++seq.current)] : prev))
  }, [lang])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('mc-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('mc-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => () => {
    magicTimer.current.forEach((id) => window.clearTimeout(id))
  }, [])

  const toggleLang = useCallback(() => setLang((current) => (current === 'mn' ? 'en' : 'mn')), [])
  const toggleTheme = useCallback(() => setTheme((current) => (current === 'dark' ? 'light' : 'dark')), [])

  const removeFromCart = useCallback((index: number) => {
    setCart((current) => current.filter((_, item) => item !== index))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const openEnroll = useCallback((course: number) => {
    setEnrollCourse(course)
    setEnrollStep('form')
    setWaitlist(false)
    setPayMethod('qpay')
    setEnrollOpen(true)
  }, [])

  const closeEnroll = useCallback(() => setEnrollOpen(false), [])

  const submitEnroll = useCallback(() => {
    if (courseRef.current !== 1) {
      setWaitlist(true)
      setEnrollStep('success')
      return
    }
    setWaitlist(false)
    setEnrollStep('payment')
  }, [])

  const backToForm = useCallback(() => setEnrollStep('form'), [])
  const finishPayment = useCallback(() => {
    setWaitlist(false)
    setEnrollStep('success')
  }, [])

  const closeChat = useCallback(() => {
    setChatOpen(false)
    setMagicOpen(false)
  }, [])

  const openChat = useCallback((magic = false) => {
    setMessages((prev) => (prev.length ? prev : [greeting(langRef.current, ++seq.current)]))
    if (!magic || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setChatOpen(true)
      return
    }
    setCasting(true)
    const openTimer = window.setTimeout(() => {
      setChatOpen(true)
      setMagicOpen(true)
    }, 380)
    const castTimer = window.setTimeout(() => setCasting(false), 520)
    const endTimer = window.setTimeout(() => setMagicOpen(false), 1700)
    magicTimer.current.push(openTimer, castTimer, endTimer)
  }, [])

  const sendChat = useCallback((raw: string) => {
    const text = raw.trim()
    if (!text) return
    const current = langRef.current
    setMessages((prev) => [
      ...prev,
      { id: ++seq.current, text, user: true },
      { id: ++seq.current, text: reply(text, current), user: false },
    ])
  }, [])

  const openClassroom = useCallback(() => setClassroomOpen(true), [])
  const closeClassroom = useCallback(() => setClassroomOpen(false), [])

  const value = useMemo<SiteValue>(
    () => ({
      lang,
      theme,
      t,
      toggleLang,
      toggleTheme,
      cart,
      removeFromCart,
      clearCart,
      cartOpen,
      setCartOpen,
      toast: null,
      enrollOpen,
      enrollCourse,
      enrollStep,
      waitlist,
      payMethod,
      setPayMethod,
      openEnroll,
      closeEnroll,
      submitEnroll,
      backToForm,
      finishPayment,
      chatOpen,
      messages,
      openChat,
      closeChat,
      sendChat,
      magicOpen,
      casting,
      classroomOpen,
      openClassroom,
      closeClassroom,
      menuOpen,
      setMenuOpen,
    }),
    [
      lang,
      theme,
      t,
      toggleLang,
      toggleTheme,
      cart,
      removeFromCart,
      clearCart,
      cartOpen,
      enrollOpen,
      enrollCourse,
      enrollStep,
      waitlist,
      payMethod,
      openEnroll,
      closeEnroll,
      submitEnroll,
      backToForm,
      finishPayment,
      chatOpen,
      messages,
      openChat,
      closeChat,
      sendChat,
      magicOpen,
      casting,
      classroomOpen,
      openClassroom,
      closeClassroom,
      menuOpen,
    ],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const value = useContext(SiteContext)
  if (!value) throw new Error('useSite must be used within SiteProvider')
  return value
}

export function burstAt(button: HTMLElement) {
  const rect = button.getBoundingClientRect()
  const burst = document.createElement('div')
  burst.className = 'magic-burst'
  burst.setAttribute('aria-hidden', 'true')
  burst.style.left = `${rect.left + rect.width * 0.17}px`
  burst.style.top = `${rect.top + rect.height * 0.18}px`
  for (let i = 0; i < 42; i += 1) {
    const spark = document.createElement('span')
    const angle = Math.PI * 0.95 + Math.random() * Math.PI * 1.35
    const distance = 65 + Math.random() * 150
    spark.className = 'magic-spark'
    spark.textContent = i % 4 === 0 ? '✧' : '✦'
    spark.style.setProperty('--spark-color', i % 2 ? '#E8D5A3' : '#7DD3FC')
    spark.style.setProperty('--spark-size', `${9 + Math.random() * 9}px`)
    spark.style.setProperty('--spark-x', `${Math.cos(angle) * distance}px`)
    spark.style.setProperty('--spark-y', `${Math.sin(angle) * distance}px`)
    spark.style.setProperty('--spark-rotation', `${Math.random() * 180 - 90}deg`)
    burst.append(spark)
  }
  document.body.append(burst)
  window.setTimeout(() => burst.remove(), 1700)
}
