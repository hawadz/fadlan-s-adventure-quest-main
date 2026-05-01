import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, PixelHeart } from "@/components/svg/GameIcons";

const REWARDS = [
  "Happy birthday & happy anniversary sayang! love you to the moon and back! 🌙💫",
  "Another year older! Hopefully you'll be more patient with me this year hehe 🎂✌️",
  "Happy anniversary ya hehe, thank you for loving me ❤️",
  "Thanks for always listening to my rants and being my #1 supporter ❤️",
  "Happy birthday once again! I hope all your wishes come true. I'll always be cheering for you! 🥳🎉",
  "Thank you for being the best partner ever. Love you more than you know! ✨❤️",
  "Wishing you the happiest birthday! Semoga apa yang kamu harapkan cepat terkabul ya! 🎂🎁",
  "Can't wait to celebrate more birthdays and anniversaries with you 🎂✨",
  "If I could do it all over again, I'd pick you a thousand times over.",
  "Thank you for always making my days brighter! 🌻"
];

export function EggGacha() {
  const [draws, setDraws] = useState(0);
  const [isHatched, setIsHatched] = useState(false);
  const [reward, setReward] = useState("");
  const [availableRewards, setAvailableRewards] = useState([...REWARDS]);

  const maxDraws = REWARDS.length;

  const handleTap = () => {
    if (isHatched || draws >= maxDraws || availableRewards.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableRewards.length);
    const selectedReward = availableRewards[randomIndex];

    setReward(selectedReward);
    setIsHatched(true);
    setDraws(prev => prev + 1);
    
    setAvailableRewards(prev => prev.filter((_, index) => index !== randomIndex));
  };

  const handleNext = () => {
    setIsHatched(false);
    setReward("");
  };

  const resetGame = () => {
    setDraws(0);
    setIsHatched(false);
    setReward("");
    setAvailableRewards([...REWARDS]);
  };

  return (
    <section id="gacha" className="px-4 py-16 sm:py-20" style={{ background: "var(--paper)" }}>
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-10">
          <p className="font-pixel text-sm text-pokedex-red mb-2">// SPECIAL GACHA</p>
          <h2 className="font-pixel text-xl sm:text-3xl">Lucky Egg</h2>
          <p className="text-base text-muted-foreground mt-3">Tap the egg to read a secret message from me. There are only 10!</p>
        </header>

        <div className="rpg-box p-8 bg-white flex flex-col items-center justify-center min-h-[450px]">
          <div className="w-full flex justify-between mb-6 px-2 sm:px-4">
            <span className="font-pixel text-xs sm:text-sm text-muted-foreground">ATTEMPTS</span>
            <span className="font-pixel text-xs sm:text-sm text-pokedex-red">{draws} / {maxDraws}</span>
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
                      <svg viewBox="0 0 100 120" className="w-40 h-52 sm:w-56 sm:h-72 drop-shadow-2xl">
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
                    <p className="font-pixel text-sm sm:text-base mt-10 blink text-water cursor-pointer" onClick={handleTap}>
                      TAP TO OPEN
                    </p>
                  </>
                ) : (
                  <div className="py-10">
                    <h3 className="font-pixel text-xl sm:text-2xl text-pokedex-red mb-4">Out of messages!</h3>
                    <p className="text-base text-muted-foreground mb-8">You've read all 10 messages. Hope you liked them!</p>
                    <button onClick={resetGame} className="rpg-btn rpg-btn-yellow text-sm px-8 py-4">
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
                <div className="flex justify-center gap-3 mb-6">
                  <Sparkle className="w-12 h-12 text-poke-yellow" />
                  <PixelHeart className="w-12 h-12 text-pokedex-red" />
                  <Sparkle className="w-12 h-12 text-poke-yellow" />
                </div>

                <h3 className="font-pixel text-lg sm:text-xl text-ink mb-6">Message unlocked! 💌</h3>

                <div className="rpg-box-lg bg-blue-50 border-water p-8 mb-8 shadow-lg max-w-sm w-full">
                  <p className="font-pixel text-xs text-water mb-4 tracking-tighter">✨ SECRET MESSAGE ✨</p>
                  <p className="text-xl sm:text-2xl font-bold text-ink leading-relaxed">
                    "{reward}"
                  </p>
                </div>

                {draws < maxDraws ? (
                  <button
                    onClick={handleNext}
                    className="rpg-btn rpg-btn-green text-sm px-8 py-4 flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    ▶ Next message
                  </button>
                ) : (
                  <button
                    onClick={resetGame}
                    className="rpg-btn rpg-btn-yellow text-sm px-8 py-4 flex items-center justify-center gap-2 mt-4 w-full sm:w-auto"
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