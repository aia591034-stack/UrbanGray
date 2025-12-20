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

// Function to get titles of existing posts to avoid duplication
function getExistingTitles(): string[] {
  const titles: string[] = [];
  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith(".md"));

  for (const file of files) {
    const content = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const match = content.match(/title:\s*"?(.+?)"?\n/);
    if (match) {
      titles.push(match[1].trim());
    }
  }
  return titles;
}

async function generatePost() {
  console.log("Generating new blog post...");

  // Get existing titles
  const existingTitles = getExistingTitles();
  console.log(`Found ${existingTitles.length} existing posts.`);

  const prompt = `
    You are a professional interior design blogger for "Urban Gray", a brand specializing in simple, modern, and grey-toned interiors.
    Target audience: Men in their 30s who like hotel-like, minimalist designs.

    **Existing Article Titles (DO NOT DUPLICATE THESE TOPICS):**
    ${existingTitles.map(t => `- ${t}`).join("\n")}

    Task: 
    1. Brainstorm a unique topic related to grey interior, minimalism, hotel-like living, productivity at home, or furniture care that is NOT in the list above.
    2. Write a blog post in Japanese about that topic. 
    
    Output in Markdown with Frontmatter.
    
    Frontmatter requirements:
    - title: catchy title in Japanese
    - date: YYYY-MM-DD (Today is ${new Date().toISOString().split('T')[0]})
    - description: short summary (max 120 chars)
    - image: Placeholder (The script will assign a random image)
    - author: Urban Gray Editorial

    Content requirements:
    - Professional, cool tone ("desu/masu").
    - Use H2 (##) for main sections and H3 (###) for subsections.
    - IMPORTANT: Use double newlines between every paragraph.
    - IMPORTANT: Use **bold text** for important keywords.
    - IMPORTANT: Use bullet points (- ) or numbered lists (1. ) where appropriate.
    - Keep paragraphs relatively short.
    - Length: Approximately 1500-2000 Japanese characters.
    - Do NOT wrap the output in markdown code blocks like 
    Just provide the raw text.
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
    
    // Replace or insert image field
    if (text.match(/image:\s*"?.*"? \n/)) {
      text = text.replace(/image:\s*"?.*"? \n/, `image: "${randomImage}"\n`);
    } else {
      text = text.replace(/(description:.*\n)/, `$1image: "${randomImage}"\n`);
    }

    const date = dateMatch[1].trim();
    // Use timestamp to ensure unique filename
    const safeTitle = `post-${Date.now()}`;
    const filename = `${date}-${safeTitle}.md`;
    const filepath = path.join(POSTS_DIR, filename);

    fs.writeFileSync(filepath, text);
    console.log(`Successfully generated: ${filename} with image ${randomImage}`);
  } catch (error) {
    console.error("Failed to generate post:", error);
    process.exit(1);
  }
}

generatePost();
