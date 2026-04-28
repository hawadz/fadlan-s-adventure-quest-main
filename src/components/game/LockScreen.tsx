import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pokeball, PixelHeart, Sparkle } from "@/components/svg/GameIcons";

const PASSCODE = "290423";

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [stage, setStage] = useState<"title" | "pin" | "fading">("title");
  const [pin, setPin] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => { if (stage === "pin") inputs.current[0]?.focus(); }, [stage]);

  const handleChange = (i: number, v: string) => {
    const ch = v.replace(/\D/g, "").slice(-1);
    const next = [...pin]; next[i] = ch; setPin(next);
    if (ch && i < 5) inputs.current[i + 1]?.focus();
    if (next.every(c => c !== "")) submit(next.join(""));
  };

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const submit = (code: string) => {
    if (code === PASSCODE) {
      setStage("fading");
      setTimeout(() => onUnlock(), 900);
    } else {
      setError(true);
      setTimeout(() => { setError(false); setPin(Array(6).fill("")); inputs.current[0]?.focus(); }, 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className={`absolute inset-0 ${stage === "fading" ? "pixel-fade" : ""}`}
        style={{
          background: "linear-gradient(180deg, oklch(0.25 0.08 260) 0%, oklch(0.45 0.1 260) 60%, oklch(0.7 0.12 235) 100%)",
        }}
      >
        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="absolute bg-white" style={{
              width: 3, height: 3,
              top: `${(i * 53) % 100}%`,
              left: `${(i * 79) % 100}%`,
              opacity: 0.6 + ((i % 3) * 0.15),
              animation: `blink ${1 + (i % 5) * 0.3}s steps(2) infinite`,
            }} />
          ))}
        </div>

        {/* Floating decor */}
        <Pokeball className="absolute w-16 h-16 top-[12%] left-[10%] float-y" />
        <Pokeball color="var(--water)" className="absolute w-12 h-12 bottom-[18%] right-[12%] float-y" style={{ animationDelay: "1s" }} />
        <Sparkle className="absolute w-8 h-8 top-[20%] right-[20%] float-y" style={{ animationDelay: "0.5s" }} />
        <PixelHeart className="absolute w-12 h-12 bottom-[25%] left-[15%] float-y pixelated" style={{ animationDelay: "1.5s" }} />

        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 text-center">
          <AnimatePresence mode="wait">
            {stage === "title" && (
              <motion.div key="title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <motion.h1
                  className="font-pixel text-white text-3xl sm:text-5xl md:text-6xl leading-tight"
                  style={{ textShadow: "4px 4px 0 var(--ink)" }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Fadlan's<br />Adventure
                </motion.h1>
                <p className="font-pixel text-poke-yellow text-xs sm:text-sm mt-10 blink"
                   style={{ textShadow: "2px 2px 0 var(--ink)" }}>
                  ▶ Press Start to Play
                </p>
                <button
                  onClick={() => setStage("pin")}
                  className="rpg-btn rpg-btn-red mt-8 text-xs sm:text-sm"
                >
                  Start Game
                </button>
              </motion.div>
            )}

            {(stage === "pin" || stage === "fading") && (
              <motion.div key="pin" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className={`rpg-box rpg-box-lg w-full max-w-md p-6 sm:p-8 ${error ? "shake" : ""}`}>
                <p className="font-pixel text-[10px] sm:text-xs text-pokedex-red mb-3">// TRAINER LOGIN</p>
                <h2 className="font-pixel text-sm sm:text-base mb-2">Enter Passcode</h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Clue: Our Anniversary / Your Birthday
                </p>
                <div className="flex justify-center gap-2 sm:gap-3">
                  {pin.map((d, i) => (
                    <input
                      key={i}
                      ref={el => { inputs.current[i] = el; }}
                      value={d}
                      inputMode="numeric"
                      maxLength={1}
                      onChange={e => handleChange(i, e.target.value)}
                      onKeyDown={e => handleKey(i, e)}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center font-pixel text-lg bg-paper border-[3px] border-ink rounded-md focus:outline-none focus:ring-4 focus:ring-poke-yellow"
                      style={{ boxShadow: "var(--shadow-rpg-sm)" }}
                    />
                  ))}
                </div>
                {error && <p className="font-pixel text-[10px] text-pokedex-red mt-4">Wrong code! Try again.</p>}
                <p className="text-xs text-muted-foreground mt-6 font-pixel">Hint: 6 digits</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
