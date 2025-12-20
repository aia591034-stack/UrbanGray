import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Error: GEMINI_API_KEY is not set in environment variables.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const POSTS_DIR = path.join(process.cwd(), "client/src/posts");

// Ensure posts directory exists
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

async function generatePost() {
  console.log("Generating new blog post...");

  const prompt = `
    You are a professional interior design blogger for "Urban Gray", a brand specializing in simple, modern, and grey-toned interiors.
    Target audience: Men in their 30s who like hotel-like, minimalist, and inorganic designs.
    
    Task: Write a blog post in Japanese about one of the following topics:
    - Grey interior color coordination
    - Creating a hotel-like room
    - Storage tips for minimalist living
    - Home office setup for remote work with style
    - The psychology of the color grey

    The output must be in Markdown format with Frontmatter.
    
    Frontmatter requirements:
    - title: A catchy title in Japanese (max 40 chars)
    - date: Current date in YYYY-MM-DD format
    - description: A short summary (max 120 chars)
    - image: Use one of these specific paths: "/01.jpg", "/02.jpg", "/03.jpg", "/04.jpg" (Choose the one that best fits the topic. 01=Living, 02=Kitchen/Storage, 03=Sofa, 04=TV Board)
    - author: Urban Gray Editorial

    Content requirements:
    - Write in a polite but cool, professional tone ("desu/masu" style but not too cutesy).
    - Use H2 (##) and H3 (###) for structure.
    - Include concrete advice or tips.
    - Length: Approximately 1500-2000 Japanese characters.
    - Do NOT wrap the output in markdown code blocks like 
```markdown
. Just provide the raw text.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // Clean up if the model still wraps output in code blocks
    if (text.startsWith("```")) {
      text = text.replace(/^```[a-z]*\n/i, "").replace(/\n```$/g, "");
    }

    // Extract title for filename
    const titleMatch = text.match(/title:\s*"?(.+?)"?\n/);
    const dateMatch = text.match(/date:\s*"?(.+?)"?\n/);

    if (!titleMatch || !dateMatch) {
      console.error("Generated Content:\n", text);
      throw new Error("Could not parse Frontmatter from generated text.");
    }

    const title = titleMatch[1].trim();
    const date = dateMatch[1].trim();
    
    const safeTitle = `post-${Date.now()}`;
    const filename = `${date}-${safeTitle}.md`;
    const filepath = path.join(POSTS_DIR, filename);

    fs.writeFileSync(filepath, text);
    console.log(`Successfully generated: ${filename}`);

  } catch (error) {
    console.error("Failed to generate post:", error);
    process.exit(1);
  }
}

generatePost();