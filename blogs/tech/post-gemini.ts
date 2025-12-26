
export const content = `# Getting Started with Gemini API

Google Gemini is a **state-of-the-art** multimodal model. In this post, we explore the SDK...

![Gemini Logo](https://lh3.googleusercontent.com/pw/AP1GczODWJqN4zD3y6D3V3D3V3D3V3D3V3D3V3D3V3D3V3D3V3D3V3D3V3D=w1200-h630-p-k-no-nu)

### Why use Gemini?
- **Speed**: Optimized for fast inference.
- **Intelligence**: Deep reasoning capabilities.
- **Integration**: Works seamlessly with TypeScript.

\`\`\`typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: "Hello, how can I help you?",
});
console.log(response.text);
\`\`\`

Happy coding!`;
