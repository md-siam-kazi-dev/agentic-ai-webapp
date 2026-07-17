import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type RoadmapRequest = {
  tech: string;
  hours: string;
  months: string;
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROK_API;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI provider is not configured" },
      { status: 500 }
    );
  }

  let body: RoadmapRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { tech, hours, months } = body;
  if (!tech || !hours || !months) {
    return NextResponse.json(
      { error: "tech, hours and months are required" },
      { status: 400 }
    );
  }

  const systemPrompt = `You are Pathwise, an AI learning-roadmap planner. Generate a personalized, time-boxed learning roadmap.
The user wants to learn: "${tech}".
They can afford: "${hours}" per day for "${months}".
Return ONLY valid JSON (no markdown, no code fences) with this exact shape:
{
  "title": string,
  "summary": string,
  "weeks": [
    { "week": number, "focus": string, "topics": string[], "hoursPerWeek": number }
  ],
  "resources": string[]
}
Spread the topics realistically across the weeks based on the available time. Keep it focused and actionable.`;

  const userPrompt = `I want to learn ${tech}, I can afford ${hours} daily for ${months}.`;

  try {
    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "AI request failed", detail: text },
        { status: 502 }
      );
    }

    const data = await res.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "{}";

    let roadmap: unknown;
    try {
      roadmap = JSON.parse(content);
    } catch {
      roadmap = { raw: content };
    }

    return NextResponse.json({ roadmap });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to reach AI provider", detail: String(err) },
      { status: 502 }
    );
  }
}
