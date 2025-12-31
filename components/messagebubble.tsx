"use client";

import React, { useState } from "react";
import { Copy, Edit2, RotateCcw, Check } from "lucide-react";
import type { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
  onEdit?: (messageId: string, newContent: string) => void;
  onResend?: (messageId: string) => void;
}

export function MessageBubble({
  message,
  onEdit,
  onResend,
}: MessageBubbleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    if (onEdit && editContent.trim()) {
      onEdit(message.id, editContent);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };

  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 ${
        isUser ? "justify-end" : "justify-start"
      } mb-6 group`}
    >
      {/* Avatar for Assistant */}
      {!isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
          AM
        </div>
      )}

      <div
        className={`flex flex-col ${
          isUser ? "items-end" : "items-start"
        } max-w-3xl`}
      >
        {/* Role Label */}
        <div className="flex items-center gap-2 mb-2">
          {!isUser && (
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              AgileMentor AI
            </span>
          )}
          {!isUser && (
            <span className="px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs font-medium rounded">
              Scrum Coach
            </span>
          )}
          {isUser && (
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              You
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
          <div
            className={`px-5 py-3.5 rounded-2xl shadow-sm ${
              isUser
                ? "bg-blue-600 text-white rounded-tr-sm"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-sm"
            }`}
          >
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        )}

        {/* Actions */}
        {!isEditing && (
          <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Copy message"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              )}
            </button>

            {isUser && onEdit && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Edit message"
              >
                <Edit2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            )}

            {isUser && onResend && (
              <button
                onClick={() => onResend(message.id)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Re-ask"
              >
                <RotateCcw className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Avatar for User */}
      {isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
          You
        </div>
      )}
    </div>
  );
}
