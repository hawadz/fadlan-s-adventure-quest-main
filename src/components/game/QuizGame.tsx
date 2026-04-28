import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pokeball, PixelHeart, Sparkle } from "@/components/svg/GameIcons";

const QUESTIONS = [
    {
        id: 1,
        question: "Di mana tempat pertama kali kita nge-date?",
        options: ["Mall", "Bioskop", "MCD", "Kampus"],
        correct: 1 
    },
    {
        id: 2,
        question: "Apa film yang pertama kali kita tonton pas nge-date?",
        options: ["Suzume", "Jalan yang Jauh, Jangan Lupa Pulang", "Barbie", "Avatar"],
        correct: 1 
    },
    {
        id: 3,
        question: "Apa makanan kesukaan aku yang nggak pernah ditolak?",
        options: ["Sushi", "Mie Ayam", "Seblak", "Bakso"],
        correct: 2 
    },
    {
        id: 4,
        question: "Kapan pertama kali kita ketemu?",
        options: ["1 Januari", "14 Februari", "29 April", "12 Desember"],
        correct: 1 
    },
    {
        id: 5,
        question: "Siapa yang paling sering ngambek duluan?",
        options: ["Fadlan", "Hawa", "Dua-duanya", "Kucing Tetangga"],
        correct: 3 
    },
    {
        id: 6,
        question: "Kapan tanggal kita jadian?",
        options: ["14 Februari", "20 Maret", "29 April", "10 Mei"],
        correct: 2 
    },
    {
        id: 7,
        question: "Kapan pertama kali kita photobooth?",
        options: ["Pas Anniversary", "Pas Hawa ulang tahun", "Pas Fadlan ulang tahun", "Pas ke Bandung"],
        correct: 1 
    },
    {
        id: 8,
        question: "Kapan pertama kali kamu nangis di depan aku?",
        options: ["Pas nonton film sedih", "Pas lagi berantem", "Pas aku samperin ke Bandung", "Pas LDR"],
        correct: 2 
    },
    {
        id: 9,
        question: "Apa warna favorit Hawa?",
        options: ["Biru", "Hitam", "Pink", "Ungu"],
        correct: 2 
    },
    {
        id: 10,
        question: "Berapa angka favorit aku?",
        options: ["7", "9", "11", "24"],
        correct: 2 
    }
];

export function QuizGame({ onComplete }: { onComplete: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
    const [isFinished, setIsFinished] = useState(false);

    const handleAnswer = (index: number) => {
        if (status !== "idle") return;

        setSelected(index);
        if (index === QUESTIONS[currentStep].correct) {
            setStatus("correct");
            setTimeout(() => {
                if (currentStep < QUESTIONS.length - 1) {
                    setCurrentStep(prev => prev + 1);
                    setStatus("idle");
                    setSelected(null);
                } else {
                    setIsFinished(true);
                    onComplete();
                }
            }, 1000);
        } else {
            setStatus("wrong");
            setTimeout(() => {
                setStatus("idle");
                setSelected(null);
            }, 800);
        }
    };

    if (isFinished) {
        return (
            <section className="px-4 py-16 flex justify-center" style={{ background: "var(--paper)" }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative max-w-md w-full p-8 border-[6px] border-double border-yellow-600 bg-white shadow-2xl text-center"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    {/* Certificate Ornaments */}
                    <div className="absolute top-2 left-2 right-2 bottom-2 border border-yellow-400 pointer-events-none" />

                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center border-2 border-yellow-500">
                            <Sparkle className="w-10 h-10 text-yellow-600" />
                        </div>
                    </div>

                    <h2 className="text-xs font-pixel text-yellow-700 tracking-widest mb-2">OFFICIAL CERTIFICATE</h2>
                    <h1 className="text-2xl font-bold text-ink mb-4">Legendary Partner Award</h1>

                    <div className="h-[2px] bg-yellow-500 w-1/2 mx-auto mb-4" />

                    <p className="text-sm text-muted-foreground italic mb-6">
                        Proudly presented to:
                    </p>
                    <p className="text-2xl font-pixel text-pokedex-red mb-6">M. FADLAN FASYA</p>

                    <p className="text-xs leading-relaxed text-ink px-4">
                        For acing Professor Hawa's ultimate test and officially proving 
                        that you are the most 'Legendary' partner in this entire region.
                    </p>

                    <div className="mt-8 flex justify-between items-end px-4">
                        <div className="text-left">
                            <p className="text-[10px] text-muted-foreground">Region:</p>
                            <p className="text-[10px] font-bold">Our Love Journey</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-muted-foreground">Signed by:</p>
                            <p className="text-[10px] font-bold">Hawa cantik</p>
                        </div>
                    </div>
                </motion.div>
            </section>
        );
    }

    return (
        <section id="quiz" className="px-4 py-16 sm:py-20" style={{ background: "var(--paper)" }}>
            <div className="max-w-xl mx-auto">
                <header className="text-center mb-8">
                    <p className="font-pixel text-[10px] text-pokedex-red mb-2">// TRAINER'S EXAM</p>
                    <h2 className="font-pixel text-base sm:text-xl">Professor's Challenge</h2>
                    <p className="text-sm text-muted-foreground mt-2">Let's see how well you actually know me!</p>
                </header>

                <motion.div
                    animate={status === "wrong" ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="rpg-box p-6 bg-white"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Pokeball className="w-5 h-5 animate-bounce" />
                        <span className="font-pixel text-[10px] text-muted-foreground">QUESTION {currentStep + 1} / {QUESTIONS.length}</span>
                    </div>

                    <h3 className="text-lg font-bold mb-6 text-ink leading-snug">
                        {QUESTIONS[currentStep].question}
                    </h3>

                    <div className="grid gap-3">
                        {QUESTIONS[currentStep].options.map((opt, idx) => {
                            const isSelected = selected === idx;
                            let bgColor = "bg-white";
                            let borderColor = "border-ink";

                            if (isSelected) {
                                if (status === "correct") {
                                    bgColor = "bg-green-100";
                                    borderColor = "border-green-600";
                                } else if (status === "wrong") {
                                    bgColor = "bg-red-100";
                                    borderColor = "border-red-600";
                                } else {
                                    bgColor = "bg-blue-50";
                                    borderColor = "border-water";
                                }
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    className={`w-full p-4 text-left border-[3px] rounded-lg font-medium transition-all flex justify-between items-center ${bgColor} ${borderColor}`}
                                >
                                    <span>{opt}</span>
                                    {isSelected && status === "correct" && <PixelHeart className="w-5 h-5 text-green-600" />}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}