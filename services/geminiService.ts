
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getShoppingAssistance = async (userMessage: string, chatHistory: any[]) => {
  const productListString = PRODUCTS.map(p => `${p.name} ($${p.price}, Category: ${p.category})`).join(', ');
  
  const systemInstruction = `
    You are a specialized "ICT Solutions Consultant" for the GLOBAL ICT MARKET (ShopOrbit).
    Our inventory is strictly Information and Communication Technology: ${productListString}.
    Your goal is to provide technical advice on hardware, software, and networking solutions.
    Always be professional and use technical terminology appropriately.
    If a user asks for non-ICT products (like fashion or food), politely inform them that we specialize exclusively in Global ICT solutions and offer a relevant tech alternative.
    Recommend specific specs like RAM, CPU types, and bandwidth where appropriate.
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
    return "The system core is rebooting. As your ICT Agent, I'll be back online in a moment to help with your tech specs.";
  }
};

export const getProductInsight = async (productName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Give a professional one-sentence technical value proposition for the ICT product: "${productName}".`,
      config: {
        temperature: 0.9,
        maxOutputTokens: 100,
      }
    });
    return response.text;
  } catch (error) {
    return "Engineered for high-performance ICT environments.";
  }
};
