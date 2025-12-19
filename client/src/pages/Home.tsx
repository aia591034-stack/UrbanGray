import { motion, useScroll, useTransform } from "framer-motion";
import { Truck, ShieldCheck, Clock, ArrowUpRight, CheckCircle2 } from "lucide-react";

const products = [
  {
    id: 1,
    name: "ソファ 2.5人掛け 単品 グレージュ 天然木 木脚 着脱可 肘付",
    price: "¥38,980",
    description: "肌触りの良いグレージュファブリック。カバーリング仕様で、汚れても安心。ミニマルな空間に溶け込む、主張しすぎない存在感。",
    link: "https://urbangray.base.shop/items/128927720",
    image: "/03.jpg",
    tags: ["Best Seller", "Free Shipping"]
  },
  {
    id: 2,
    name: "扉付き テレビ台 テレビボード 110cm幅 グレージュ 壁置きタイプ",
    price: "¥7,980",
    description: "生活感を隠す、扉付きのミニマルデザイン。配線もすっきり収納。壁に馴染むカラーリングで、部屋を広く見せます。",
    link: "https://urbangray.base.shop/items/128927722",
    image: "/04.jpg",
    tags: ["New Arrival"]
  },
  {
    id: 3,
    name: "センターテーブル 長方形 約120×60cm ストーングレー 引き出し付",
    price: "¥24,980",
    description: "重厚感のある石目調。部屋の主役になるテーブル。引き出し付きで、リモコンや雑誌もスマートに収納可能。",
    link: "https://urbangray.base.shop/items/128927726",
    image: "/01.jpg",
    tags: []
  },
  {
    id: 4,
    name: "キッチンボード 約幅90cm ストーングレー 扉収納 コンセント付",
    price: "¥31,980",
    description: "家電も食器も美しく隠す。ストーングレーの収納。生活感が出がちなキッチンを、ショールームのような空間へ。",
    link: "https://urbangray.base.shop/items/128927724",
    image: "/02.jpg",
    tags: ["High Capacity"]
  }
];

