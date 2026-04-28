import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Potion, MasterBall } from "@/components/svg/GameIcons";

function ExpShare() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="8" y="14" width="48" height="36" rx="4" fill="var(--poke-yellow)" stroke="var(--ink)" strokeWidth="3" />
      <rect x="12" y="18" width="40" height="20" fill="white" stroke="var(--ink)" strokeWidth="2" />
      <text x="32" y="32" textAnchor="middle" fontFamily="Press Start 2P" fontSize="7" fill="var(--ink)">EXP</text>
      <circle cx="20" cy="44" r="3" fill="var(--pokedex-red)" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="44" cy="44" r="3" fill="var(--pokedex-red)" stroke="var(--ink)" strokeWidth="2" />
      <path d="M22 44 L42 44" stroke="var(--ink)" strokeWidth="2" />
    </svg>
  );
}

const items = [
  {
    title: "Love Potion",
    tag: "Restores HP +∞",
    icon: <Potion color="var(--pokedex-red)" />,
    color: "var(--pokedex-red)",
    reveal: "Just a reminder that whenever you're tired or having a bad day, you can always come to me. I'm always here for you! ❤️",
  },
  {
    title: "Exp Share",
    tag: "Level Up Together",
    icon: <ExpShare />,
    color: "var(--poke-yellow)",
    reveal: "Whatever you're going through, you don't have to face it alone. Let's figure things out together! 🎮",
  },
  {
    title: "Master Ball",
    tag: "100% Catch Rate",
    icon: <MasterBall />,
    color: "oklch(0.55 0.22 300)",
    reveal: "Thank you for staying with me through everything. Happy Anniversary sayang! ✨",
  },
];

export function Inventory() {
  const [open, setOpen] = useState<number | null>(null);
  const item = open !== null ? items[open] : null;

  return (
    <section className="px-4 py-16 sm:py-20" style={{ background: "linear-gradient(180deg, var(--muted) 0%, var(--paper) 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <p className="font-pixel text-sm text-pokedex-red mb-3">// BAG</p>
          <h2 className="font-pixel text-xl sm:text-3xl">Inventory</h2>
          <p className="text-base text-muted-foreground mt-3">Tap an item to read its description.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.button
              key={it.title}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.97 }}
              className="rpg-box p-6 text-left flex flex-col items-center gap-4"
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 grid place-items-center"
                style={{ filter: "drop-shadow(4px 4px 0 var(--ink))" }}>
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} className="w-full h-full">
                  {it.icon}
                </motion.div>
              </div>
              <div className="text-center w-full mt-2">
                <h3 className="font-pixel text-sm sm:text-base">{it.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{it.tag}</p>
                <span className="inline-block mt-5 rpg-btn rpg-btn-blue px-5 py-3 text-xs sm:text-sm">▶ Inspect</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {item && (
          <motion.div className="fixed inset-0 z-50 bg-ink/70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}>
            <motion.div onClick={e => e.stopPropagation()}
              initial={{ scale: 0.7, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.7 }}
              className="rpg-box rpg-box-lg max-w-lg w-full p-8">
              <div className="flex items-center gap-5">
                <div className="w-24 h-24 shrink-0">{item.icon}</div>
                <div>
                  <p className="font-pixel text-xs text-pokedex-red">// ITEM INFO</p>
                  <h3 className="font-pixel text-base sm:text-xl mt-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mt-1">{item.tag}</p>
                </div>
              </div>
              <div className="mt-6 p-5 border-[3px] border-ink rounded-lg bg-paper">
                <p className="text-base sm:text-lg leading-relaxed">{item.reveal}</p>
              </div>
              <button onClick={() => setOpen(null)} className="rpg-btn rpg-btn-green mt-6 w-full text-sm py-4">▶ Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}