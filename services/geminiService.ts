
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getShoppingAssistance = async (userMessage: string, chatHistory: any[]) => {
  const productListString = PRODUCTS.map(p => `${p.name} ($${p.price})`).join(', ');
  
  const systemInstruction = `
    You are a helpful and friendly shopping assistant for "ShopOrbit". 
    You help customers find products from our catalog. 
    Our current catalog: ${productListString}.
    If a user asks for recommendations, suggest products from our list.
    Be concise, helpful, and informative.
    Always try to be persuasive but honest about product features.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: `System context: ${systemInstruction}` }] },
        ...chatHistory.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 500,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a bit of trouble connecting to my brain right now. Please try again!";
  }
};

export const getProductInsight = async (productName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Give a one-sentence clever sales pitch for a product called "${productName}".`,
      config: {
        temperature: 0.9,
        maxOutputTokens: 100,
      }
    });
    return response.text;
  } catch (error) {
    return "The perfect addition to your collection.";
  }
};