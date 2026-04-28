import { motion } from "framer-motion";
import { ElementIcon } from "@/components/svg/GameIcons";

const stats = [
  { name: "Kindness",   value: "MAX",        pct: 100, type: "fairy"   },
  { name: "Humor",      value: "Lv. 99",     pct: 99,  type: "electric"},
  { name: "Patience",   value: "Lv. 96",     pct: 96,  type: "leaf"    },
  { name: "Smile",      value: "Critical+",  pct: 100, type: "fire"    },
  { name: "Loyalty",    value: "Lv. 100",    pct: 100, type: "water"   },
  { name: "Curiosity",  value: "Lv. 92",     pct: 92,  type: "psychic" },
  { name: "Style",      value: "Lv. 95",     pct: 95,  type: "fairy"   },
  { name: "Hugs",       value: "Super Eff.", pct: 98,  type: "fire"    },
  { name: "Brainpower", value: "Lv. 97",     pct: 97,  type: "electric"},
  { name: "Heart",      value: "∞",          pct: 100, type: "water"   },
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
              <motion.div key={s.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="border-[3px] border-ink rounded-lg p-3 bg-paper flex items-center gap-3"
                style={{ boxShadow: "var(--shadow-rpg-sm)" }}>
                <div className="w-9 h-9 shrink-0"><ElementIcon type={s.type as any} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-pixel text-[11px] truncate">{s.name}</p>
                    <p className="font-pixel text-[10px] text-pokedex-red">{s.value}</p>
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
