import OpenAI from "openai";

class OpenAIClient {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  getClient() {
    return this.client;
  }
  async getResponse(prompt: string, systemPrompt: string, isWebSearch: boolean, retryCount: number = 1): Promise<string> {
    if (retryCount > 3) {
      console.error("Max retry attempts reached");
      return "{}";
    }
    try {
      const response = await this.client.responses.create({
        model: "gpt-6-sol", // gpt-6-sol gpt-5.6-terra
        input: prompt,
        instructions: systemPrompt,
        tools: isWebSearch ? [{
          type: "web_search"
        }] : [],
      });
      return response.output_text.replace(/```json/g, "").replace(/```/g, "");
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
      return this.getResponse(prompt, systemPrompt, isWebSearch, retryCount + 1);
    }
  }
}

export const openAIClient = new OpenAIClient();