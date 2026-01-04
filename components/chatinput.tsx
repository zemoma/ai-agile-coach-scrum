"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Ask your Agile Coach...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_CHARS = 2000; // Character limit

  const charsRemaining = MAX_CHARS - message.length;
  const usagePercentage = (message.length / MAX_CHARS) * 100;

  // Dynamic color based on usage
  const getCounterColor = () => {
    if (usagePercentage >= 100) return "text-red-500 dark:text-red-400";
    if (usagePercentage >= 90) return "text-orange-500 dark:text-orange-400";
    if (usagePercentage >= 75) return "text-yellow-600 dark:text-yellow-400";
    return "text-gray-400 dark:text-gray-500";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && charsRemaining > 0) {
      onSend(message.trim());
      setMessage("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [message]);

  return (
    <div className="sticky bottom-0 bg-white dark:bg-[#050505] pt-4 pb-6 px-6 border-t border-gray-100 dark:border-gray-800">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-center gap-2 bg-white dark:bg-[#0A0A0A] rounded-xl border border-gray-200 dark:border-gray-800 focus-within:border-[#0070B8] transition-all">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) {
                setMessage(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            maxLength={MAX_CHARS}
            className="flex-1 px-5 py-4 bg-transparent border-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none disabled:opacity-50 scrollbar-hide"
            style={{ maxHeight: "150px", overflow: "auto" }}
          />

          <button
            type="submit"
            disabled={disabled || !message.trim() || charsRemaining <= 0}
            className="mr-3 p-2 bg-[#0070B8] dark:bg-[#0091E0] hover:bg-[#005a96] disabled:bg-gray-200 dark:disabled:bg-gray-800 text-white rounded-lg transition-colors shrink-0"
            aria-label="Send message"
          >
            {disabled ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Character limit warning */}
        {charsRemaining <= 0 && (
          <div className="mt-2 text-right text-xs font-semibold text-red-500 dark:text-red-400 flex items-center justify-end gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Message too long. Please shorten your message to send.
          </div>
        )}

        {/* Character counter - visible on mobile and desktop */}
        {message.length > 0 && charsRemaining > 0 && (
          <div
            className={`mt-2 text-right text-xs font-medium transition-colors ${getCounterColor()}`}
          >
            {charsRemaining} characters remaining
          </div>
        )}

        {/* Additional info */}
        <div className="mt-3 max-sm:mt-0 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-400 dark:text-gray-500">
          {/* Left side - Keyboard shortcuts */}
          <div className="flex items-center gap-1 max-sm:hidden">
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px] font-mono border border-gray-300 dark:border-gray-700">
              Enter
            </kbd>
            <span>to send</span>
            <span className="mx-1">•</span>
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px] font-mono border border-gray-300 dark:border-gray-700">
              Shift + Enter
            </kbd>
            <span>for new line</span>
          </div>

          {/* Right side - Attribution and copyright */}
          <div className="flex items-center gap-3 text-center sm:text-right max-sm:hidden">
            <span className="flex items-center gap-1">
              Powered by{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Gemini AI
              </span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>© {new Date().getFullYear()} AgileMentor</span>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-2 text-[10px] text-gray-400 dark:text-gray-500 text-center max-w-3xl mx-auto">
          AI can make mistakes. Please verify important information and consult
          with your team for critical decisions.
        </p>
      </form>
    </div>
  );
}
