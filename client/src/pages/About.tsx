import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-300 selection:text-stone-900 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
        <div className="container h-20 flex items-center justify-between px-6">
          <Link href="/">
            <a className="text-xl tracking-[0.2em] font-bold uppercase font-serif cursor-pointer hover:opacity-70 transition-opacity">
              UrbanGray
            </a>
          </Link>
          <Link href="/">
             <a className="flex items-center gap-2 text-xs tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors">
               <ArrowLeft className="w-4 h-4" /> Back to Home
             </a>
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-32">
        <div className="container px-6 max-w-4xl mx-auto">
          {/* Hero Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <span className="block text-stone-400 tracking-[0.4em] uppercase text-xs mb-8">Our Philosophy</span>
            <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
              静寂を纏う、<br />ライフスタイル。
            </h1>
            <div className="w-px h-16 bg-stone-300 mx-auto" />
          </motion.div>

          {/* Story Section */}
          <section className="space-y-24">
            {/* 01: The Beginning */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 md:order-1 space-y-6">
                <h2 className="text-2xl font-serif">01. 始まり</h2>
                <p className="text-stone-600 leading-loose font-light">
                  UrbanGrayは、現代の都市生活における「ノイズ」へのアンチテーゼとして生まれました。<br /><br />
                  情報過多な日常の中で、私たちが最も必要としているのは、心が休まる「空白」の時間です。<br />
                  色を削ぎ落とし、素材の質感だけを残したグレーの空間には、不思議と人の心を鎮める力があります。
                </p>
              </div>
              <div className="order-1 md:order-2 bg-stone-200 aspect-square overflow-hidden">
                 <img src="/01.jpg" alt="Minimalist interior" className="w-full h-full object-cover grayscale opacity-80" />
              </div>
            </motion.div>

            {/* 02: The Color */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="bg-stone-200 aspect-square overflow-hidden">
                 <div className="w-full h-full bg-stone-300 flex items-center justify-center">
                    <div className="w-32 h-32 bg-stone-400 rounded-full blur-3xl opacity-50" />
                 </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-serif">02. グレーの美学</h2>
                <p className="text-stone-600 leading-loose font-light">
                  私たちが提案する「グレー」は、単なる中間色ではありません。<br /><br />
                  光の当たり方で表情を変えるストーングレー。<br />
                  温かみを感じさせるグレージュ。<br />
                  空間を引き締めるチャコール。<br /><br />
                  無限の階調を持つこの色は、どんなライフスタイルにも寄り添い、あなたの個性を静かに引き立てます。
                </p>
              </div>
            </motion.div>

            {/* 03: Promise */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-stone-100 p-12 md:p-16 text-center space-y-8"
            >
              <h2 className="text-2xl font-serif">私たちの約束</h2>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="space-y-3">
                  <h3 className="font-bold tracking-wider text-sm">DESIGN</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">トレンドに流されない、普遍的でミニマルなデザインを追求し続けます。</p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold tracking-wider text-sm">QUALITY</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">長く愛用いただけるよう、素材の耐久性と質感に妥協しません。</p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold tracking-wider text-sm">PRICE</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">店舗を持たないD2Cスタイルにより、適正価格で上質な家具をお届けします。</p>
                </div>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="text-center pt-16"
            >
              <p className="text-lg font-serif italic text-stone-500 mb-6">
                "Make your room, your masterpiece."
              </p>
              <p className="text-sm tracking-widest uppercase font-bold">UrbanGray Team</p>
            </motion.div>

          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-stone-900 text-stone-400 text-xs text-center border-t border-stone-800">
        <p>&copy; 2025 UrbanGray. All rights reserved.</p>
      </footer>
    </div>
  );
}