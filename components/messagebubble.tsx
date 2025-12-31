"use client"

import { useState } from "react"
import { Copy, Edit2, RotateCcw, Check } from "lucide-react"
import type { Message } from "@/types"

interface MessageBubbleProps {
  message: Message
  onEdit?: (messageId: string, newContent: string) => void
  onResend?: (messageId: string) => void
}

export function MessageBubble({ message, onEdit, onResend }: MessageBubbleProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(message.content)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveEdit = () => {
    if (onEdit && editContent.trim()) {
      onEdit(message.id, editContent)
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setEditContent(message.content)
    setIsEditing(false)
  }

  const isUser = message.role === "user"

  return (
    <div className={`flex gap-4 justify-start mb-8 group w-full`}>
      <div className="shrink-0 pt-1">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm bg-[#0070B8] dark:bg-[#0091E0]`}
        >
          {isUser ? "You" : "AM"}
        </div>
      </div>

      <div className="flex flex-col items-start flex-1 min-w-0 max-w-full">
        {/* Role Label */}
        <div className="flex items-center gap-2 mb-2 w-full overflow-hidden">
          <span className="text-[15px] font-bold text-gray-900 dark:text-gray-100 truncate">
            {isUser ? "You" : "AgileMentor AI"}
          </span>
          {!isUser && (
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-[11px] font-semibold rounded">
              Scrum Coach
            </span>
          )}
        </div>

        {/* Message Content */}
        {isEditing ? (
          <div className="w-full">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-4 bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 rounded-lg text-gray-900 dark:text-gray-100 resize-none focus:outline-none"
              rows={3}
              autoFocus
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSaveEdit}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full wrap-break-word">
            <p className="text-[15px] leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap overflow-wrap-anywhere">
              {message.content}
            </p>
          </div>
        )}

        {/* Actions */}
        {!isEditing && (
          <div className="flex gap-4 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#008A9E] hover:bg-[#007687] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>

            {isUser && onEdit && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors text-xs font-semibold"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            )}

            {isUser && onResend && (
              <button
                onClick={() => onResend(message.id)}
                className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors text-xs font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-ask</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
