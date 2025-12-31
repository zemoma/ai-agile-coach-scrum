export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isEditing?: boolean;
}

export interface Session {
  id: string;
  title: string;
  category: 'Sprint Planning' | 'User Stories' | 'Retrospective' | 'Daily Standup' | 'General';
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  isPinned?: boolean;
}

export interface SessionFolder {
  id: string;
  name: string;
  sessions: Session[];
}

export interface ChatResponse {
  message: string;
  sessionId: string;
  messageId: string;
}