import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, PixelHeart } from "@/components/svg/GameIcons";

// 10 Pesan bahasa Inggris yang natural dan santai
const REWARDS = [
  "Happy birthday & happy anniversary! Thanks for always being my safe place. 🏡❤️",
  "Another year older! Hopefully you'll be more patient with my random antics this year wkwk. 🎂✌️",
  "Happy anniversary! Out of everyone, I'm just really glad I got you as my partner. 🎮✨",
  "Thanks for always listening to my rants and being my #1 supporter. I love you! 🥰",
  "Let's keep leveling up together. I wouldn't want to do this with anyone else. 🚀",
  "If I had to pick a player 2 again, I'd pick you a thousand times over. You're the best! 🌟",
  "Whatever quests or challenges you're facing right now, just know I've always got your back. 💪❤️",
  "Happy level up! Sending you a virtual hug for now. Hope you achieve everything you want this year. 🎁🫂",
  "Crazy how far we've come. Here's to surviving more chaotic adventures together! 🥂",
  "You're my favorite notification and the best plot twist. Love you! 🌻"
];

export function EggGacha() {
  const [draws, setDraws] = useState(0);
  const [isHatched, setIsHatched] = useState(false);
  const [reward, setReward] = useState("");

  const maxDraws = 10;

  const handleTap = () => {
    if (isHatched || draws >= maxDraws) return;
    
    // Pilih ucapan acak
    const randomReward = REWARDS[Math.floor(Math.random() * REWARDS.length)];
    setReward(randomReward);
    setIsHatched(true);
    setDraws(prev => prev + 1);
  };

  const handleNext = () => {
    setIsHatched(false);
    setReward("");
  };

  const resetGame = () => {
    setDraws(0);
    setIsHatched(false);
    setReward("");
  };

  return (
    <section id="gacha" className="px-4 py-16 sm:py-20" style={{ background: "var(--paper)" }}>
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-10">
          <p className="font-pixel text-[10px] text-pokedex-red mb-2">// SPECIAL GACHA</p>
          <h2 className="font-pixel text-base sm:text-xl">Lucky Egg</h2>
          <p className="text-sm text-muted-foreground mt-2">Tap the egg to read a secret message from me. There are only 10!</p>
        </header>

        <div className="rpg-box p-8 bg-white flex flex-col items-center justify-center min-h-[400px]">
          {/* Tracker Sisa Gacha */}
          <div className="w-full flex justify-between mb-4 px-2 sm:px-4">
              <span className="font-pixel text-[10px] text-muted-foreground">ATTEMPTS</span>
              <span className="font-pixel text-[10px] text-pokedex-red">{draws} / {maxDraws}</span>
          </div>

          <AnimatePresence mode="wait">
            {!isHatched ? (
              <motion.div
                key="egg-stage"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(5px)" }}
                className="text-center"
              >
                {draws < maxDraws ? (
                  <>
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      onClick={handleTap}
                      className="cursor-pointer relative inline-block hover:scale-105 transition-transform"
                    >
                      <svg viewBox="0 0 100 120" className="w-32 h-40 sm:w-40 sm:h-52 drop-shadow-xl">
                        <path
                          d="M50 10 C20 10 10 50 10 80 C10 110 30 120 50 120 C70 120 90 110 90 80 C90 50 80 10 50 10 Z"
                          fill="#fff9e6"
                          stroke="var(--ink)"
                          strokeWidth="4"
                        />
                        <circle cx="35" cy="40" r="8" fill="var(--water)" opacity="0.4" />
                        <circle cx="65" cy="70" r="10" fill="var(--water)" opacity="0.4" />
                        <circle cx="30" cy="90" r="6" fill="var(--water)" opacity="0.4" />
                      </svg>
                    </motion.div>
                    <p className="font-pixel text-[10px] mt-8 blink text-water cursor-pointer" onClick={handleTap}>
                      TAP TO OPEN
                    </p>
                  </>
                ) : (
                    <div className="py-10">
                        <h3 className="font-pixel text-pokedex-red mb-4">Out of messages!</h3>
                        <p className="text-sm text-muted-foreground mb-6">You've read all 10 messages. Hope you liked them!</p>
                        <button onClick={resetGame} className="rpg-btn rpg-btn-yellow text-xs px-6 py-3">
                            ↻ Read them again
                        </button>
                    </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="reward-stage"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center w-full flex flex-col items-center"
              >
                <div className="flex justify-center gap-2 mb-4">
                  <Sparkle className="w-8 h-8 text-poke-yellow" />
                  <PixelHeart className="w-8 h-8 text-pokedex-red" />
                  <Sparkle className="w-8 h-8 text-poke-yellow" />
                </div>

                <h3 className="font-pixel text-sm sm:text-base text-ink mb-6">Message unlocked! 💌</h3>

                <div className="rpg-box-lg bg-blue-50 border-water p-6 mb-8 shadow-lg max-w-sm w-full">
                  <p className="font-pixel text-[9px] text-water mb-3 tracking-tighter">✨ SECRET MESSAGE ✨</p>
                  <p className="text-lg sm:text-xl font-bold text-ink leading-snug">
                    "{reward}"
                  </p>
                </div>

                {/* Teks screenshot sudah dihilangkan sepenuhnya di sini */}

                {draws < maxDraws ? (
                    <button
                      onClick={handleNext}
                      className="rpg-btn rpg-btn-green text-xs px-6 py-3 flex items-center gap-2"
                    >
                      ▶ Next message
                    </button>
                ) : (
                    <button
                      onClick={resetGame}
                      className="rpg-btn rpg-btn-yellow text-xs px-6 py-3 flex items-center gap-2 mt-4"
                    >
                      ↻ Read them again
                    </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}