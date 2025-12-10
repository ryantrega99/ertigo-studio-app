import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Edits an image using Gemini 2.5 Flash Image.
 * @param base64Image The base64 string of the image (without the data:image/... prefix)
 * @param mimeType The mime type of the image
 * @param prompt The text prompt for editing
 * @returns The base64 string of the generated image
 */
export const editImageWithGemini = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      // Config for generation
      config: {
        // No specific responseMimeType for image generation models like nano banana
      }
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return part.inlineData.data;
        }
      }
    }
    
    // If no image found, check for text feedback which might indicate refusal or error
    if (response.text) {
      console.warn("Gemini returned text instead of image:", response.text);
      throw new Error(response.text);
    }

    return null;
  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    throw error;
  }
};