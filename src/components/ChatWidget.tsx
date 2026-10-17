import { useEffect, useRef } from 'react'
import { burstAt, useSite } from '../context/SiteContext'

const quick = [
  { id: 'courses', mn: 'Сургалтууд', en: 'Courses' },
  { id: 'payment', mn: 'Төлбөр', en: 'Payment' },
  { id: 'contact', mn: 'Холбогдох', en: 'Contact' },
]

export function ChatWidget() {
  const { t, chatOpen, messages, openChat, closeChat, sendChat, magicOpen, casting } = useSite()
  const box = useRef<HTMLDivElement>(null)
  const pending = useRef(false)

  useEffect(() => {
    const node = box.current
    if (node) node.scrollTop = node.scrollHeight
  }, [messages, chatOpen])

  useEffect(() => {
    if (chatOpen) document.getElementById('chatInput')?.focus()
  }, [chatOpen])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && chatOpen) closeChat()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [chatOpen, closeChat])

  const cast = () => {
    if (chatOpen) {
      closeChat()
      return
    }
    if (pending.current) return
    const button = document.getElementById('chatToggle')
    if (!button) return
    pending.current = true
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) burstAt(button)
    openChat(true)
    window.setTimeout(() => {
      pending.current = false
    }, 400)
  }

  return (
    <>
      <button
        className={`chat-toggle${casting ? ' magic-casting' : ''}`}
        id="chatToggle"
        type="button"
        aria-label={t('Шидэт туслахыг нээх', 'Open magic assistant')}
        aria-expanded={chatOpen}
        onClick={cast}
      >
        <span className="chat-robot-portrait" aria-hidden="true" />
      </button>
      <aside className={`chat${magicOpen ? ' magic-opening' : ''}`} id="chat" hidden={!chatOpen} aria-label="Magic Code assistant">
        <div className="chat-head">
          <div className="bot-avatar">
            <img src="/assets/chatbot-wizard.png" alt="" width="48" height="48" />
          </div>
          <div>
            <strong>{t('Шидэт туслах', 'Magic assistant')}</strong>
          </div>
          <button className="icon-btn" id="closeChat" type="button" aria-label={t('Туслахыг хаах', 'Close assistant')} onClick={closeChat}>
            ×
          </button>
        </div>
        <div className="messages" id="messages" ref={box} aria-live="polite">
          {messages.map((message) => (
            <div key={message.id} className={message.user ? 'bubble user' : 'bubble'}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="quick">
          {quick.map((item) => (
            <button key={item.id} type="button" onClick={() => sendChat(t(item.mn, item.en))}>
              {t(item.mn, item.en)}
            </button>
          ))}
        </div>
        <form
          id="chatForm"
          onSubmit={(event) => {
            event.preventDefault()
            const input = event.currentTarget.elements.namedItem('chat')
            if (!(input instanceof HTMLInputElement)) return
            sendChat(input.value)
            input.value = ''
          }}
        >
          <input
            id="chatInput"
            name="chat"
            aria-label={t('Таны зурвас', 'Your message')}
            placeholder={t('Асуух зүйлээ бичээрэй…', 'Type your question…')}
            required
            maxLength={500}
          />
          <button type="submit" aria-label={t('Илгээх', 'Send')}>
            ↑
          </button>
        </form>
      </aside>
    </>
  )
}
