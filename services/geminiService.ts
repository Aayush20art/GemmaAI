
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GenerationResult } from "../types";

export const generateSocialCaptions = async (base64Image: string, mimeType: string): Promise<GenerationResult> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;
  
  console.log("API Key configured:", !!apiKey);
  console.log("API Key length:", apiKey?.length);
  
  if (!apiKey || apiKey.trim() === '') {
    throw new Error("API key not configured. Please set VITE_GEMINI_API_KEY in your .env.local file");
  }

  try {
    // First, query the ListModels endpoint to see what models are available for this API key.
    const listRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`
    );

    let availableModels: string[] = [];
    if (listRes.ok) {
      const json = await listRes.json();
      availableModels = (json.models || []).map((m: any) => m.name).filter(Boolean);
      console.log("Available models:", availableModels);
    } else {
      console.warn("Could not list models, status:", listRes.status);
    }

    // Try to select a vision-capable model from the list.
    const visionCandidate = availableModels.find((n) => /vision|image|multimodal|vision-/i.test(n) || /gemini/i.test(n));

    if (!visionCandidate) {
      // No vision model found — provide a helpful error including available models so the user can enable one.
      const modelsText = availableModels.length ? availableModels.join(', ') : 'none';
      throw new Error(
        `No vision-capable model available for this API key (available: ${modelsText}).\n` +
        `Please enable a vision/multimodal Gemini model in the Google Cloud project or use an API key associated with a project that has vision models.`
      );
    }

    console.log("Selected vision model:", visionCandidate);

    // The SDK expects a model id like "gemini-pro-vision" — if the list returns "models/...", strip the prefix.
    const modelId = visionCandidate.replace(/^models\//, '');

    const client = new GoogleGenerativeAI(apiKey);
    const model = client.getGenerativeModel({ model: modelId });

    // Convert base64 to bytes for the API
    const base64Data = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;

    console.log("Sending request to Gemini API...");
    console.log("Model:", modelId);
    console.log("MIME Type:", mimeType);
    console.log("Base64 data length:", base64Data.length);

    const prompt = `You are a social media expert. Analyze this image and generate social media captions.\n\nReturn ONLY valid JSON, no other text:\n{\n  "instagram": {\n    "platform": "Instagram",\n    "caption": "An engaging caption with emojis and hashtags for Instagram",\n    "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5"]\n  },\n  "linkedin": {\n    "platform": "LinkedIn",\n    "caption": "A professional caption focused on insights and career growth",\n    "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5"]\n  }\n}`;

    const response = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      },
      prompt,
    ]);

    console.log("Response received successfully");

    const responseText = response.response.text();
    console.log("Response text:", responseText);

    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Could not find JSON in response");
      throw new Error("Invalid response format from API - no JSON found");
    }

    const result = JSON.parse(jsonMatch[0]);
    return result as GenerationResult;
  } catch (error: any) {
    console.error("Full error object:", error);
    console.error("Error message:", error?.message);
    console.error("Error status:", error?.status);

    let errorMessage = error?.message || "Failed to generate captions";

    // Provide more helpful error messages
    if (errorMessage.includes("API key")) {
      errorMessage = "Invalid API key. Please check your .env.local file and make sure the API key is correct.";
    } else if (errorMessage.includes("403")) {
      errorMessage = "API access denied. Make sure the Generative AI API is enabled in Google Cloud Console.";
    } else if (errorMessage.includes("429")) {
      errorMessage = "Too many requests. Please wait a moment and try again.";
    }

    throw new Error(errorMessage);
  }
};
