import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import vnAudio from "@/assets/hayo.mp3"; 

const BUTTONS = [
  { id: 0, color: "bg-red-500", shadow: "shadow-red-700", freq: 261.63 },   // C4
  { id: 1, color: "bg-blue-500", shadow: "shadow-blue-700", freq: 329.63 },  // E4
  { id: 2, color: "bg-yellow-400", shadow: "shadow-yellow-600", freq: 392.00 }, // G4
  { id: 3, color: "bg-green-500", shadow: "shadow-green-700", freq: 523.25 }, // C5
];

const MAX_LEVEL = 5;

export function SecretAudio() {
  const [phase, setPhase] = useState<"intro" | "demonstrating" | "playing" | "won" | "lost">("intro");
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [activeBtn, setActiveBtn] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Fungsi untuk menghasilkan suara 8-bit
  const playTone = (freq: number, duration: number = 0.4) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square'; 
    osc.frequency.value = freq;
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
  };

  const startLevel = (currentLevel: number) => {
    const seqLength = currentLevel + 2; 
    const newSeq = Array.from({ length: seqLength }, () => Math.floor(Math.random() * 4));
    setSequence(newSeq);
    setPlayerIndex(0);
    playSequence(newSeq, currentLevel);
  };

  const startGame = () => {
    setLevel(1);
    startLevel(1);
  };

  const playSequence = async (seq: number[], currentLevel: number) => {
    setPhase("demonstrating");
    
    const speedMultiplier = Math.max(0.4, 1 - (currentLevel * 0.1)); 
    const toneDuration = 500 * speedMultiplier;
    const gapDuration = 200 * speedMultiplier;

    await new Promise(r => setTimeout(r, 800)); 

    for (let i = 0; i < seq.length; i++) {
      setActiveBtn(seq[i]);
      playTone(BUTTONS[seq[i]].freq, toneDuration / 1000);
      await new Promise(r => setTimeout(r, toneDuration));
      setActiveBtn(null);
      await new Promise(r => setTimeout(r, gapDuration)); 
    }
    
    setPhase("playing");
  };

  const handleTap = (id: number) => {
    if (phase !== "playing") return;

    setActiveBtn(id);
    playTone(BUTTONS[id].freq);
    setTimeout(() => setActiveBtn(null), 200);

    if (id !== sequence[playerIndex]) {
      setPhase("lost");
      return;
    }

    const nextIndex = playerIndex + 1;
    if (nextIndex === sequence.length) {
      if (level === MAX_LEVEL) {
        setTimeout(() => setPhase("won"), 600); 
      } else {
        setPhase("demonstrating"); 
        setTimeout(() => {
          setLevel(level + 1);
          startLevel(level + 1);
        }, 1000);
      }
    } else {
      setPlayerIndex(nextIndex);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="secret-audio" className="px-4 py-16 sm:py-20" style={{ background: "var(--paper)" }}>
      <div className="max-w-2xl mx-auto text-center">
        <header className="mb-8">
          <p className="font-pixel text-sm text-poke-yellow mb-2 drop-shadow-md">// MYSTIC ARTIFACT //</p>
          <h2 className="font-pixel text-xl sm:text-3xl text-ink">The Poké Flute</h2>
        </header>

        <div className="rpg-box bg-[#f8f9fa] border-[6px] border-ink p-6 sm:p-10 shadow-2xl relative min-h-[400px] flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            {phase === "intro" && (
              <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="text-6xl mb-6">🎵</div>
                <h3 className="font-pixel text-lg sm:text-xl text-ink mb-4">A secret melody!</h3>
                <p className="text-base text-muted-foreground mb-8 max-w-md mx-auto">
                  A hidden voice message is locked behind this ancient artifact. 
                  Listen carefully and repeat the sequence perfectly across 5 levels to unlock it!
                </p>
                <button onClick={startGame} className="rpg-btn rpg-btn-blue text-sm px-10 py-4 w-full sm:w-auto">
                  ▶ AWAKEN MELODY
                </button>
              </motion.div>
            )}

            {(phase === "demonstrating" || phase === "playing") && (
              <motion.div key="game" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex justify-between items-center mb-6">
                  <p className="font-pixel text-sm text-ink">LEVEL {level}/{MAX_LEVEL}</p>
                  <p className={`font-pixel text-xs ${phase === "demonstrating" ? "text-pokedex-red blink" : "text-green-600"}`}>
                    {phase === "demonstrating" ? "> MEMORIZE..." : "> PLAY IT BACK!"}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 max-w-[300px] mx-auto mb-6">
                  {BUTTONS.map((btn) => (
                    <motion.button
                      key={btn.id}
                      onClick={() => handleTap(btn.id)}
                      disabled={phase !== "playing"}
                      animate={activeBtn === btn.id ? { scale: 0.95, filter: "brightness(1.3)" } : { scale: 1 }}
                      className={`aspect-square rounded-full border-[6px] border-ink ${btn.color} shadow-[0_8px_0_var(--ink)] active:shadow-[0_0px_0_var(--ink)] active:translate-y-[8px] transition-all duration-100 flex items-center justify-center`}
                    >
                      {activeBtn === btn.id && (
                         <span className="text-white text-4xl font-bold drop-shadow-md">♪</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === "lost" && (
              <motion.div key="lost" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="text-6xl mb-6 grayscale">🎶</div>
                <h3 className="font-pixel text-lg sm:text-xl text-pokedex-red mb-4">WRONG NOTE!</h3>
                <p className="text-base text-muted-foreground mb-8">
                  You messed up at Level {level}. The artifact went silent. You have to start over!
                </p>
                <button onClick={startGame} className="rpg-btn rpg-btn-yellow text-sm px-10 py-4">
                  ↻ RESTART FROM LEVEL 1
                </button>
              </motion.div>
            )}

            {phase === "won" && (
              <motion.div key="won" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full">
                <div className="text-center mb-8">
                  <span className="text-4xl">🔓</span>
                  <p className="font-pixel text-sm sm:text-base text-green-600 mt-4 leading-relaxed">
                    The secret melody has awakened a hidden message!
                  </p>
                </div>
                
                <div className="bg-[#e0e0e0] border-4 border-gray-500 p-4 sm:p-6 rounded-md shadow-lg w-full max-w-md mx-auto mb-8 relative">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-4 bg-gray-400/30 rounded-full" />
                  
                  <div className="bg-ink h-28 w-full mt-6 rounded border-[4px] border-gray-600 flex justify-center items-center gap-10 relative overflow-hidden">
                    <div className="absolute top-0 w-full h-full opacity-20 bg-[radial-gradient(circle,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:4px_4px]" />
                    
                    <motion.div animate={isPlaying ? { rotate: 360 } : {}} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-14 h-14 bg-gray-800 rounded-full border-[3px] border-gray-500 flex items-center justify-center relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute top-1.5" />
                      <div className="w-3 h-3 bg-white rounded-full absolute bottom-1.5" />
                      <div className="w-4 h-4 bg-gray-400 rounded-full" />
                    </motion.div>

                    <motion.div animate={isPlaying ? { rotate: 360 } : {}} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-14 h-14 bg-gray-800 rounded-full border-[3px] border-gray-500 flex items-center justify-center relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute top-1.5" />
                      <div className="w-3 h-3 bg-white rounded-full absolute bottom-1.5" />
                      <div className="w-4 h-4 bg-gray-400 rounded-full" />
                    </motion.div>
                  </div>

                  <div className="bg-white px-3 py-2 border-[3px] border-gray-400 mt-5 text-center shadow-inner">
                    <p className="font-pixel text-xs sm:text-sm text-ink">From: Player 1 🩷</p>
                  </div>
                </div>

                <audio ref={audioRef} src={vnAudio} onEnded={() => setIsPlaying(false)} />

                <button 
                  onClick={toggleAudio}
                  className="w-full max-w-md mx-auto border-[4px] border-ink bg-white hover:bg-gray-100 font-pixel text-sm py-4 transition-colors flex justify-center items-center gap-3 shadow-[6px_6px_0_var(--ink)] active:shadow-none active:translate-y-[6px] active:translate-x-[6px]"
                >
                  {isPlaying ? (
                    <><span>⬛</span> PAUSE TAPE</>
                  ) : (
                    <><span>▶</span> PLAY TAPE</>
                  )}
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}