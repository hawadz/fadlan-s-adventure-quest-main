import { motion } from "framer-motion";
import { Pokeball, Sparkle, PixelHeart } from "@/components/svg/GameIcons";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 py-16 overflow-hidden"
      style={{ background: "var(--gradient-sky)" }}>
      {/* Grass floor sedikit diturunkan dari versi raksasa tadi */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "var(--gradient-grass)", borderTop: "5px solid var(--ink)" }} />

      {/* Floating decor - Ukuran ditengah-tengah (tidak terlalu kecil, tidak terlalu besar) */}
      {[
        { C: Pokeball, props: { className: "w-16 h-16 top-[12%] left-[8%]" }, d: 0 },
        { C: Pokeball, props: { color: "var(--water)", className: "w-12 h-12 top-[25%] right-[8%]" }, d: 0.6 },
        { C: Pokeball, props: { color: "var(--gb-green)", className: "w-14 h-14 bottom-[30%] left-[10%]" }, d: 1.2 },
        { C: Sparkle, props: { className: "w-10 h-10 top-[18%] right-[25%]" }, d: 0.4 },
        { C: Sparkle, props: { className: "w-8 h-8 bottom-[40%] right-[20%]" }, d: 1 },
        { C: PixelHeart, props: { className: "w-14 h-14 top-[35%] left-[18%] pixelated" }, d: 0.8 },
        { C: PixelHeart, props: { className: "w-10 h-10 bottom-[35%] right-[12%] pixelated" }, d: 1.4 },
      ].map(({ C, props, d }, i) => (
        <motion.div key={i} className={`absolute ${(props as any).className}`}
          animate={{ y: [0, -16, 0], rotate: [0, 6, -6, 0] }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: d }}>
          <C {...({ ...props, className: "w-full h-full" } as any)} />
        </motion.div>
      ))}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl w-full flex flex-col items-center">
        <div className="rpg-box rpg-box-lg p-6 sm:p-8 scanlines bg-white/95 backdrop-blur-sm">
          
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-pokedex-red border-2 border-ink" />
            <span className="w-3 h-3 rounded-full bg-poke-yellow border-2 border-ink" />
            <span className="w-3 h-3 rounded-full bg-gb-green border-2 border-ink" />
            <span className="font-pixel text-[10px] sm:text-xs ml-auto text-muted-foreground">Ch.01</span>
          </div>
          
          <p className="font-pixel text-xs sm:text-sm text-pokedex-red mb-3">! Encounter !</p>
          
          <h1 className="text-2xl sm:text-[2.5rem] font-extrabold leading-tight sm:leading-tight tracking-tight text-ink">
            A wild <span className="text-pokedex-red">Birthday</span> &{" "}
            <span className="text-water">Anniversary</span> appeared!
          </h1>
          
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Happy <span className="font-pixel text-gb-green-dark text-sm sm:text-base">Level Up</span>, Fadlan!
          </p>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a href="#catch" className="rpg-btn rpg-btn-red text-xs sm:text-sm px-6 py-3 text-center">▶ Begin Quest</a>
            <a href="#stats" className="rpg-btn rpg-btn-blue text-xs sm:text-sm px-6 py-3 text-center">Open Menu</a>
          </div>
        </div>

        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-6 font-pixel text-[10px] sm:text-xs text-ink bg-white/70 px-4 py-2 rounded-full border-2 border-ink shadow-sm backdrop-blur-sm inline-block">
          ▼ SCROLL DOWN
        </motion.div>
      </motion.div>
    </section>
  );
}   