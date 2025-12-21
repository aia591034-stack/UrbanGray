import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { pipeline } from "stream";
import { promisify } from "util";

const streamPipeline = promisify(pipeline);

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!API_KEY) {
  console.error("Error: GEMINI_API_KEY is not set.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const POSTS_DIR = path.join(process.cwd(), "client", "src", "posts");
const IMAGES_DIR = path.join(process.cwd(), "client", "public", "blog-images");

// Ensure directories exist
if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

// Existing images fallback
const FALLBACK_IMAGES = ["/01.jpg", "/02.jpg", "/03.jpg", "/04.jpg"];

function getRandomFallbackImage() {
  return FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
}

// 1. Generate Topic & Search Keyword
async function generateTopic() {
  console.log("🤖 Brainstorming topic...");
  const prompt = `
    Think of a trending or timeless interior design topic for 30s men (e.g. Smart Home, Minimalist Desk, Japandi style, Plant styling).
    Output JSON format only:
    {
      "topic": "Japanese title of the topic",
      "searchQuery": "English search keyword for Unsplash. IMPORTANT: Add words like 'grey', 'minimalist', 'concrete', 'dark', or 'modern' to ensure the image fits the 'Urban Gray' brand aesthetic. (e.g. 'grey minimalist home office', 'concrete living room', 'dark modern bedroom')"
    }
  `;
  
  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/```json|```/g, "").trim();
  return JSON.parse(text);
}

// 2. Download Image from Unsplash
async function downloadImage(query) {
  if (!UNSPLASH_ACCESS_KEY) {
    console.log("⚠️ No Unsplash Key found. Using fallback image.");
    return getRandomFallbackImage();
  }

  console.log(`📸 Searching image for: ${query}`);
  try {
    const searchUrl = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(query)}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;
    const res = await fetch(searchUrl);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const photo = data.results[0];
      const imageUrl = photo.urls.regular;
      const filename = `img-${Date.now()}.jpg`;
      const localPath = path.join(IMAGES_DIR, filename);

      const imgRes = await fetch(imageUrl);
      if (!imgRes.ok) throw new Error(`Failed to fetch image: ${imgRes.statusText}`);

      await streamPipeline(imgRes.body, fs.createWriteStream(localPath));
      console.log(`✅ Image downloaded: ${filename}`);
      return `/blog-images/${filename}`;
    }
  } catch (error) {
    console.error("❌ Unsplash Error:", error);
  }
  
  return getRandomFallbackImage();
}

// 3. Write Article
async function writeArticle(topic, imagePath) {
  console.log(`✍️ Writing article about: ${topic}`);
  
  const prompt = `
    Role: Professional Japanese Interior Blogger for "Urban Gray".
    Language: Japanese (Must write in Japanese only).
    Target: 30s men, minimalist/modern preference.
    Topic: "${topic}"
    
    Task: Write a detailed blog post in Japanese about ${topic}.
    
    Format: Markdown with Frontmatter.
    
    Frontmatter:
    - title: catchy title in Japanese (e.g. グレーで整える、大人の書斎作り)
    - date: ${new Date().toISOString().split('T')[0]}
    - description: short summary in Japanese (max 120 chars)
    - image: "${imagePath}"
    - author: Urban Gray Editorial

    Content Rules (Strictly in Japanese):
    - Write 1500-2000 Japanese characters.
    - Use H2 (##) and H3 (###) for structure.
    - **Bold** key terms in Japanese.
    - Use bullet points.
    - KEEP PARAGRAPHS SHORT (Max 3-4 lines).
    - Use double newlines between paragraphs for readability.
    - Do NOT use English unless it's a technical term common in Japan.
    - No markdown code blocks in output.
  `;

  const result = await model.generateContent(prompt);
  let text = result.response.text().trim();
  
  if (text.startsWith("```")) {
    text = text.replace(/^```[a-z]*\n/i, "").replace(/\n```$/g, "");
  }

  // Force image path correctness
  if (text.match(/^image:.*\n/m)) {
    text = text.replace(/^image:.*\n/m, `image: "${imagePath}"\n`);
  }

  const filename = `${new Date().toISOString().split('T')[0]}-news-${Date.now()}.md`;
  fs.writeFileSync(path.join(POSTS_DIR, filename), text);
  console.log(`🎉 Post generated: ${filename}`);
}

// Main Flow
(async () => {
  try {
    const { topic, searchQuery } = await generateTopic();
    const imagePath = await downloadImage(searchQuery);
    await writeArticle(topic, imagePath);
  } catch (e) {
    console.error("Fatal Error:", e);
  }
})();
