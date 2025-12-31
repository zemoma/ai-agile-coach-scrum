"use client";

import React from "react";
import { Moon, Sun, Grid3x3, Bell, Plus } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface HeaderProps {
  sessionTitle?: string;
  sessionCategory?: string;
}

export function Header({ sessionTitle, sessionCategory }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Session Info */}
        <div className="flex items-center gap-3">
          {sessionCategory && (
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
              {sessionCategory}
            </span>
          )}
          {sessionTitle && (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {sessionTitle}
            </h2>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          <button
            className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="View grid"
          >
            <Grid3x3 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          <button
            className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          <button
            className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors ml-2"
            aria-label="New session"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
