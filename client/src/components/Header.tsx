import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowUpRight, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  // ページ遷移時にメニューを閉じる
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 transition-all duration-300">
        <div className="container h-20 flex items-center justify-between px-6">
          {/* Logo */}
          <Link href="/">
            <a className="text-xl tracking-[0.2em] font-bold uppercase font-serif z-50 relative hover:opacity-70 transition-opacity">
              UrbanGray
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-sm tracking-widest uppercase text-stone-500 items-center">
            <Link href="/about">
              <a className={`hover:text-stone-900 transition-colors ${location === '/about' ? 'text-stone-900 font-bold' : ''}`}>About</a>
            </Link>
            <Link href="/blog">
              <a className={`hover:text-stone-900 transition-colors ${location.startsWith('/blog') ? 'text-stone-900 font-bold' : ''}`}>Journal</a>
            </Link>
            <a href="/#products" className="hover:text-stone-900 transition-colors">Collection</a>
            
            <a 
              href="https://www.instagram.com/urbangray.official/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-stone-900 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a 
              href="https://urbangray.base.shop/" 
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-xs bg-stone-900 text-white px-6 py-3 rounded-full hover:bg-stone-700 transition-all hover:scale-105 tracking-widest uppercase shadow-lg"
            >
              Visit Shop
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 relative p-2 -mr-2 text-stone-900"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-stone-50 pt-24 px-6 md:hidden flex flex-col"
          >
            <nav className="flex flex-col gap-8 text-lg tracking-widest uppercase text-stone-900 font-serif">
              <Link href="/">
                <a className="border-b border-stone-200 pb-4">Home</a>
              </Link>
              <Link href="/about">
                <a className="border-b border-stone-200 pb-4">About Us</a>
              </Link>
              <Link href="/blog">
                <a className="border-b border-stone-200 pb-4">Journal</a>
              </Link>
              <a href="/#products" className="border-b border-stone-200 pb-4" onClick={() => setIsOpen(false)}>
                Collection
              </a>
              <a href="/#features" className="border-b border-stone-200 pb-4" onClick={() => setIsOpen(false)}>
                Service
              </a>
              <a href="https://urbangray.base.shop/law" target="_blank" rel="noopener noreferrer" className="border-b border-stone-200 pb-4 text-sm text-stone-500">
                特定商取引法に基づく表記
              </a>
              <a 
                href="https://www.instagram.com/urbangray.official/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-stone-900 pt-4"
              >
                <Instagram className="w-6 h-6" />
                <span>Instagram</span>
              </a>
            </nav>

            <div className="mt-auto mb-12">
              <a 
                href="https://urbangray.base.shop/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-stone-900 text-white py-4 rounded-sm tracking-widest uppercase"
              >
                Visit Online Shop
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}