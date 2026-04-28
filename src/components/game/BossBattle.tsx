import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, PixelHeart } from "@/components/svg/GameIcons";

// Import real photos for the avatars
import imgFadlan from "@/assets/yeh.png"; 
import imgHawa from "@/assets/grump.png"; 

// Dynamic skills for Fadlan (shuffled every turn)
const ALL_ACTIONS = [
  { id: 1, name: "💬 Call Her Pretty", type: "attack", val: 25, msg: "Fadlan called Hawa pretty today. She's blushing a bit! (-25 Anger)" },
  { id: 2, name: "🩹 Apologize", type: "heal", val: 30, msg: "Fadlan gave the puppy dog eyes and apologized. Recovered 30 HP!" },
  { id: 3, name: "🍜 Buy Seblak", type: "attack", val: 40, msg: "Fadlan ordered Level 5 Seblak! It's super effective! (-40 Anger)" },
  { id: 4, name: "🍵 Buy Iced Matcha", type: "attack", val: 35, msg: "Iced Matcha secured! Hawa's mood improved instantly. (-35 Anger)" },
  // Ini yang diubah: Call langsung dan Ajak jalan
  { id: 5, name: "📞 Call Her Right Away", type: "heal", val: 25, msg: "Fadlan called her directly just to hear her voice. Recovered 25 HP!" },
  { id: 6, name: "🚗 Take Her Out", type: "attack", val: 30, msg: "Fadlan took her out on a spontaneous date. She can't stay mad! (-30 Anger)" },
  { id: 7, name: "🤣 Send Cat Memes", type: "attack", val: 20, msg: "Fadlan sent a funny cat meme. Hawa is trying not to laugh. (-20 Anger)" },
  { id: 8, name: "🤞 Promise Her", type: "heal", val: 20, msg: "Fadlan promised not to do it again. Recovered 20 HP!" },
];

// Boss Hawa's attacks
const BOSS_ATTACKS = [
  { msg: "Hawa said 'Terserah'. Emotional damage! (-25 HP)", dmg: 25 },
  { msg: "Hawa gave the silent treatment for an hour... Ouch! (-15 HP)", dmg: 15 },
  { msg: "Hawa brought up something from last month! CRITICAL HIT! (-35 HP)", dmg: 35 },
  { msg: "Hawa replied with just 'OK'. (-15 HP)", dmg: 15 },
  { msg: "Hawa gave the deadly death stare. (-20 HP)", dmg: 20 },
];

