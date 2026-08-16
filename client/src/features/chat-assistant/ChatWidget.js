import React, { useEffect, useRef, useState } from 'react'
import { askAssistant } from '../../api/chatApi'
import './ChatWidget.css'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! Ask me anything about your contracts, obligations, or renewals." },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, open])

  async function handleSend(event) {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || sending) return

    const userMessage = { role: 'user', content: trimmed }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setError('')
    setSending(true)

    try {
      const history = nextMessages
        .slice(0, -1)
        .filter((m) => m.role === 'user' || m.role === 'assistant')
      const { reply } = await askAssistant(trimmed, history)
      setMessages((current) => [...current, { role: 'assistant', content: reply }])
    } catch (requestError) {
      setError(requestError.message || 'Something went wrong.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-widget-panel">
          <div className="chat-widget-header">
            <span>ContractIQ Assistant</span>
            <button type="button" className="chat-widget-close" onClick={() => setOpen(false)} aria-label="Close chat">
              ×
            </button>
          </div>

          <div className="chat-widget-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble chat-bubble-${m.role}`}>
                {m.content}
              </div>
            ))}
            {sending && <div className="chat-bubble chat-bubble-assistant chat-bubble-typing">Thinking…</div>}
          </div>

          {error && <div className="chat-widget-error">{error}</div>}

          <form className="chat-widget-input-row" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a contract, obligation, or renewal…"
              disabled={sending}
            />
            <button type="submit" disabled={sending || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chat-widget-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
      >
        {open ? '×' : '💬'}
      </button>
    </div>
  )
}
