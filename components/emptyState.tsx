'use client';

import React from 'react';
import { Sparkles, Target, Users, BarChart3 } from 'lucide-react';

interface EmptyStateProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  const suggestions = [
    {
      icon: Target,
      text: 'Help me create a sprint goal',
      prompt: 'Help me create a sprint goal for my team',
    },
    {
      icon: Users,
      text: 'Generate user stories',
      prompt: 'Generate user stories for an e-commerce checkout feature',
    },
    {
      icon: BarChart3,
      text: 'Plan a retrospective',
      prompt: 'What are some effective retrospective activities for a remote team?',
    },
  ];

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Welcome to{' '}
            <span className="bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              AgileMentor AI
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your AI-powered Scrum Coach. Get instant help with sprint planning, user stories, 
            retrospectives, and all things Agile.
          </p>
        </div>

        {/* Suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion.prompt)}
              className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all duration-200 text-left"
            >
              <suggestion.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {suggestion.text}
              </p>
            </button>
          ))}
        </div>

        {/* Features */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-medium">Sprint Planning</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <span className="font-medium">User Stories</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="font-medium">Agile Coaching</span>
          </div>
        </div>
      </div>
    </div>
  );
}