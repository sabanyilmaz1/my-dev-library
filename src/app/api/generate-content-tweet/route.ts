import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "@/lib/gemini";
import { getTagsByUserId } from "@/actions/db/tags";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { returnTweetPromptWithAlreadyTags } from "@/utils/gemini-utils/prompt_for_tweets";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await request.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Tweet content is required" },
        { status: 400 }
      );
    }

    const tags = await getTagsByUserId();
    const existingTagNames = tags.map((tag) => tag.label);

    const prompt = returnTweetPromptWithAlreadyTags(existingTagNames);
    const finalPrompt = `${prompt}\n\nAnalyze this tweet content: ${content}`;

    const result = await generateContent(finalPrompt);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
