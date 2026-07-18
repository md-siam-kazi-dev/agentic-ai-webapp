import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectDB } from "@/lib/db";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function GET() {
  try {
    const db = await connectDB();
    const docs = await db
      .collection("history")
      .find({})
      .sort({ updatedAt: -1 })
      .project({ title: 1, createdAt: 1, updatedAt: 1, messageCount: 1 })
      .toArray();

    const sessions = docs.map((d) => ({
      id: d._id.toString(),
      title: d.title ?? "New chat",
      createdAt: d.createdAt ?? null,
      updatedAt: d.updatedAt ?? null,
      messageCount: d.messageCount ?? 0,
    }));

    return NextResponse.json({ sessions });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to load history: ${message}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const messages: ChatMessage[] = Array.isArray(body.messages) ? body.messages : [];
    const title: string =
      typeof body.title === "string" && body.title.trim()
        ? body.title.trim()
        : messages.find((m) => m.role === "user")?.content.slice(0, 60) ??
          "New chat";

    const db = await connectDB();
    const now = new Date();
    const result = await db.collection("history").insertOne({
      _id: new ObjectId(),
      title,
      messages,
      messageCount: messages.length,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      id: result.insertedId.toString(),
      title,
      messageCount: messages.length,
      createdAt: now,
      updatedAt: now,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to save history: ${message}` },
      { status: 500 }
    );
  }
}
