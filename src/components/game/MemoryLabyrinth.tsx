import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle } from "@/components/svg/GameIcons";

import imgFadlan from "@/assets/yeh.png";
import imgHawa from "@/assets/grump.png";

import imgMem1 from "@/assets/memory-4.jpg";
import imgMem2 from "@/assets/memory-2.png";
import imgMem3 from "@/assets/memory-3.jpg";
import imgMem4 from "@/assets/memory-1.jpg";
import imgMem5 from "@/assets/memory-5.jpg";

const MAZE = [
    [0, 0, 0, 1, 0, 0],
    [1, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [1, 1, 1, 0, 0, 0]
];

const MEMORIES = [

    { id: 1, x: 2, y: 0, title: "FIrst Birthday Surprises", text: "Gift kecil kecilan padahal baru seminggu jadian HAHA 🎁", img: imgMem1 },

    { id: 2, x: 0, y: 4, title: "Antar-Jemput Kampus", text: "Dulu sering banget jemput ke kampus anter ke kampus hehe 🛵💨", img: imgMem2 },

    { id: 3, x: 5, y: 0, title: "FIst JoOob", text: "The first time seeing you botak HAHA 👨🏻‍🦲", img: imgMem3 },

    { id: 4, x: 3, y: 4, title: "Our First Photo", text: "Pertama kali kita foto bareng. i'm so ugly ew! 🫣", img: imgMem4 },

    { id: 5, x: 4, y: 5, title: "Unforgetable Moment", text: "Pertama kali bukber & first time holding hands. Felt so many butterflies hahaha! 🦋", img: imgMem5 },

];

export function MemoryLabyrinth() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [collected, setCollected] = useState<number[]>([]);
    const [popup, setPopup] = useState<typeof MEMORIES[0] | null>(null);
    const [showWarning, setShowWarning] = useState(false);
    const [isWon, setIsWon] = useState(false);

    const move = (dx: number, dy: number) => {
        if (popup || isWon) return;

        const nx = pos.x + dx;
        const ny = pos.y + dy;

        if (nx >= 0 && nx < 6 && ny >= 0 && ny < 6 && MAZE[ny][nx] === 0) {
            setPos({ x: nx, y: ny });

            const mem = MEMORIES.find(m => m.x === nx && m.y === ny);
            if (mem && !collected.includes(mem.id)) {
                setPopup(mem);
                setCollected(prev => [...prev, mem.id]);
            }

            if (nx === 5 && ny === 5) {
                if (collected.length === MEMORIES.length) {
                    setTimeout(() => setIsWon(true), 300);
                } else {
                    setShowWarning(true);
                    setTimeout(() => setShowWarning(false), 2000);
                }
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") move(0, -1);
            if (e.key === "ArrowDown") move(0, 1);
            if (e.key === "ArrowLeft") move(-1, 0);
            if (e.key === "ArrowRight") move(1, 0);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [pos, popup, isWon, collected]);

    return (
        <section id="memory-labyrinth" className="px-4 py-16 sm:py-20" style={{ background: "var(--paper)" }}>
            <div className="max-w-lg mx-auto text-center">
                <header className="mb-8">
                    <p className="font-pixel text-[10px] text-pokedex-red mb-2">// MAZE QUEST //</p>
                    <h2 className="font-pixel text-xl sm:text-3xl text-ink">Memory Labyrinth</h2>
                    <p className="text-sm text-muted-foreground mt-3 max-w-sm mx-auto">
                        Find all {MEMORIES.length} hidden memories in the maze before meeting me!
                    </p>
                </header>

                <div className="rpg-box bg-[#e2e8f0] border-[6px] border-ink p-4 sm:p-6 shadow-2xl relative overflow-hidden">

                    <AnimatePresence mode="wait">
                        {!isWon ? (
                            <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                                <div className="h-6 mb-4">
                                    {showWarning && (
                                        <p className="font-pixel text-[10px] text-pokedex-red blink">
                                            "Hey! You missed some memories. Go back!"
                                        </p>
                                    )}
                                </div>

                                {/* GRID LABIRIN */}
                                <div className="grid grid-cols-6 gap-1 bg-ink p-1.5 rounded border-[4px] border-gray-600 max-w-[320px] mx-auto shadow-inner mb-6">
                                    {MAZE.map((row, y) =>
                                        row.map((cell, x) => {
                                            const isPlayer = pos.x === x && pos.y === y;
                                            const isGoal = x === 5 && y === 5;
                                            const memory = MEMORIES.find(m => m.x === x && m.y === y);
                                            const isMemoryCollected = memory ? collected.includes(memory.id) : false;

                                            return (
                                                <div
                                                    key={`${x}-${y}`}
                                                    className={`aspect-square relative flex items-center justify-center rounded-sm transition-colors ${cell === 1 ? "bg-[#334155]" : "bg-[#f8fafc]"
                                                        }`}
                                                >
                                                    {/* Item Kenangan */}
                                                    {memory && !isMemoryCollected && !isPlayer && (
                                                        <motion.div
                                                            animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                            className="absolute"
                                                        >
                                                            <Sparkle className="w-5 h-5 text-poke-yellow" />
                                                        </motion.div>
                                                    )}

                                                    {/* Goal: Avatar Hawa */}
                                                    {isGoal && !isPlayer && (
                                                        <div className="w-full h-full p-[2px] opacity-80">
                                                            <img src={imgHawa} className="w-full h-full object-cover rounded-full border-2 border-pokedex-red" alt="Goal" />
                                                        </div>
                                                    )}

                                                    {/* Player: Avatar Fadlan */}
                                                    {isPlayer && (
                                                        <motion.div
                                                            layoutId="player"
                                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                            className="absolute z-10 w-[85%] h-[85%]"
                                                        >
                                                            <img src={imgFadlan} className="w-full h-full object-cover rounded-full border-[3px] border-blue-500 shadow-md" alt="Player" />
                                                        </motion.div>
                                                    )}
                                                </div>
                                            )
                                        })
                                    )}
                                </div>

                                {/* Progress Bar Kenangan */}
                                <div className="flex justify-center gap-3 mb-2">
                                    {MEMORIES.map(m => (
                                        <div key={m.id} className={`w-4 h-4 rounded-full border-2 border-ink transition-colors ${collected.includes(m.id) ? 'bg-poke-yellow shadow-[0_0_8px_var(--poke-yellow)]' : 'bg-gray-300'}`} />
                                    ))}
                                </div>
                                <p className="font-pixel text-[10px] text-ink mb-6">{collected.length} / {MEMORIES.length} FOUND</p>

                                {/* D-PAD CONTROLLER */}
                                <div className="grid grid-cols-3 gap-2 w-48 mx-auto">
                                    <div />
                                    <button onClick={() => move(0, -1)} className="aspect-square bg-white border-2 border-ink border-b-[6px] active:border-b-2 active:translate-y-1 rounded-lg font-pixel text-sm flex items-center justify-center text-ink shadow-sm">▲</button>
                                    <div />
                                    <button onClick={() => move(-1, 0)} className="aspect-square bg-white border-2 border-ink border-b-[6px] active:border-b-2 active:translate-y-1 rounded-lg font-pixel text-sm flex items-center justify-center text-ink shadow-sm">◀</button>
                                    <button onClick={() => move(0, 1)} className="aspect-square bg-white border-2 border-ink border-b-[6px] active:border-b-2 active:translate-y-1 rounded-lg font-pixel text-sm flex items-center justify-center text-ink shadow-sm">▼</button>
                                    <button onClick={() => move(1, 0)} className="aspect-square bg-white border-2 border-ink border-b-[6px] active:border-b-2 active:translate-y-1 rounded-lg font-pixel text-sm flex items-center justify-center text-ink shadow-sm">▶</button>
                                </div>

                            </motion.div>
                        ) : (
                            // TAMPILAN MENANG
                            <motion.div key="won" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-8">
                                <div className="flex justify-center -space-x-4 mb-6">
                                    <img src={imgFadlan} className="w-20 h-20 object-cover rounded-full border-[4px] border-white shadow-lg z-10" alt="Fadlan" />
                                    <img src={imgHawa} className="w-20 h-20 object-cover rounded-full border-[4px] border-white shadow-lg z-0" alt="Hawa" />
                                </div>
                                <h3 className="font-pixel text-xl sm:text-2xl text-ink mb-3">Reunited at last!</h3>
                                <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">
                                    You navigated through the maze and remembered all 5 of our precious moments.
                                    Ready for the next journey together?
                                </p>
                                <button onClick={() => {
                                    setIsWon(false);
                                    setPos({ x: 0, y: 0 });
                                    setCollected([]);
                                }} className="rpg-btn rpg-btn-yellow text-xs sm:text-sm px-8 py-3">
                                    ↻ PLAY AGAIN
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* POPUP KENANGAN (Dengan perbaikan ukuran & scroll) */}
                    <AnimatePresence>
                        {popup && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="absolute inset-0 z-50 bg-ink/80 flex items-center justify-center p-4 backdrop-blur-sm"
                            >
                                <div className="rpg-box bg-[#fdfbf7] p-5 sm:p-6 max-w-sm w-full text-center border-[6px] border-ink shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col items-center">

                                    <div className="flex justify-center items-center gap-2 mb-3">
                                        <Sparkle className="w-5 h-5 text-poke-yellow" />
                                        <h4 className="font-pixel text-[10px] text-pokedex-red">// MEMORY UNLOCKED</h4>
                                    </div>

                                    <h3 className="font-pixel text-sm sm:text-base text-ink mb-4">{popup.title}</h3>

                                    {/* FOTO 1:1 Diperkecil Sedikit (w-4/5) Biar Muat di Layar Laptop */}
                                    <div className="w-4/5 aspect-square rounded-md overflow-hidden border-[4px] border-ink mb-4 bg-gray-200 shadow-[4px_4px_0_var(--ink)]">
                                        <img src={popup.img} alt={popup.title} className="w-full h-full object-cover object-center" />
                                    </div>

                                    <p className="text-xs sm:text-sm text-ink leading-relaxed mb-5 italic bg-white border-2 border-dashed border-gray-300 p-3 rounded w-full">
                                        "{popup.text}"
                                    </p>

                                    <button onClick={() => setPopup(null)} className="rpg-btn rpg-btn-blue text-xs w-full py-3 shadow-[4px_4px_0_var(--ink)] mt-auto">
                                        ▶ CONTINUE MAZE
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </section>
    );
}