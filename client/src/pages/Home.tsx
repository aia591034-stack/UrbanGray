import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Clock, ArrowUpRight, CheckCircle2 } from "lucide-react";

const products = [
  {
    id: 1,
    name: "ソファ 2.5人掛け 単品 グレージュ 天然木 木脚 着脱可 肘付",
    price: "¥38,980",
    description: "肌触りの良いグレージュファブリック。カバーリング仕様で、汚れても安心。ミニマルな空間に溶け込む、主張しすぎない存在感。",
    link: "https://urbangray.base.shop/items/128927720",
    image: "/03.jpg", // 確実に存在する画像を使用
    tags: ["Best Seller", "Free Shipping"]
  },
  {
    id: 2,
    name: "扉付き テレビ台 テレビボード 110cm幅 グレージュ 壁置きタイプ",
    price: "¥7,980",
    description: "生活感を隠す、扉付きのミニマルデザイン。配線もすっきり収納。壁に馴染むカラーリングで、部屋を広く見せます。",
    link: "https://urbangray.base.shop/items/128927722",
    image: "/04.jpg", // 一時的に同じ画像を使用
    tags: ["New Arrival"]
  },
  {
    id: 3,
    name: "センターテーブル 長方形 約120×60cm ストーングレー 引き出し付",
    price: "¥24,980",
    description: "重厚感のある石目調。部屋の主役になるテーブル。引き出し付きで、リモコンや雑誌もスマートに収納可能。",
    link: "https://urbangray.base.shop/items/128927726",
    image: "/01.jpg", // 一時的に同じ画像を使用
    tags: []
  },
  {
    id: 4,
    name: "キッチンボード 約幅90cm ストーングレー 扉収納 コンセント付",
    price: "¥31,980",
    description: "家電も食器も美しく隠す。ストーングレーの収納。生活感が出がちなキッチンを、ショールームのような空間へ。",
    link: "https://urbangray.base.shop/items/128927724",
    image: "/02.jpg", // 一時的に同じ画像を使用
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

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-300 selection:text-stone-900">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
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
            className="text-xs bg-stone-900 text-white px-6 py-3 rounded-full hover:bg-stone-700 transition-colors tracking-widest uppercase"
          >
            Visit Shop
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
             {/* Background Image Placeholder if needed */}
             <img src="/01.jpg" alt="background" className="w-full h-full object-cover" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="z-10 max-w-4xl"
          >
            <span className="block text-stone-500 tracking-[0.4em] uppercase text-sm mb-6">Urban & Minimalist</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-none tracking-tight text-stone-900">
              Grey,<br />defines you.
            </h2>
            <p className="text-stone-600 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              余計な色はいらない。<br />
              洗練された「グレー」だけでつくる、<br className="md:hidden" />大人のサンクチュアリ。
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="#products" className="px-8 py-4 bg-stone-900 text-white rounded-none hover:bg-stone-800 transition-all tracking-widest uppercase text-sm">
                View Collection
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="w-px h-16 bg-stone-300" />
          </motion.div>
        </section>

        {/* Features Section (Trust Building) */}
        <section id="features" className="py-24 bg-stone-100 border-y border-stone-200">
          <div className="container px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center space-y-4"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-stone-900 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-lg">{feature.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed max-w-xs">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Concept Section */}
        <section id="concept" className="py-32 md:py-48 px-6">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-[3/4] bg-stone-200 overflow-hidden">
                   <img src="/01.jpg" alt="Lifestyle" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-stone-100 -z-10 hidden md:block" />
              </div>
              
              <div className="w-full md:w-1/2 space-y-8">
                <span className="text-xs font-bold tracking-widest text-stone-400 uppercase">Our Philosophy</span>
                <h3 className="text-3xl md:text-5xl font-serif leading-tight">
                  「無機質」こそ、<br />最高の安らぎ。
                </h3>
                <p className="text-stone-600 leading-loose font-light">
                  家に帰ったとき、視覚的なノイズに疲れていませんか？
                  <br /><br />
                  UrbanGrayは、彩度を極限まで落とした「グレージュ」と「ストーングレー」に特化したインテリアブランドです。
                  <br /><br />
                  木目の温かさとコンクリートの静けさを融合させたデザインは、
                  あなたの部屋をまるで海外のホテルのような、非日常の空間へと変えます。
                </p>
                <div className="pt-4">
                   <ul className="space-y-3">
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
              </div>
            </div>
          </div>
        </section>

        {/* Product List Section */}
        <section id="products" className="py-32 bg-white text-stone-900">
          <div className="container px-6">
            <div className="text-center mb-24">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Collection</h2>
              <p className="text-stone-400 tracking-widest uppercase text-sm">New Arrivals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group cursor-pointer"
                >
                  <a href={product.link} target="_blank" rel="noopener noreferrer" className="block">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 mb-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {product.tags.length > 0 && (
                        <div className="absolute top-4 left-4 flex gap-2">
                          {product.tags.map(tag => (
                            <span key={tag} className="bg-white/90 backdrop-blur text-[10px] font-bold tracking-wider px-3 py-1 uppercase text-stone-900">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    </div>

                    {/* Content */}
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h3 className="text-lg font-serif leading-snug group-hover:text-stone-600 transition-colors">
                        {product.name}
                      </h3>
                      <span className="font-medium text-lg whitespace-nowrap">{product.price}</span>
                    </div>
                    
                    <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase border-b border-stone-900 pb-1 group-hover:text-stone-600 group-hover:border-stone-600 transition-all">
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
                className="inline-block px-12 py-4 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300 tracking-widest uppercase text-sm"
              >
                View All Products
              </a>
            </div>
          </div>
        </section>

        {/* Brand Promise / CTA */}
        <section className="py-32 bg-stone-900 text-stone-100 text-center px-6">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif mb-8">
              Make your room,<br />your masterpiece.
            </h2>
            <p className="text-stone-400 mb-12 leading-loose">
              理想の部屋作りは、ひとつの家具から始まります。<br />
              あなたの生活に、洗練されたグレーの彩りを。
            </p>
            <a 
              href="https://urbangray.base.shop/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white text-stone-900 px-10 py-4 rounded-sm font-bold tracking-widest uppercase hover:bg-stone-200 transition-colors"
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
