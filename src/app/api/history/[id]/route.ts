import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectDB } from "@/lib/db";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid session id" }, { status: 400 });
  }

  try {
    const db = await connectDB();
    const doc = await db.collection("history").findOne({ _id: new ObjectId(id) });
    if (!doc) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: doc._id.toString(),
      title: doc.title ?? "New chat",
      messages: (doc.messages ?? []) as ChatMessage[],
      createdAt: doc.createdAt ?? null,
      updatedAt: doc.updatedAt ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to load session: ${message}` },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid session id" }, { status: 400 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const messages: ChatMessage[] = Array.isArray(body.messages) ? body.messages : [];

    const db = await connectDB();
    const title: string | undefined =
      typeof body.title === "string" && body.title.trim()
        ? body.title.trim()
        : undefined;

    const update: Record<string, unknown> = {
      messages,
      messageCount: messages.length,
      updatedAt: new Date(),
    };
    if (title) update.title = title;

    const result = await db
      .collection("history")
      .updateOne({ _id: new ObjectId(id) }, { $set: update });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({ id, messageCount: messages.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to update session: ${message}` },
      { status: 500 }
    );
  }
}
