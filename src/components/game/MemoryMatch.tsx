import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pokeball } from "@/components/svg/GameIcons";

// 1. IMPORT SEMUA FOTO DARI FOLDER ASSETS
import img1 from "@/assets/match-1.jpg";
import img2 from "@/assets/match-2.jpg";
import img3 from "@/assets/match-3.jpg";
import img4 from "@/assets/match-4.jpg";
import img5 from "@/assets/match-5.jpg";
import img6 from "@/assets/match-6.jpg";
import img7 from "@/assets/match-7.jpg";
import img8 from "@/assets/match-8.jpg";
import secretImg from "@/assets/dar.jpg";

type CardData = {
    id: number;
    type: string;
    image: string;
    isFlipped: boolean;
    isMatched: boolean;
};

// 2. MASUKKAN VARIABEL FOTO KE DALAM ARRAY
const CARD_PAIRS = [
    { type: "pic1", image: img1 },
    { type: "pic2", image: img2 },
    { type: "pic3", image: img3 },
    { type: "pic4", image: img4 },
    { type: "pic5", image: img5 },
    { type: "pic6", image: img6 },
    { type: "pic7", image: img7 },
    { type: "pic8", image: img8 },
];

export function MemoryMatch({ onComplete }: { onComplete: () => void }) {
    const [cards, setCards] = useState<CardData[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [disabled, setDisabled] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const setupGame = () => {
        const shuffled = [...CARD_PAIRS, ...CARD_PAIRS]
            .sort(() => Math.random() - 0.5)
            .map((item, index) => ({
                ...item,
                id: index,
                isFlipped: false,
                isMatched: false
            }));
        setCards(shuffled);
        setFlipped([]);
        setDisabled(false);
        setIsComplete(false);
    };

    useEffect(() => {
        setupGame();
    }, []);

    const handleFlip = (index: number) => {
        if (disabled || cards[index].isFlipped || cards[index].isMatched) return;

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setDisabled(true);
            const [first, second] = newFlipped;
            
            if (cards[first].type === cards[second].type) {
                setTimeout(() => {
                    const matchedCards = [...cards];
                    matchedCards[first].isMatched = true;
                    matchedCards[second].isMatched = true;
                    setCards(matchedCards);
                    setFlipped([]);
                    setDisabled(false);
                    
                    if (matchedCards.every(c => c.isMatched)) {
                        setTimeout(() => {
                            setIsComplete(true);
                            onComplete();
                        }, 800);
                    }
                }, 500);
            } else {
                setTimeout(() => {
                    const resetCards = [...cards];
                    resetCards[first].isFlipped = false;
                    resetCards[second].isFlipped = false;
                    setCards(resetCards);
                    setFlipped([]);
                    setDisabled(false);
                }, 1000);
            }
        }
    };

    return (
        <section id="memory-match" className="px-2 sm:px-4 py-16 sm:py-20" style={{ background: "var(--paper)" }}>
            <div className="max-w-xl mx-auto">
                <header className="text-center mb-8">
                    <p className="font-pixel text-[10px] text-pokedex-red mb-2">// MINIGAME: MEMORY MATCH</p>
                    <h2 className="font-pixel text-base sm:text-xl">Find The Pairs</h2>
                    <p className="text-sm text-muted-foreground mt-2">Flip the cards and match the photos!</p>
                </header>

                <div className="rpg-box p-3 sm:p-5 bg-white min-h-[400px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {!isComplete ? (
                            <motion.div 
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                // Ubah gap lebih rapat
                                className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-[400px] mx-auto"
                            >
                                {cards.map((card, index) => (
                                    <div 
                                        key={card.id} 
                                        // UBAH UKURAN DI SINI: aspect-[3/4] bikin dia persegi panjang vertikal
                                        className="relative aspect-[3/4] cursor-pointer"
                                        style={{ perspective: "1000px" }}
                                        onClick={() => handleFlip(index)}
                                    >
                                        <motion.div
                                            className="w-full h-full relative shadow-sm hover:shadow-md transition-shadow rounded-lg"
                                            animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                                            transition={{ duration: 0.4 }}
                                            style={{ transformStyle: "preserve-3d" }}
                                        >
                                            {/* Belakang Kartu (Desain Cover) */}
                                            <div 
                                                className="absolute inset-0 bg-blue-100 border-[2px] border-water rounded-lg flex flex-col items-center justify-center overflow-hidden"
                                                style={{ backfaceVisibility: "hidden" }}
                                            >
                                                {/* Pola dekoratif biar mirip kartu beneran */}
                                                <div className="absolute inset-1 border-[1px] border-dashed border-water/50 rounded-md"></div>
                                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-sm z-10">
                                                    <Pokeball color="var(--water)" className="w-4 h-4 sm:w-5 sm:h-5 opacity-80" />
                                                </div>
                                            </div>
                                            
                                            {/* Depan Kartu (Foto) */}
                                            <div 
                                                className="absolute inset-0 bg-white border-2 border-ink rounded-lg overflow-hidden shadow-sm"
                                                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                            >
                                                <img 
                                                    src={card.image} 
                                                    alt="memory card" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="secret"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center w-full"
                            >
                                <h3 className="font-pixel text-poke-yellow mb-5 text-sm sm:text-lg" style={{ textShadow: "2px 2px 0 var(--ink)" }}>
                                    SECRET UNLOCKED!
                                </h3>
                                
                                <div className="border-[4px] border-ink p-2 sm:p-3 bg-white rotate-2 mx-auto inline-block shadow-lg mb-6">
                                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 overflow-hidden border border-gray-200">
                                        <img 
                                            src={secretImg} 
                                            alt="Secret Funny Photo" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="font-caveat text-xl mt-3 text-ink font-bold">Caught in 4K 📸</p>
                                </div>
                                
                                <p className="text-sm text-muted-foreground px-4 mb-6">
                                    Too precious to delete. Love you anyway!
                                </p>

                                <button 
                                    onClick={setupGame} 
                                    className="rpg-btn rpg-btn-yellow text-xs px-6 py-3"
                                >
                                    ↻ Play Again
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}