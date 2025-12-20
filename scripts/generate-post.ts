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

const POSTS_DIR = path.join(process.cwd(), "client", "src", "posts");

if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

// Images available in the project
const AVAILABLE_IMAGES = ["/01.jpg", "/02.jpg", "/03.jpg", "/04.jpg"];

function getRandomImage() {
  return AVAILABLE_IMAGES[Math.floor(Math.random() * AVAILABLE_IMAGES.length)];
}

async function generatePost() {
  console.log("Generating new blog post...");

  const prompt = `
    You are a professional interior design blogger for "Urban Gray".
    Target audience: Men in their 30s who like hotel-like, minimalist designs.
    
    Task: Write a blog post in Japanese about grey interior or minimalist living.
    Output in Markdown with Frontmatter.
    
    Frontmatter:
    - title: catchy title in Japanese
    - date: YYYY-MM-DD (Today is ${new Date().toISOString().split('T')[0]})
    - description: short summary
    - image: Placeholder (The script will assign a random image)
    - author: Urban Gray Editorial

    Content:
    - Professional, cool tone ("desu/masu").
    - Use H2 (##) for main sections and H3 (###) for subsections.
    - IMPORTANT: Use double newlines between every paragraph.
    - IMPORTANT: Use **bold text** for important keywords.
    - IMPORTANT: Use bullet points (- ) or numbered lists (1. ) where appropriate to break up text.
    - Keep paragraphs relatively short.
    - Focus on delivering high-value tips for 30s men.
    - Length: Approximately 1500-2000 Japanese characters.
    - Do NOT wrap the output in markdown code blocks like \`\`\`markdown. Just provide the raw text.
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

    // Force random image to ensure variety
    const randomImage = getRandomImage();
    
    // Replace or insert image field in frontmatter
    if (text.match(/image:\s*"?.*"?\n/)) {
      text = text.replace(/image:\s*"?.*"?\n/, `image: "${randomImage}"\n`);
    } else {
      // Insert after description if image field is missing
      text = text.replace(/(description:.*\n)/, `$1image: "${randomImage}"\n`);
    }

    const date = dateMatch[1].trim();
    const filename = `${date}-post-${Date.now()}.md`;
    const filepath = path.join(POSTS_DIR, filename);

    fs.writeFileSync(filepath, text);
    console.log(`Successfully generated: ${filename} with image ${randomImage}`);
  } catch (error) {
    console.error("Failed to generate post:", error);
    process.exit(1);
  }
}

generatePost();