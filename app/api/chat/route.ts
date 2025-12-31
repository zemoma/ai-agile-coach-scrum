import { NextRequest, NextResponse } from 'next/server';

// Example API route for chat with Gemini
// You'll need to install @google/generative-ai package
// pnpm add @google/generative-ai

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Message and sessionId are required' },
        { status: 400 }
      );
    }

    // Example: Call Gemini API
    // const { GoogleGenerativeAI } = require('@google/generative-ai');
    // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // const prompt = `You are an expert Agile and Scrum coach. Help the user with: ${message}`;
    // const result = await model.generateContent(prompt);
    // const response = await result.response;
    // const text = response.text();

    // For now, return mock response
    const mockResponse = {
      message: `I'd be happy to help you with that! As your Agile Coach, I can guide you through ${message}. Let me break this down using Scrum principles...`,
      sessionId,
      messageId: Date.now().toString(),
    };

    // TODO: Save to database using Prisma
    // await prisma.message.create({
    //   data: {
    //     content: message,
    //     role: 'user',
    //     sessionId,
    //   },
    // });
    //
    // await prisma.message.create({
    //   data: {
    //     content: mockResponse.message,
    //     role: 'assistant',
    //     sessionId,
    //   },
    // });

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Get chat history for a session
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'sessionId is required' },
      { status: 400 }
    );
  }

  // TODO: Fetch from database using Prisma
  // const messages = await prisma.message.findMany({
  //   where: { sessionId },
  //   orderBy: { createdAt: 'asc' },
  // });

  const mockMessages = [
    {
      id: '1',
      role: 'user',
      content: 'Help me create a sprint goal',
      timestamp: new Date(),
    },
    {
      id: '2',
      role: 'assistant',
      content: "I'd be happy to help! To create an effective sprint goal...",
      timestamp: new Date(),
    },
  ];

  return NextResponse.json({ messages: mockMessages });
}