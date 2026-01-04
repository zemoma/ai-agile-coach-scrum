"use client";
import { Grid3x3, Bell, Plus } from "lucide-react";

interface HeaderProps {
  sessionTitle?: string;
  sessionCategory?: string;
  isOpen?: boolean;
  onNewChat?: () => void;
}

export function Header({
  sessionTitle,
  sessionCategory,
  onNewChat,
  isOpen,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#050505] border-b border-gray-200 dark:border-gray-800">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Session Info */}
        <div className={`flex items-center gap-3 ${!isOpen && "ml-10"}`}>
          {sessionCategory && (
            <span className="px-3 py-1 bg-[#E1F3FF] dark:bg-[#004266] text-[#0070B8] dark:text-[#E1F3FF] text-xs font-semibold rounded-full">
              {sessionCategory}
            </span>
          )}
          {sessionTitle && (
            <h2 className="text-[15px] font-bold text-gray-900 dark:text-gray-100">
              {sessionTitle}
            </h2>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors max-md:hidden"
            aria-label="View grid"
          >
            <Grid3x3 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors max-md:hidden"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          <button
            onClick={onNewChat}
            className="p-1.5 bg-[#0070B8] dark:bg-[#0091E0] hover:bg-[#005a96] rounded-lg transition-colors ml-2"
            aria-label="New session"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
