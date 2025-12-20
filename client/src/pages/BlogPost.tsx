import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import { ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const [content, setContent] = useState("");
  const [meta, setMeta] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadPost() {
      if (!slug) return;

      try {
        // Dynamic import logic for Vite
        // Note: import.meta.glob must be static string literal, so we import all and pick one
        const modules = import.meta.glob("../posts/*.md", { query: "?raw", import: "default" });
        const targetPath = `../posts/${slug}.md`;
        
        if (!modules[targetPath]) {
          setError(true);
          return;
        }

        const rawContent = await modules[targetPath]() as string;
        const { content, data } = matter(rawContent);
        
        setContent(content);
        setMeta(data);
      } catch (e) {
        console.error(e);
        setError(true);
      }
    }

    loadPost();
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Article not found</h1>
          <Link href="/blog">
            <a className="text-stone-500 hover:text-stone-900 border-b border-stone-400">Back to Journal</a>
          </Link>
        </div>
      </div>
    );
  }

  if (!meta) {
    return <div className="min-h-screen bg-stone-50" />;
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-300 selection:text-stone-900">
      <Header />

      <main className="pt-32 pb-24">
        {/* Article Header */}
        <div className="container max-w-3xl mx-auto px-6 mb-16 text-center">
          <Link href="/blog">
             <a className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors mb-8">
               <ArrowLeft className="w-4 h-4" /> Back to Journal
             </a>
          </Link>
          <span className="block text-stone-400 text-sm tracking-widest mb-4">{meta.date}</span>
          <h1 className="text-3xl md:text-5xl font-serif leading-tight mb-12">
            {meta.title}
          </h1>
          <div className="aspect-[16/9] w-full bg-stone-200 overflow-hidden shadow-sm">
             <img src={meta.image || "/01.jpg"} alt={meta.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Article Content */}
        <article className="container max-w-2xl mx-auto px-6 prose prose-stone prose-lg md:prose-xl prose-headings:font-serif prose-headings:font-normal prose-p:leading-loose prose-p:text-stone-600 prose-a:text-stone-900 prose-a:no-underline prose-a:border-b prose-a:border-stone-300 hover:prose-a:border-stone-900 prose-img:rounded-sm prose-img:shadow-md">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>

        {/* Footer Navigation */}
        <div className="container max-w-2xl mx-auto px-6 mt-24 pt-12 border-t border-stone-200 text-center">
          <Link href="/blog">
            <a className="inline-block px-10 py-4 border border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all text-sm tracking-widest uppercase">
              Read More Articles
            </a>
          </Link>
        </div>
      </main>

      <footer className="py-12 bg-stone-950 text-stone-400 text-xs text-center border-t border-stone-900">
        <p>&copy; 2025 UrbanGray. All rights reserved.</p>
      </footer>
    </div>
  );
}