export function BossBattle({ onComplete }: { onComplete: () => void }) {
  const [playerHp, setPlayerHp] = useState(100);
  const [bossHp, setBossHp] = useState(100);
  const [turn, setTurn] = useState<"player" | "boss" | "end">("player");
  const [log, setLog] = useState("A wild GRUMPY HAWA appeared!");
  const [isBossShaking, setIsBossShaking] = useState(false);
  const [isPlayerShaking, setIsPlayerShaking] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [isDefeated, setIsDefeated] = useState(false);
  
  const [currentActions, setCurrentActions] = useState<typeof ALL_ACTIONS>([]);

  const shuffleActions = () => {
    const shuffled = [...ALL_ACTIONS].sort(() => 0.5 - Math.random());
    setCurrentActions(shuffled.slice(0, 3)); 
  };

  useEffect(() => {
    shuffleActions();
  }, []);

  const handlePlayerAction = (action: typeof ALL_ACTIONS[0]) => {
    if (turn !== "player" || isDefeated) return;

    setLog(action.msg);

    if (action.type === "attack") {
      takeBossDamage(action.val);
    } else {
      setPlayerHp((prev) => Math.min(100, prev + action.val));
      setTurn("boss");
    }
  };

  const takeBossDamage = (damage: number) => {
    setIsBossShaking(true);
    setTimeout(() => setIsBossShaking(false), 300);
    
    setBossHp((prev) => {
      const nextHp = Math.max(0, prev - damage);
      if (nextHp === 0) setTurn("end");
      else setTurn("boss");
      return nextHp;
    });
  };

  // Boss Turn Logic
  useEffect(() => {
    if (turn === "boss" && bossHp > 0) {
      const timer = setTimeout(() => {
        const move = BOSS_ATTACKS[Math.floor(Math.random() * BOSS_ATTACKS.length)];
        setLog(move.msg);
        
        setIsPlayerShaking(true);
        setTimeout(() => setIsPlayerShaking(false), 300);

        setPlayerHp((prev) => {
          const nextHp = Math.max(0, prev - move.dmg);
          if (nextHp === 0) {
            setTimeout(() => {
              setLog("Fadlan's HP dropped to 0... But Hawa felt bad and revived you!");
              setPlayerHp(50);
            }, 1500);
          }
          return nextHp;
        });

        setTimeout(() => {
          setTurn("player");
          shuffleActions();
        }, 1000);
        
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [turn, bossHp]);

  // Win Logic
  useEffect(() => {
    if (bossHp === 0 && !isDefeated) {
      const winSequence = async () => {
        setLog("Hawa's Anger Meter reached 0! The grumpy mode has been tamed!");
        setTimeout(() => {
          setShowFlash(true);
          setTimeout(() => {
            setIsDefeated(true);
            setShowFlash(false);
            onComplete();
          }, 1500);
        }, 1500);
      };
      winSequence();
    }
  }, [bossHp, isDefeated, onComplete]);

  const resetBattle = () => {
    setPlayerHp(100);
    setBossHp(100);
    setTurn("player");
    setIsDefeated(false);
    setLog("A wild GRUMPY HAWA appeared!");
    shuffleActions();
  };

  const getHpColor = (hp: number) => {
    if (hp > 50) return "bg-green-500";
    if (hp > 20) return "bg-yellow-400";
    return "bg-red-500";
  };

  return (
    // Background diubah jadi var(--paper)
    <section id="boss-battle" className="px-4 py-16 sm:py-20 relative" style={{ background: "var(--paper)" }}>
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white z-50"
          />
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <p className="font-pixel text-[10px] text-pokedex-red mb-2">// FINAL STAGE</p>
          {/* Teks diubah jadi text-ink agar kelihatan di background putih */}
          <h2 className="font-pixel text-base sm:text-xl text-ink">Boss Battle!</h2>
        </header>

        <AnimatePresence mode="wait">
          {!isDefeated ? (
            <motion.div 
              key="battle-screen"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="rpg-box bg-[#e0f7fa] border-[6px] border-ink p-4 sm:p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#e0f7fa] to-[#c8e6c9] opacity-70 pointer-events-none" />

              <div className="relative z-10">
                {/* === BOSS HAWA AREA (Top Right) === */}
                <div className="flex justify-between items-start mb-12">
                  <div className="w-1/2 max-w-[220px] border-[3px] border-ink p-2 sm:p-3 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-md">
                    <h3 className="font-pixel text-[10px] sm:text-xs mb-1">GRUMPY HAWA</h3>
                    <p className="text-[9px] text-muted-foreground mb-1">Anger Meter</p>
                    <div className="w-full h-3 bg-gray-200 border-2 border-ink rounded-full overflow-hidden p-[1px]">
                      <motion.div 
                        className={`h-full rounded-full ${getHpColor(bossHp)}`}
                        animate={{ width: `${bossHp}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <motion.div
                    animate={isBossShaking ? { x: [-10, 10, -10, 10, 0], filter: "brightness(2)" } : { y: [0, -5, 0] }}
                    transition={isBossShaking ? { duration: 0.3 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[4px] border-white shadow-xl overflow-hidden bg-white mr-2 sm:mr-4"
                  >
                    <img src={imgHawa} alt="Boss Hawa" className="w-full h-full object-cover" />
                  </motion.div>
                </div>

                {/* === PLAYER FADLAN AREA (Bottom Left) === */}
                <div className="flex justify-between items-end mb-6">
                  <motion.div
                    animate={isPlayerShaking ? { x: [-10, 10, -10, 10, 0], filter: "contrast(1.5) sepia(1)" } : {}}
                    transition={{ duration: 0.4 }}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[4px] border-white shadow-xl overflow-hidden bg-white ml-2 sm:ml-4"
                  >
                    <img src={imgFadlan} alt="Player Fadlan" className="w-full h-full object-cover" />
                  </motion.div>

                  <div className="w-1/2 max-w-[220px] border-[3px] border-ink p-2 sm:p-3 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-md">
                    <h3 className="font-pixel text-[10px] sm:text-xs mb-1">FADLAN</h3>
                    <div className="flex justify-between items-end mb-1">
                      <p className="text-[9px] text-muted-foreground">Health Points</p>
                      <p className="font-pixel text-[10px]">{playerHp}/100</p>
                    </div>
                    <div className="w-full h-3 bg-gray-200 border-2 border-ink rounded-full overflow-hidden p-[1px]">
                      <motion.div 
                        className={`h-full rounded-full ${getHpColor(playerHp)}`}
                        animate={{ width: `${playerHp}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </div>

                {/* === UI BOTTOM MENU === */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-[3px] border-ink bg-white p-2 rounded-lg shadow-md">
                  <div className="p-3 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center min-h-[80px]">
                    <p className="font-pixel text-[9px] sm:text-[10px] text-ink leading-relaxed text-center">
                      {log}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {turn === "boss" ? (
                      <div className="flex items-center justify-center h-full bg-gray-100 border-2 border-ink rounded">
                        <p className="font-pixel text-[10px] blink text-pokedex-red">Waiting for Boss's move...</p>
                      </div>
                    ) : (
                      currentActions.map((action) => (
                        <button 
                          key={action.id}
                          onClick={() => handlePlayerAction(action)}
                          className="border-2 border-ink bg-white hover:bg-yellow-50 font-pixel text-[9px] sm:text-[10px] py-2 px-3 text-left transition-colors flex justify-between items-center rounded"
                        >
                          <span>{action.name}</span>
                          <span className="text-gray-400 text-[8px]">{action.type === 'attack' ? '⚔️' : '🩹'}</span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="victory-screen"
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="rpg-box bg-white p-8 text-center shadow-2xl border-[6px] border-yellow-400"
            >
              <div className="flex justify-center gap-3 mb-6">
                <Sparkle className="w-10 h-10 text-poke-yellow" />
                <PixelHeart className="w-10 h-10 text-pokedex-red" />
                <Sparkle className="w-10 h-10 text-poke-yellow" />
              </div>
              
              <h2 className="font-pixel text-xl sm:text-2xl text-ink leading-relaxed mb-4">
                YOU SAVED THE WORLD! <br/>
                <span className="text-pokedex-red text-base sm:text-lg">(And my heart)</span>
              </h2>
              
              <p className="text-sm text-muted-foreground mb-8">
                Grumpy Hawa has been successfully tamed. You earned 9999 EXP and a lifetime partner!
              </p>

              <div className="inline-block border-4 border-yellow-400 bg-yellow-50 p-4 mb-8 rotate-2 shadow-md">
                <p className="font-pixel text-xs text-yellow-700 mb-2">🏆 ACHIEVEMENT UNLOCKED</p>
                <p className="font-bold text-ink">Best Boyfriend of The Year</p>
              </div>

              <button 
                onClick={resetBattle} 
                className="rpg-btn rpg-btn-yellow text-xs px-6 py-3 w-full sm:w-auto mx-auto block"
              >
                ↻ Play Again 
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}