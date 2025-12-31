"use client";

import React from "react";

export function LoadingIndicator() {
  return (
    <div className="flex gap-3 justify-start mb-6">
      {/* Avatar */}
      <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
        AM
      </div>

      <div className="flex flex-col items-start">
        {/* Role Label */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            AgileMentor AI
          </span>
          <span className="px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs font-medium rounded">
            Scrum Coach
          </span>
        </div>

        {/* Loading Animation */}
        <div className="px-5 py-4 bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm shadow-sm">
          <div className="flex gap-1.5">
            <div
              className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
