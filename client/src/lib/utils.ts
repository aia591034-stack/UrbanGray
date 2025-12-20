import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Simple Frontmatter parser to avoid "Buffer is not defined" error in browser
 */
export function parseFrontmatter(text: string) {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = text.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: text };
  }

  const frontmatterBlock = match[1];
  const content = text.replace(frontmatterRegex, "").trim();

  const data: Record<string, string> = {};
  frontmatterBlock.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'" ) && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  });

  return { data, content };
}

export function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  
  return `${year}.${month}.${day}`;
}