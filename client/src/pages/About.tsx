import { motion, useScroll, useTransform } from "framer-motion";
import { Quote } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function About() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-300 selection:text-stone-900 overflow-x-hidden">
      {/* Header */}
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
           <motion.div 
             style={{ opacity: heroOpacity, scale: heroScale }}
             className="z-10 max-w-4xl"
           >
             <span className="block text-stone-400 tracking-[0.5em] uppercase text-xs mb-8">Our Philosophy</span>
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-8 text-stone-900">
               静寂を纏う、<br />ライフスタイル。
             </h1>
             <div className="w-px h-24 bg-stone-300 mx-auto mt-12" />
           </motion.div>
           
           {/* Abstract Background Element */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stone-200 rounded-full blur-[100px] opacity-30 -z-10 animate-pulse" />
        </section>

        {/* Chapter 1: The Noise */}
        <section className="py-32 px-6 bg-white">
          <div className="container max-w-5xl mx-auto">
             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               variants={staggerContainer}
               className="grid md:grid-cols-2 gap-16 items-center"
             >
               <motion.div variants={fadeInUp} className="order-2 md:order-1">
                 <span className="text-xs font-bold text-stone-400 tracking-widest uppercase mb-4 block">Chapter 01</span>
                 <h2 className="text-3xl md:text-4xl font-serif mb-8">都市のノイズと、<br />空白への渇望。</h2>
                 <p className="text-stone-600 leading-loose font-light mb-6">
                   私たちは日々、膨大な情報と色彩にさらされています。<br />
                   スマートフォンの通知、街中の広告、絶え間なく流れるタイムライン。<br />
                   便利さと引き換えに、私たちは「心の静寂」を失いつつあります。
                 </p>
                 <p className="text-stone-600 leading-loose font-light">
                   UrbanGrayは、そんな現代の都市生活者（アーバニスト）のために生まれました。<br />
                   私たちが提案するのは、家具というモノではなく、「視覚的な静けさ」です。
                 </p>
               </motion.div>
               <motion.div variants={fadeInRight} className="order-1 md:order-2 relative">
                 <div className="aspect-[4/5] bg-stone-100 overflow-hidden shadow-2xl">
                    <img src="/01.jpg" alt="City life vs Silence" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-1000" />
                 </div>
                 <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-stone-900 -z-10" />
               </motion.div>
             </motion.div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-40 bg-stone-900 text-stone-200 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('/01.jpg')] bg-fixed bg-cover opacity-10 grayscale" />
           <div className="container max-w-4xl mx-auto text-center relative z-10 px-6">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
             >
               <Quote className="w-12 h-12 mx-auto mb-8 text-stone-500 opacity-50" />
               <p className="text-2xl md:text-4xl font-serif leading-relaxed italic mb-12">
                 "色は、時に雄弁すぎる。<br />
                 だから私たちは、グレーを選ぶ。<br />
                 それは、あなた自身を主役にする唯一の色だから。"
               </p>
               <span className="text-xs tracking-[0.3em] uppercase text-stone-500">UrbanGray Founder</span>
             </motion.div>
           </div>
        </section>

        {/* Chapter 2: The Color Science */}
        <section className="py-32 px-6 bg-stone-50">
          <div className="container max-w-5xl mx-auto">
             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={staggerContainer}
               className="grid md:grid-cols-2 gap-16 items-center"
             >
               <motion.div variants={fadeInUp} className="relative">
                  <div className="aspect-square bg-white shadow-xl overflow-hidden p-8 flex items-center justify-center relative">
                     <div className="absolute top-0 left-0 w-full h-1/3 bg-[#E5E5E5]" />
                     <div className="absolute top-1/3 left-0 w-full h-1/3 bg-[#A3A3A3]" />
                     <div className="absolute top-2/3 left-0 w-full h-1/3 bg-[#525252]" />
                     <div className="z-10 bg-white p-6 shadow-sm max-w-xs text-center">
                        <span className="font-serif text-xl">The Grey Scale</span>
                     </div>
                  </div>
               </motion.div>
               <motion.div variants={fadeInUp}>
                 <span className="text-xs font-bold text-stone-400 tracking-widest uppercase mb-4 block">Chapter 02</span>
                 <h2 className="text-3xl md:text-4xl font-serif mb-8">「グレー」の<br />無限の可能性。</h2>
                 <p className="text-stone-600 leading-loose font-light mb-6">
                   私たちが「Urban Gray」と名付けたこの色は、単なる中間色ではありません。<br />
                   それは、コンクリートの冷たさと、古木の温かさを内包した複雑な色彩です。
                 </p>
                 <ul className="space-y-6 mt-8">
                   <li className="flex gap-4">
                     <div className="w-12 h-12 bg-[#D6D3D1] shrink-0" />
                     <div>
                       <h4 className="font-bold text-stone-800">Greige (グレージュ)</h4>
                       <p className="text-sm text-stone-500">ベージュの温もりを含んだグレー。心を解きほぐすリラックス空間に。</p>
                     </div>
                   </li>
                   <li className="flex gap-4">
                     <div className="w-12 h-12 bg-[#78716C] shrink-0" />
                     <div>
                       <h4 className="font-bold text-stone-800">Stone (ストーン)</h4>
                       <p className="text-sm text-stone-500">自然石のような重厚感。空間に凛とした緊張感と高級感を与えます。</p>
                     </div>
                   </li>
                   <li className="flex gap-4">
                     <div className="w-12 h-12 bg-[#44403C] shrink-0" />
                     <div>
                       <h4 className="font-bold text-stone-800">Charcoal (チャコール)</h4>
                       <p className="text-sm text-stone-500">黒に近い深いグレー。空間を引き締め、他のインテリアを際立たせます。</p>
                     </div>
                   </li>
                 </ul>
               </motion.div>
             </motion.div>
          </div>
        </section>

        {/* Our Promise */}
        <section className="py-32 px-6 bg-white border-t border-stone-200">
           <div className="container max-w-4xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-serif mb-16"
              >
                UrbanGray 3つの約束
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    num: "01",
                    title: "Essential Design",
                    desc: "流行を追わず、10年後も美しいと思える、本質的なミニマリズムを追求します。"
                  },
                  {
                    num: "02",
                    title: "Honest Price",
                    desc: "ショールームや実店舗を持たないオンライン特化のスタイルにより、高品質な家具を適正価格で提供します。"
                  },
                  {
                    num: "03",
                    title: "Sincere Support",
                    desc: "「部屋に合うか不安」という声に寄り添い、購入前から購入後まで、誠実なサポートを約束します。"
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="group"
                  >
                    <div className="text-6xl font-serif text-stone-100 group-hover:text-stone-200 transition-colors mb-4">{item.num}</div>
                    <h3 className="text-lg font-bold mb-4 tracking-wider">{item.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="py-24 bg-stone-950 text-stone-400 text-center border-t border-stone-900">
           <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
           >
             <h2 className="text-2xl text-white font-serif tracking-wider uppercase mb-8">UrbanGray</h2>
             <p className="mb-8 text-xs tracking-widest uppercase">Designed for Urban Life.</p>
             <Link href="/">
               <a className="inline-block px-8 py-3 border border-stone-700 hover:bg-stone-800 hover:text-white transition-colors text-xs tracking-widest uppercase">
                 Back to Home
               </a>
             </Link>
             <p className="mt-16 text-[10px] text-stone-600">&copy; 2025 UrbanGray. All rights reserved.</p>
           </motion.div>
        </footer>
      </main>
    </div>
  );
}