import { uploadFileToS3 } from "./s3-utils";

interface ScreenshotOptions {
  url: string;
  userId: string;
  fileName?: string;
}

interface ScreenshotResponse {
  success: boolean;
  screenshotUrl?: string;
  error?: string;
}

export async function generateScreenshot({
  url,
  userId,
  fileName = `screenshot-${Date.now()}`,
}: ScreenshotOptions): Promise<ScreenshotResponse> {
  try {
    const metadataResponse = await fetch(
      `https://api.microlink.io?url=${encodeURIComponent(
        url
      )}&screenshot=true&delay=3000&timeout=15000`
    );
    if (!metadataResponse.ok) {
      throw new Error(`Microlink API error: ${metadataResponse.status}`);
    }
    const microlinkData = await metadataResponse.json();
    if (
      microlinkData.status !== "success" ||
      !microlinkData.data?.screenshot?.url
    ) {
      throw new Error("Failed to generate screenshot metadata");
    }

    const screenshotUrl = microlinkData.data.screenshot.url;

    const imageResponse = await fetch(screenshotUrl);
    if (!imageResponse.ok) {
      throw new Error("Failed to download screenshot");
    }

    const imageArrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(imageArrayBuffer);

    const screenshotFile = new File([buffer], `${fileName}.jpg`, {
      type: "image/jpeg",
    });

    const s3Url = await uploadFileToS3({
      file: screenshotFile,
      prefix: `users/${userId}/screenshots`,
      fileName,
    });

    return {
      success: true,
      screenshotUrl: s3Url,
    };
  } catch (error) {
    console.error("Screenshot generation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
