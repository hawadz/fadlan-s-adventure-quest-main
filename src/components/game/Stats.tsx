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
          <p className="font-pixel text-[10px] text-pokedex-red mb-2">{"// MENU > STATS"}</p>
          <h2 className="font-pixel text-base sm:text-xl">10 Things I Love</h2>
          <p className="text-sm text-muted-foreground mt-2">Player profile · Trainer Fadlan</p>
        </header>

        <div className="rpg-box rpg-box-lg p-4 sm:p-6">
          <div className="flex items-center gap-3 pb-4 mb-4 border-b-[3px] border-ink">
            <div className="w-12 h-12 rounded-full border-[3px] border-ink bg-poke-yellow grid place-items-center font-pixel text-sm">F</div>
            <div className="flex-1">
              <p className="font-pixel text-xs">FADLAN</p>
              <p className="text-xs text-muted-foreground">Class: Beloved · Lv. ↑</p>
            </div>
            <span className="font-pixel text-[10px] text-pokedex-red">EXP ▰▰▰▰▰</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {stats.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="border-[3px] border-ink rounded-lg p-3 bg-paper flex items-center gap-3"
                style={{ boxShadow: "var(--shadow-rpg-sm)" }}>
                <div className="w-9 h-9 shrink-0"><ElementIcon type={s.type as any} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    {/* Hapus class truncate agar teks panjang bisa wrap ke bawah, tambahkan leading-snug */}
                    <p className="font-pixel text-[9px] sm:text-[10px] leading-snug">{s.name}</p>
                    <p className="font-pixel text-[10px] text-pokedex-red whitespace-nowrap shrink-0">{s.value}</p>
                  </div>
                  <div className="stat-bar mt-2">
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