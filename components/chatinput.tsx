"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
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
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);

  return (
    <div className="sticky bottom-0 bg-linear-to-t from-white via-white dark:from-gray-900 dark:via-gray-900 to-transparent pt-8 pb-6 px-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400 transition-all">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="flex-1 px-5 py-4 bg-transparent border-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ maxHeight: "200px" }}
          />

          <button
            type="submit"
            disabled={disabled || !message.trim()}
            className="m-2 p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-xl transition-colors disabled:cursor-not-allowed shrink-0"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
          Press{" "}
          <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 font-mono text-xs">
            Enter
          </kbd>{" "}
          to send,{" "}
          <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 font-mono text-xs">
            Shift+Enter
          </kbd>{" "}
          for new line
        </p>
      </form>
    </div>
  );
}
