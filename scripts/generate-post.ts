import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Error: GEMINI_API_KEY is not set.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// 修正：保存先を確実に client/src/posts に設定
const POSTS_DIR = path.join(process.cwd(), "client", "src", "posts");

if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

async function generatePost() {
  console.log("Generating new blog post...");

  const prompt = `
    You are a professional interior design blogger for "Urban Gray".
    Target audience: Men in their 30s who like hotel-like, minimalist designs.
    
    Task: Write a blog post in Japanese about grey interior or minimalist living.
    The output must be in Markdown format with Frontmatter.
    
    Frontmatter:
    - title: catchy title in Japanese
    - date: YYYY-MM-DD
    - description: short summary
    - image: "/01.jpg", "/02.jpg", "/03.jpg", or "/04.jpg"
    - author: Urban Gray Editorial

    Content:
    - Professional tone.
    - H2/H3 for structure.
    - Length: 1500-2000 chars.
    - DO NOT use code blocks (
```
).
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    if (text.startsWith("```")) {
      text = text.replace(/^```[a-z]*\n/i, "").replace(/\n```$/g, "");
    }

    const titleMatch = text.match(/title:\s*"?(.+?)"?\n/);
    const dateMatch = text.match(/date:\s*"?(.+?)"?\n/);

    if (!titleMatch || !dateMatch) {
      throw new Error("Could not parse Frontmatter.");
    }

    const date = dateMatch[1].trim();
    const filename = `${date}-post-${Date.now()}.md`;
    const filepath = path.join(POSTS_DIR, filename);

    fs.writeFileSync(filepath, text);
    console.log(`Successfully generated: ${filename}`);
  } catch (error) {
    console.error("Failed to generate post:", error);
    process.exit(1);
  }
}

generatePost();

```