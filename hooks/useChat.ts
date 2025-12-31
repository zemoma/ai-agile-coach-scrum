import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Message, Session, ChatResponse } from '@/types';

// Mock API functions - replace with actual API calls
const sendMessage = async (payload: {
  sessionId: string;
  message: string;
}): Promise<ChatResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // This is where you'll integrate with Gemini API
  // Example:
  // const response = await fetch('/api/chat', {
  //   method: 'POST',
  //   body: JSON.stringify(payload),
  // });
  // return response.json();
  
  return {
    message: "I'd be happy to help you with that! As your Agile Coach, I can guide you through creating a 4-week Go-To-Market (GTM) plan with proper phases, owners, risks, and KPIs. Let me break this down using Scrum principles...",
    sessionId: payload.sessionId,
    messageId: Date.now().toString(),
  };
};

const fetchSessions = async (): Promise<Session[]> => {
  // Mock data - replace with actual API call to Prisma
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      title: 'Sprint Planning Help',
      category: 'Sprint Planning',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: true,
    },
    {
      id: '2',
      title: 'User Story Creation',
      category: 'User Stories',
      messages: [],
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(Date.now() - 86400000),
    },
  ];
};

const createSession = async (category: Session['category']): Promise<Session> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return {
    id: Date.now().toString(),
    title: 'New Session',
    category,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

// React Query Hooks
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      // Invalidate and refetch sessions
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
};

export const useSessions = () => {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: fetchSessions,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
};

export const useEditMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: { 
      sessionId: string; 
      messageId: string; 
      newContent: string 
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return payload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
};