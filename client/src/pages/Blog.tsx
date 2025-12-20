import { useState, useEffect } from "react";
import { Link } from "wouter";
import { parseFrontmatter, formatDate } from "@/lib/utils";
import Header from "@/components/Header";
import { motion } from "framer-motion";

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      // Use Vite's glob import to get all markdown files
      const modules = import.meta.glob("../posts/*.md", { query: "?raw", import: "default" });
      
      const loadedPosts: Post[] = [];

      for (const path in modules) {
        const rawContent = await modules[path]() as string;
        const { data } = parseFrontmatter(rawContent);
        
        // Extract filename as slug (e.g., "../posts/2023-12-01-post.md" -> "2023-12-01-post")
        const slug = path.split("/").pop()?.replace(".md", "") || "";

        loadedPosts.push({
          slug,
          title: data.title || "Untitled",
          date: data.date || "",
          description: data.description || "",
          image: data.image || "/01.jpg",
        });
      }

      // Sort by date descending
      loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(loadedPosts);
    }

    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-300 selection:text-stone-900">
      <Header />
      
      <main className="pt-32 pb-24 px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <span className="block text-stone-400 tracking-[0.4em] uppercase text-xs mb-6">Journal</span>
            <h1 className="text-4xl md:text-5xl font-serif leading-tight">
              Urban Life Log
            </h1>
            <div className="w-px h-16 bg-stone-300 mx-auto mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {posts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/blog/${post.slug}`}>
                  <a className="block">
                    <div className="aspect-[4/3] overflow-hidden bg-stone-200 mb-6">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <span className="text-xs text-stone-500 tracking-widest">{formatDate(post.date)}</span>
                      <h2 className="text-xl font-serif leading-snug group-hover:text-stone-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-stone-500 text-sm leading-relaxed line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center text-stone-400 py-20">
              Loading articles...
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-12 bg-stone-950 text-stone-400 text-xs text-center border-t border-stone-900">
        <p>&copy; 2025 UrbanGray. All rights reserved.</p>
      </footer>
    </div>
  );
}
