import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pokeball } from "@/components/svg/GameIcons";

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
        <section id="memory-match" className="px-4 sm:px-6 py-16 sm:py-20" style={{ background: "var(--paper)" }}>
            <div className="max-w-2xl mx-auto">
                <header className="text-center mb-10">
                    <p className="font-pixel text-sm text-pokedex-red mb-3">// MEMORY MATCH</p>
                    <h2 className="font-pixel text-xl sm:text-3xl">Find The Pairs</h2>
                    <p className="text-base text-muted-foreground mt-3">Flip the cards and match the photos!</p>
                </header>

                <div className="rpg-box p-4 sm:p-8 bg-white min-h-[450px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {!isComplete ? (
                            <motion.div 
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="grid grid-cols-4 gap-3 sm:gap-4 w-full max-w-[500px] mx-auto"
                            >
                                {cards.map((card, index) => {
                                    const isShowingFront = card.isFlipped || card.isMatched;
                                    
                                    return (
                                        <div 
                                            key={card.id} 
                                            className="relative aspect-[3/4] cursor-pointer group"
                                            style={{ perspective: "1000px" }}
                                            onClick={() => handleFlip(index)}
                                        >
                                            <motion.div
                                                className="w-full h-full relative"
                                                animate={{ rotateY: isShowingFront ? 180 : 0 }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                style={{ transformStyle: "preserve-3d" }}
                                            >
                                                {/* Sisi Belakang (Pokeball) */}
                                                <div 
                                                    className="absolute inset-0 bg-blue-100 border-[3px] border-water rounded-lg shadow-sm group-hover:shadow-md transition-shadow flex flex-col items-center justify-center"
                                                    style={{ 
                                                        backfaceVisibility: "hidden",
                                                        WebkitBackfaceVisibility: "hidden",
                                                        zIndex: isShowingFront ? 0 : 10
                                                    }}
                                                >
                                                    <div className="absolute inset-1.5 border-[2px] border-dashed border-water/50 rounded-md"></div>
                                                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-sm z-10">
                                                        <Pokeball color="var(--water)" className="w-5 h-5 sm:w-7 sm:h-7 opacity-80" />
                                                    </div>
                                                </div>
                                                
                                                {/* Sisi Depan (Foto) */}
                                                <div 
                                                    className="absolute inset-0 bg-white border-[3px] border-ink rounded-lg shadow-sm group-hover:shadow-md transition-shadow overflow-hidden"
                                                    style={{ 
                                                        backfaceVisibility: "hidden",
                                                        WebkitBackfaceVisibility: "hidden",
                                                        transform: "rotateY(180deg)",
                                                        zIndex: isShowingFront ? 10 : 0
                                                    }}
                                                >
                                                    <img 
                                                        src={card.image} 
                                                        alt="memory card" 
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="secret"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center w-full"
                            >
                                <h3 className="font-pixel text-poke-yellow mb-6 text-xl sm:text-2xl" style={{ textShadow: "3px 3px 0 var(--ink)" }}>
                                    SECRET UNLOCKED!
                                </h3>
                                
                                <div className="border-[6px] border-ink p-3 sm:p-4 bg-white rotate-2 mx-auto inline-block shadow-xl mb-8">
                                    <div className="relative w-56 h-56 sm:w-72 sm:h-72 overflow-hidden border-2 border-gray-200">
                                        <img 
                                            src={secretImg} 
                                            alt="Secret Funny Photo" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="font-caveat text-2xl mt-4 text-ink font-bold">Caught in 4K 📸</p>
                                </div>
                                
                                <p className="text-base text-muted-foreground px-4 mb-8">
                                    You are the best thing that's ever been mine!
                                </p>

                                <button 
                                    onClick={setupGame} 
                                    className="rpg-btn rpg-btn-yellow text-sm px-8 py-4"
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