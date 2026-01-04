import { getOrCreateUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import {
  createSession,
  getUserSessions,
  getSessionWithMessages,
  updateSession,
  deleteSession,
  searchSessions,
} from "@/lib/db-operation";
import { prisma } from "@/lib/prisma";

type SessionCategory = "SPRINT_PLANNING" | "USER_STORIES" | "RETROSPECTIVE" | "DAILY_STANDUP" | "GENERAL";

const SessionCategoryEnum = {
  SPRINT_PLANNING: "SPRINT_PLANNING",
  USER_STORIES: "USER_STORIES",
  RETROSPECTIVE: "RETROSPECTIVE",
  DAILY_STANDUP: "DAILY_STANDUP",
  GENERAL: "GENERAL",
} as const;

/**
 * GET: Fetch all sessions for a user
 * Query params: userId (optional), search (optional)
 */
export async function GET(request: NextRequest) {
  try {
    // Get or create user in database
    const user = await getOrCreateUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const searchQuery = searchParams.get("search");
    const sessionId = searchParams.get("sessionId");

    // Get specific session with messages
    if (sessionId) {
      const session = await getSessionWithMessages(sessionId);

      if (!session) {
        return NextResponse.json(
          { error: "Session not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ session });
    }

    // Search sessions
    if (searchQuery) {
      const sessions = await searchSessions(searchQuery, user.id);
      return NextResponse.json({ sessions });
    }

    // Get all user sessions
    const sessions = await getUserSessions(user.id);

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Get sessions error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST: Create a new session
 */
export async function POST(request: NextRequest) {
  try {
    // Get or create user in database
    const user = await getOrCreateUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({})); // Handle empty body
    const { title, category } = body;

    // Validate category if provided (only validate if it's a string)
    if (category && typeof category === 'string' && !Object.values(SessionCategoryEnum).includes(category as any)) {
      return NextResponse.json(
        { error: `Invalid session category: ${category}. Valid values are: ${Object.values(SessionCategoryEnum).join(', ')}` },
        { status: 400 }
      );
    }

    const session = await createSession({
      userId: user.id,
      title,
      category: category as any,
    });

    return NextResponse.json(
      {
        message: "Session created successfully",
        session,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create session error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH: Update a session
 */
export async function PATCH(request: NextRequest) {
  try {
    // Get or create user in database
    const user = await getOrCreateUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { sessionId, title, category, isPinned, isArchived, folderId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    const updatedSession = await updateSession(sessionId, {
      title,
      category: category as any,
      isPinned,
      isArchived,
      folderId,
    });

    return NextResponse.json({
      message: "Session updated successfully",
      session: updatedSession,
    });
  } catch (error) {
    console.error("Update session error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Delete a session and all its messages
 */
export async function DELETE(request: NextRequest) {
  try {
    // Get or create user in database
    const user = await getOrCreateUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    await deleteSession(sessionId);

    return NextResponse.json({
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.error("Delete session error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
