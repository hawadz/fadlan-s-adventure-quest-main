import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pokeball, PixelHeart, Sparkle } from "@/components/svg/GameIcons";

type Item = { id: number; x: number; y: number; type: "ball" | "heart" | "spark"; color?: string; popping?: boolean };

const TARGET = 10;
const colors = ["var(--pokedex-red)", "var(--water)", "var(--gb-green)", "var(--poke-yellow)"];

export function CatchGame({ onComplete }: { onComplete: () => void }) {
  const [items, setItems] = useState<Item[]>([]);
  const [caught, setCaught] = useState(0);
  const [done, setDone] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const idRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetGame = () => {
    setCaught(0);
    setDone(false);
    setShowLetter(false);
    setItems([]);
  };

  useEffect(() => {
    if (done) return;
    const spawn = () => {
      const types: Item["type"][] = ["ball", "ball", "ball", "heart", "spark"];

      // KUNCI: Buat 3 item baru sekaligus setiap kali fungsi ini dipanggil
      const newItems = Array.from({ length: 3 }).map(() => ({
        id: idRef.current++,
        x: 5 + Math.random() * 85, // Area X diperluas sedikit
        y: 10 + Math.random() * 70,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      // Gabungkan dengan item lama, tahan maksimal 10 item di layar
      setItems(prev => [...prev.slice(-7), ...newItems]);
    };

    spawn(); // Panggil sekali langsung di awal biar layar ga kosong
    const t = setInterval(spawn, 800); // Tiap 0.8 detik munculin 3 item baru
    return () => clearInterval(t);
  }, [done]);

  const handleCatch = (id: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, popping: true } : i));
    setTimeout(() => setItems(prev => prev.filter(i => i.id !== id)), 350);
    setCaught(c => {
      const next = c + 1;
      if (next >= TARGET) {
        setDone(true);
        setTimeout(() => setShowLetter(true), 400);
        onComplete();
      }
      return next;
    });
  };

  return (
    <section id="catch" className="px-4 py-16 sm:py-20" style={{ background: "var(--paper)" }}>
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-6">
          <p className="font-pixel text-[10px] text-pokedex-red mb-2">// MINI-GAME</p>
          <h2 className="font-pixel text-base sm:text-xl">Gotta Catch 'Em All</h2>
          <p className="text-sm text-muted-foreground mt-2">Tap ONLY the Pokéballs to catch them!</p>
        </header>

        <div className="rpg-box p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-pixel text-[10px]">CAUGHT</span>
            <span className="font-pixel text-xs text-pokedex-red">{caught} / {TARGET}</span>
          </div>
          <div className="stat-bar mb-4">
            <span style={{ width: `${(Math.min(caught, TARGET) / TARGET) * 100}%`, transition: "width 0.3s" }} />
          </div>

          <div ref={containerRef} className="relative w-full rounded-lg overflow-hidden border-[3px] border-ink"
            style={{ height: 360, background: "linear-gradient(180deg, var(--pastel-blue) 0%, oklch(0.92 0.08 145) 100%)" }}>
            <AnimatePresence>
              {items.map(it => {
                const isFake = it.type !== "ball";
                return (
                  <motion.div
                    key={it.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: isFake ? 0.6 : 1, y: [0, -15, 0] }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.3 } }}
                    style={{ position: "absolute", left: `${it.x}%`, top: `${it.y}%` }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 ${it.popping ? "pop" : ""} ${isFake ? "pointer-events-none cursor-default" : "cursor-pointer drop-shadow-lg z-10"}`}
                    onClick={() => {
                      if (!it.popping && !isFake) {
                        handleCatch(it.id);
                      }
                    }}
                  >
                    {it.type === "ball" && <Pokeball color={it.color} className="w-full h-full" />}
                    {it.type === "heart" && <PixelHeart className="w-full h-full pixelated" />}
                    {it.type === "spark" && <Sparkle className="w-full h-full" />}
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {done && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/60 backdrop-blur-sm z-20 gap-4">
                <p className="font-pixel text-poke-yellow text-sm sm:text-lg" style={{ textShadow: "3px 3px 0 var(--ink)" }}>
                  ★ COMPLETE ★
                </p>
                <button
                  onClick={resetGame}
                  className="rpg-btn rpg-btn-yellow mt-2 text-xs px-4 py-2"
                >
                  ↻ Play Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Level up modal */}
      <AnimatePresence>
        {showLetter && (
          <motion.div className="fixed inset-0 z-50 bg-ink/70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowLetter(false)}>
            <motion.div onClick={e => e.stopPropagation()}
              initial={{ scale: 0.7, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.7 }}
              className="rpg-box rpg-box-lg max-w-lg w-full p-6 sm:p-8 max-h-[88vh] overflow-y-auto">
              <p className="font-pixel text-[10px] text-poke-yellow bg-ink inline-block px-2 py-1 rounded">+1000 EXP</p>
              <h3 className="font-pixel text-base sm:text-xl mt-3">★ LEVEL UP! ★</h3>
              <p className="text-sm text-muted-foreground mt-2">A hidden letter has been unlocked.</p>

              <div className="mt-5 p-4 sm:p-5 border-[3px] border-ink rounded-lg bg-paper">
                <p className="font-pixel text-[10px] text-pokedex-red mb-3">// ANNIVERSARY LETTER</p>
                <p className="text-sm sm:text-base leading-relaxed">
                  Hai HEHEHE 💌<br /><br />
                  Happy 3nd Anniversary Sayang!! Thank you for making my life happier and brighter
                  every day. I’m so so soooo grateful to have you in my life hihi. I
                  hope your day always filled with love, laughter, and
                  everything that makes you smile yeay. I love you to the moon and back!<br /><br />
                  Happy birthday, happy anniversary - happy us. Here's to more side-quests, more
                  shared loot, and more unforgettable saves❤️
                </p>
              </div>

              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowLetter(false)} className="rpg-btn rpg-btn-green w-full">
                  ▶ Continue Adventure
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}