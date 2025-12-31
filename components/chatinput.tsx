"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({ onSend, disabled = false, placeholder = "Ask your Agile Coach..." }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage("")
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`
    }
  }, [message])

  return (
    <div className="sticky bottom-0 bg-white dark:bg-[#050505] pt-4 pb-6 px-6 border-t border-gray-100 dark:border-gray-800">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-center gap-2 bg-white dark:bg-[#0A0A0A] rounded-xl border border-gray-200 dark:border-gray-800 focus-within:border-[#0070B8] transition-all">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="flex-1 px-5 py-4 bg-transparent border-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none disabled:opacity-50"
            style={{ maxHeight: "150px" }}
          />

          <button
            type="submit"
            disabled={disabled || !message.trim()}
            className="mr-3 p-2 bg-[#0070B8] dark:bg-[#0091E0] hover:bg-[#005a96] disabled:bg-gray-200 dark:disabled:bg-gray-800 text-white rounded-lg transition-colors shrink-0"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-3 text-[11px] text-gray-400 dark:text-gray-500">
          Press Enter to send, Shift+Enter for new line
        </p>
      </form>
    </div>
  )
}
