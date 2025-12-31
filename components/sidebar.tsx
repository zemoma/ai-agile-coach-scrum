"use client";

import React, { useState } from "react";
import { ChevronRight, Plus, Search, Pin, FolderOpen } from "lucide-react";
import { useSessions, useCreateSession } from "@/hooks/useChat";
import type { Session } from "@/types";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentSessionId: string | null;
  onSessionSelect: (sessionId: string) => void;
}

export function Sidebar({
  isOpen,
  onToggle,
  currentSessionId,
  onSessionSelect,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    pinned: true,
    recent: true,
    folders: false,
  });

  const { data: sessions, isLoading } = useSessions();
  const createSession = useCreateSession();

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleNewSession = () => {
    createSession.mutate("General");
  };

  const pinnedSessions = sessions?.filter((s) => s.isPinned) || [];
  const recentSessions = sessions?.filter((s) => !s.isPinned) || [];

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed left-4 top-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label="Open sidebar"
      >
        <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
    );
  }

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
        onClick={onToggle}
      />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 flex flex-col shadow-2xl lg:shadow-none">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              AgileMentor AI
            </h1>
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
              aria-label="Close sidebar"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400 rotate-180" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search sprint sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
            />
          </div>

          {/* New Session Button */}
          <button
            onClick={handleNewSession}
            disabled={createSession.isPending}
            className="w-full mt-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            New Sprint Session
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto py-2">
          {isLoading ? (
            <div className="px-4 py-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Loading sessions...
              </p>
            </div>
          ) : (
            <>
              {/* Pinned Sessions */}
              <SessionSection
                title="Pinned Sessions"
                icon={<Pin className="w-4 h-4" />}
                isExpanded={expandedSections.pinned}
                onToggle={() => toggleSection("pinned")}
                sessions={pinnedSessions}
                currentSessionId={currentSessionId}
                onSessionSelect={onSessionSelect}
              />

              {/* Recent Sessions */}
              <SessionSection
                title="Recent Sessions"
                icon={<ChevronRight className="w-4 h-4" />}
                isExpanded={expandedSections.recent}
                onToggle={() => toggleSection("recent")}
                sessions={recentSessions}
                currentSessionId={currentSessionId}
                onSessionSelect={onSessionSelect}
              />

              {/* Sprint Folders */}
              <SessionSection
                title="Sprint Folders"
                icon={<FolderOpen className="w-4 h-4" />}
                isExpanded={expandedSections.folders}
                onToggle={() => toggleSection("folders")}
                sessions={[]}
                currentSessionId={currentSessionId}
                onSessionSelect={onSessionSelect}
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Your AI-powered Scrum Coach
          </p>
        </div>
      </aside>
    </>
  );
}

interface SessionSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  sessions: Session[];
  currentSessionId: string | null;
  onSessionSelect: (sessionId: string) => void;
}

function SessionSection({
  title,
  icon,
  isExpanded,
  onToggle,
  sessions,
  currentSessionId,
  onSessionSelect,
}: SessionSectionProps) {
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="w-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span
          className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}
        >
          {icon}
        </span>
        {title}
      </button>

      {isExpanded && (
        <div className="mt-1">
          {sessions.length === 0 ? (
            <p className="px-4 py-2 text-xs text-gray-400 dark:text-gray-500">
              No sessions yet
            </p>
          ) : (
            sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => onSessionSelect(session.id)}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                  currentSessionId === session.id
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-2 border-blue-600"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="font-medium truncate">{session.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {session.category}
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