const features = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: "全品送料無料",
    description: "北海道・沖縄・離島を除く全国へ、無料でお届けします。"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "最短翌日発送",
    description: "在庫のある商品は、ご注文から24時間以内に発送手配を行います。"
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "安心の品質保証",
    description: "万が一の不具合にも迅速に対応。長く愛用いただける品質をお約束します。"
  }
];

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const imageReveal = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" }
  }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yBackend = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-300 selection:text-stone-900 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200 transition-all duration-300">
        <div className="container h-20 flex items-center justify-between px-6">
          <h1 className="text-xl tracking-[0.2em] font-bold uppercase font-serif">UrbanGray</h1>
          <nav className="hidden md:flex gap-8 text-sm tracking-widest uppercase text-stone-500">
            <a href="#concept" className="hover:text-stone-900 transition-colors">Concept</a>
            <a href="#products" className="hover:text-stone-900 transition-colors">Products</a>
            <a href="#features" className="hover:text-stone-900 transition-colors">Service</a>
          </nav>
          <a 
            href="https://urbangray.base.shop/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-stone-900 text-white px-6 py-3 rounded-full hover:bg-stone-700 transition-all hover:scale-105 tracking-widest uppercase shadow-lg"
          >
            Visit Shop
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
          <motion.div 
            style={{ y: yBackend, opacity: heroOpacity }}
            className="absolute inset-0 z-0"
          >
             <div className="absolute inset-0 bg-gradient-to-b from-stone-50/80 via-transparent to-stone-50 z-10" />
             <img src="/01.jpg" alt="background" className="w-full h-full object-cover opacity-20 scale-105" />
          </motion.div>
          
          <div className="z-10 max-w-4xl relative">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="mb-8"
            >
              <motion.span variants={fadeInUp} className="block text-stone-500 tracking-[0.4em] uppercase text-sm mb-6">
                Urban & Minimalist
              </motion.span>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif mb-8 leading-none tracking-tighter text-stone-900 mix-blend-darken">
                <motion.span variants={fadeInUp} className="block">Grey,</motion.span>
                <motion.span variants={fadeInUp} className="block text-stone-400">defines</motion.span>
                <motion.span variants={fadeInUp} className="block">you.</motion.span>
              </h2>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-stone-600 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto"
            >
              余計な色はいらない。<br />
              洗練された「グレー」だけでつくる、<br className="md:hidden" />大人のサンクチュアリ。
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="flex flex-col md:flex-row gap-4 justify-center"
            >
              <a href="#products" className="group relative px-10 py-4 overflow-hidden bg-stone-900 text-white shadow-xl transition-all hover:scale-105">
                <span className="absolute inset-0 w-full h-full bg-stone-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative tracking-widest uppercase text-sm font-medium">View Collection</span>
              </a>
            </motion.div>
          </div>

          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 100 }}
            transition={{ delay: 2, duration: 1.5, ease: "easeInOut" }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-stone-300"
          />
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 bg-stone-100 border-y border-stone-200">
          <div className="container px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center"
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="flex flex-col items-center space-y-6 group"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-stone-900 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-3">{feature.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Concept Section - Parallax Effect */}
        <section id="concept" className="py-32 md:py-48 px-6 overflow-hidden">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="w-full md:w-1/2 relative"
              >
                <div className="aspect-[3/4] overflow-hidden">
                   <motion.img 
                     initial={{ scale: 1.2 }}
                     whileInView={{ scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.5 }}
                     src="/01.jpg" 
                     alt="Lifestyle" 
                     className="w-full h-full object-cover" 
                   />
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute -bottom-12 -right-12 w-64 h-64 bg-stone-200 -z-10 hidden md:block" 
                />
              </motion.div>
              
              <div className="w-full md:w-1/2 space-y-10">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  <motion.span variants={fadeInUp} className="inline-block text-xs font-bold tracking-widest text-stone-400 uppercase mb-4">Our Philosophy</motion.span>
                  <motion.h3 variants={fadeInUp} className="text-4xl md:text-6xl font-serif leading-tight mb-8">
                    「無機質」こそ、<br />最高の安らぎ。
                  </motion.h3>
                  <motion.p variants={fadeInUp} className="text-stone-600 leading-loose font-light text-lg">
                    家に帰ったとき、視覚的なノイズに疲れていませんか？
                    <br /><br />
                    UrbanGrayは、彩度を極限まで落とした「グレージュ」と「ストーングレー」に特化したインテリアブランドです。
                    <br /><br />
                    木目の温かさとコンクリートの静けさを融合させたデザインは、
                    あなたの部屋をまるで海外のホテルのような、非日常の空間へと変えます。
                  </motion.p>
                  <div className="pt-8">
                     <ul className="space-y-4">
                       <li className="flex items-center gap-3 text-stone-700">
                         <CheckCircle2 className="w-5 h-5 text-stone-400" />
                         <span>どんな床色にも馴染む絶妙な色調</span>
                       </li>
                       <li className="flex items-center gap-3 text-stone-700">
                         <CheckCircle2 className="w-5 h-5 text-stone-400" />
                         <span>圧迫感を与えないローデザイン</span>
                       </li>
                       <li className="flex items-center gap-3 text-stone-700">
                         <CheckCircle2 className="w-5 h-5 text-stone-400" />
                         <span>組み立てやすさを重視した設計</span>
                       </li>
                     </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Product List Section */}
        <section id="products" className="py-32 bg-white text-stone-900">
          <div className="container px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Collection</h2>
              <div className="h-1 w-20 bg-stone-900 mx-auto" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1 }}
                  variants={fadeInUp}
                  className="group cursor-pointer"
                >
                  <a href={product.link} target="_blank" rel="noopener noreferrer" className="block">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 mb-8 shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
                      <motion.img
                        variants={imageReveal}
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      />
                      {product.tags.length > 0 && (
                        <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                          {product.tags.map((tag, tagIdx) => (
                            <motion.span 
                              key={tag}
                              initial={{ x: -20, opacity: 0 }}
                              whileInView={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.5 + (tagIdx * 0.1) }}
                              className="bg-white/90 backdrop-blur text-[10px] font-bold tracking-wider px-3 py-1 uppercase text-stone-900 border border-stone-200"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <h3 className="text-xl font-serif leading-snug group-hover:text-stone-500 transition-colors">
                        {product.name}
                      </h3>
                      <span className="font-medium text-xl whitespace-nowrap">{product.price}</span>
                    </div>
                    
                    <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-stone-900 group-hover:translate-x-2 transition-transform duration-300">
                      View on BASE
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-24 text-center">
              <a 
                href="https://urbangray.base.shop/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-12 py-4 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300 tracking-widest uppercase text-sm hover:scale-105"
              >
                View All Products
              </a>
            </div>
          </div>
        </section>

        {/* Brand Promise / CTA */}
        <section className="py-40 bg-stone-900 text-stone-100 text-center px-6 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-[url('/01.jpg')] bg-cover bg-center"
          />
          <div className="container max-w-3xl mx-auto relative z-10">
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-serif mb-8"
            >
              Make your room,<br />your masterpiece.
            </motion.h2>
            <p className="text-stone-400 mb-12 leading-loose">
              理想の部屋作りは、ひとつの家具から始まります。<br />
              あなたの生活に、洗練されたグレーの彩りを。
            </p>
            <a 
              href="https://urbangray.base.shop/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white text-stone-900 px-12 py-5 font-bold tracking-widest uppercase hover:bg-stone-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]"
            >
              Shop Now
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 bg-stone-950 text-stone-500 text-sm border-t border-stone-900">
        <div className="container px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="text-2xl text-white font-serif tracking-wider uppercase">UrbanGray</div>
            <p className="leading-relaxed max-w-sm">
              洗練されたグレージュインテリア専門店。<br />
              ミニマルで上質な暮らしを提案します。
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white uppercase tracking-widest text-xs">Menu</h4>
            <nav className="flex flex-col gap-2">
              <a href="#concept" className="hover:text-white transition-colors">Concept</a>
              <a href="#products" className="hover:text-white transition-colors">Collection</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="https://urbangray.base.shop/about" target="_blank" className="hover:text-white transition-colors">About Us</a>
              <a href="https://urbangray.base.shop/law" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-[10px]">特定商取引法に基づく表記</a>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-white uppercase tracking-widest text-xs">Follow Us</h4>
            <nav className="flex flex-col gap-2">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Pinterest</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </nav>
          </div>
        </div>
        <div className="container px-6 mt-16 pt-8 border-t border-stone-900 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 UrbanGray. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for Urban Life.</p>
        </div>
      </footer>
    </div>
  );
}