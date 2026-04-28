import { motion } from "framer-motion";
import { ElementIcon } from "@/components/svg/GameIcons";

const stats = [
  { name: "The way you exist",                                  value: "∞",         pct: 100, type: "fairy"    },
  { name: "How you listen",                                     value: "Lv. 99",    pct: 99,  type: "water"    },
  { name: "How you make ordinary days feel worth remembering",  value: "MAX",       pct: 100, type: "leaf"     },
  { name: "Your kindness",                                      value: "Super Eff.",pct: 100, type: "fairy"    },
  { name: "Your laugh",                                         value: "Critical+", pct: 100, type: "electric" },
  { name: "The way you try",                                    value: "Lv. 98",    pct: 98,  type: "fire"     },
  { name: "How you care deeply",                                value: "MAX",       pct: 100, type: "water"    },
  { name: "Your presence",                                      value: "Lv. 99",    pct: 99,  type: "psychic"  },
  { name: "The future with you",                                value: "∞",         pct: 100, type: "leaf"     },
  { name: "You, not for who you should be, but who you are",    value: "MAX",       pct: 100, type: "psychic"  },
] as const;

export function Stats() {
  return (
    <section id="stats" className="px-4 py-16 sm:py-20" style={{ background: "var(--paper)" }}>
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <p className="font-pixel text-sm text-pokedex-red mb-2">{"// MENU > STATS"}</p>
          <h2 className="font-pixel text-xl sm:text-3xl">10 Things I Love</h2>
          <p className="text-base text-muted-foreground mt-3">Player profile · Trainer Fadlan</p>
        </header>

        <div className="rpg-box rpg-box-lg p-5 sm:p-8">
          <div className="flex items-center gap-4 pb-5 mb-6 border-b-[4px] border-ink">
            <div className="w-16 h-16 rounded-full border-[4px] border-ink bg-poke-yellow grid place-items-center font-pixel text-xl sm:text-2xl">F</div>
            <div className="flex-1">
              <p className="font-pixel text-sm sm:text-base mb-1">FADLAN</p>
              <p className="text-sm sm:text-base text-muted-foreground">Class: Beloved · Lv. ↑</p>
            </div>
            <span className="font-pixel text-xs sm:text-sm text-pokedex-red">EXP ▰▰▰▰▰</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="border-[3px] border-ink rounded-lg p-4 bg-paper flex items-center gap-4"
                style={{ boxShadow: "var(--shadow-rpg-sm)" }}>
                
                <div className="w-12 h-12 shrink-0"><ElementIcon type={s.type as any} /></div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
                    {/* Teks panjang sekarang punya ukuran font lebih besar dan line-height yang nyaman dibaca */}
                    <p className="font-pixel text-[11px] sm:text-xs leading-relaxed text-ink">{s.name}</p>
                    <p className="font-pixel text-xs sm:text-sm text-pokedex-red whitespace-nowrap shrink-0">{s.value}</p>
                  </div>
                  <div className="stat-bar mt-3">
                    <motion.span initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }}
                      viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 + i * 0.04 }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}