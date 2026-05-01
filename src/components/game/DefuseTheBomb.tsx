import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// IMPORT FOTO UNTUK HASIL AKHIR DI SINI
import imgLose from "@/assets/kalah.png"; // Foto pas bom meledak
import imgWin from "@/assets/menang.png"; // Foto pas berhasil

export function DefuseTheBomb() {
  const [phase, setPhase] = useState<"intro" | "playing" | "exploded" | "defused">("intro");
  const [timeLeft, setTimeLeft] = useState(60);
  
  // Data kabel bomb (kuning adalah jawaban benar berdasarkan logika baru)
  const initialWires = [
    { id: "red", color: "bg-red-500", border: "border-red-700", cut: false, correct: false },
    { id: "blue", color: "bg-blue-500", border: "border-blue-700", cut: false, correct: false },
    { id: "yellow", color: "bg-yellow-400", border: "border-yellow-600", cut: false, correct: true },
    { id: "green", color: "bg-green-500", border: "border-green-700", cut: false, correct: false },
  ];
  
  const [wires, setWires] = useState(initialWires);

  // Timer Countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === "playing" && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (phase === "playing" && timeLeft === 0) {
      setPhase("exploded");
    }
    return () => clearTimeout(timer);
  }, [timeLeft, phase]);

  const startGame = () => {
    setPhase("playing");
    setTimeLeft(60);
    setWires(initialWires);
  };

  const handleCutWire = (id: string) => {
    if (phase !== "playing") return;

    const newWires = wires.map(w => w.id === id ? { ...w, cut: true } : w);
    setWires(newWires);

    const wire = newWires.find(w => w.id === id);
    
    setTimeout(() => {
      if (wire?.correct) {
        setPhase("defused");
      } else {
        setPhase("exploded");
      }
    }, 500);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <section id="defuse-bomb" className="px-4 py-16 sm:py-20" style={{ background: "var(--paper)" }}>
      <div className="max-w-lg mx-auto text-center">
        
        <header className="mb-8">
          <p className="font-pixel text-[10px] text-pokedex-red mb-2 blink">// CRITICAL WARNING //</p>
          <h2 className="font-pixel text-xl sm:text-3xl text-ink">Defuse The Bomb!</h2>
        </header>

        {/* CONTAINER UTAMA */}
        <div className={`rpg-box border-[6px] border-ink p-4 sm:p-6 shadow-2xl relative overflow-hidden transition-colors duration-300 ${phase === 'playing' && timeLeft <= 15 ? 'bg-red-900/20' : 'bg-[#1e293b]'}`}>
          
          <AnimatePresence mode="wait">
            
            {/* TAHAP 1: INTRO */}
            {phase === "intro" && (
              <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6">
                <div className="text-6xl mb-6">💣</div>
                <h3 className="font-pixel text-lg text-white mb-4">A Trap Has Been Set!</h3>
                <p className="text-sm text-gray-300 mb-8 max-w-sm mx-auto leading-relaxed">
                  You have exactly <span className="text-red-400 font-bold">60 SECONDS</span> to defuse the love bomb. 
                  Read the manual carefully. One wrong cut, and it's over!
                </p>
                <button onClick={startGame} className="border-[4px] border-black bg-red-500 hover:bg-red-600 text-white font-pixel text-sm px-8 py-4 shadow-[4px_4px_0_#000] active:translate-y-1 active:shadow-none w-full sm:w-auto">
                  ▶ START TIMER
                </button>
              </motion.div>
            )}

            {/* TAHAP 2: GAMEPLAY */}
            {phase === "playing" && (
              <motion.div key="playing" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
                
                {/* TIMER DIGITAL */}
                <div className="bg-black border-[4px] border-gray-600 p-3 mb-5 rounded flex justify-center shadow-inner">
                  <p className={`font-mono text-5xl sm:text-6xl tracking-widest font-bold ${timeLeft <= 15 ? 'text-red-500 blink' : 'text-red-500'}`} style={{ textShadow: "0 0 15px rgba(239, 68, 68, 0.8)" }}>
                    {formatTime(timeLeft)}
                  </p>
                </div>

                {/* BOMB MANUAL LOGIC (Diperbaiki Biar Gak Kepotong) */}
                <div className="relative pt-3 mb-6">
                  {/* Label Kuning Sekarang Ada di Luar Kotak Scroll */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-400 px-4 py-1 border-2 border-ink text-[10px] font-bold z-10 whitespace-nowrap shadow-sm">
                    DEFUSAL MANUAL
                  </div>
                  
                  {/* Kotak Putih Teks */}
                  <div className="bg-[#fdfbf7] p-4 sm:p-5 pt-6 border-[4px] border-ink font-mono text-[11px] sm:text-xs text-left shadow-inner max-h-[220px] overflow-y-auto leading-relaxed">
                    <ul className="list-disc pl-4 space-y-3 text-ink">
                      <li>Jika golongan darahku A atau B, potong kabel <b>MERAH</b>.</li>
                      <li>Jika zodiakku Libra TAPI kita jadian di bulan ganjil, potong kabel <b>HIJAU</b>.</li>
                      <li>Jika aku lulus sekolah agama di kelas 5, potong kabel <b>BIRU</b>.</li>
                      <li className="text-red-600 font-bold">PENGECUALIAN: Jika tanggal lahirku genap, abaikan semua aturan dan potong kabel MERAH.</li>
                      <li>Jika golongan darahku O, lulus sekolah agama kelas 6, DAN tahun jadian kita ganjil... potong kabel <b>KUNING</b>.</li>
                      <li className="italic text-gray-500">Jika kamu nggak ingat satupun, mending lambaikan tangan ke kamera.</li>
                    </ul>
                  </div>
                </div>

                {/* WIRES SECTION */}
                <div className="bg-gray-800 border-4 border-gray-600 p-4 rounded grid gap-4">
                  {wires.map((wire) => (
                    <div key={wire.id} className="relative w-full h-8 flex items-center group cursor-pointer" onClick={() => handleCutWire(wire.id)}>
                      
                      <div className="w-4 h-full bg-gray-400 border-2 border-black rounded-l" />
                      
                      <div className="flex-1 flex items-center justify-center relative overflow-hidden h-4">
                        {!wire.cut ? (
                          <>
                            <div className={`w-full h-full ${wire.color} border-y-2 ${wire.border} shadow-sm group-hover:brightness-110`} />
                            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-0.5 rounded font-pixel">
                              ✂️ CUT
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex justify-between">
                            <div className={`w-[45%] h-full ${wire.color} border-y-2 ${wire.border} -translate-x-2 transition-transform`} />
                            <div className="text-[10px] animate-pulse">⚡</div>
                            <div className={`w-[45%] h-full ${wire.color} border-y-2 ${wire.border} translate-x-2 transition-transform`} />
                          </div>
                        )}
                      </div>

                      <div className="w-4 h-full bg-gray-400 border-2 border-black rounded-r" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAHAP 3: KALAU SALAH POTONG / WAKTU HABIS (Muncul Foto Komuk) */}
            {phase === "exploded" && (
              <motion.div key="exploded" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-6 flex flex-col items-center">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }} 
                  transition={{ duration: 0.5 }} 
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-[6px] border-red-500 overflow-hidden mb-4 shadow-[0_0_20px_rgba(239,68,68,0.6)] bg-red-900 flex items-center justify-center"
                >
                  <img src={imgLose} alt="Meledak" className="w-full h-full object-cover" />
                </motion.div>
                
                <h3 className="font-pixel text-xl sm:text-2xl text-red-400 mb-2 blink">BOOM! YOU DIED</h3>
                <p className="text-sm text-gray-300 mb-6 max-w-sm mx-auto bg-black/50 p-3 rounded border border-red-900/50 leading-relaxed">
                  {timeLeft === 0 
                    ? "Time's up! You took too long to think, and now it's all blown to pieces!" 
                    : "Wrong wire! You should've read the manual more carefully. Now we're toast!"}
                </p>
                <button onClick={startGame} className="border-[4px] border-black bg-yellow-400 hover:bg-yellow-500 text-ink font-pixel text-xs px-8 py-3 shadow-[4px_4px_0_#000] active:translate-y-1 active:shadow-none">
                  ↻ RETRY MISSION
                </button>
              </motion.div>
            )}

            {/* TAHAP 4: KALAU BENAR (KABEL KUNING) */}
            {phase === "defused" && (
              <motion.div key="defused" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="py-6 flex flex-col items-center">
                
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-[6px] border-green-400 overflow-hidden mb-4 shadow-[0_0_20px_rgba(74,222,128,0.6)] bg-green-900 flex items-center justify-center">
                  <img src={imgWin} alt="Berhasil" className="w-full h-full object-cover" />
                </div>

                <h3 className="font-pixel text-xl sm:text-2xl text-green-400 mb-2 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">BOMB DEFUSED!</h3>
                <p className="text-sm text-gray-300 mb-6 max-w-sm mx-auto bg-gray-800 p-4 border-2 border-dashed border-gray-600 rounded leading-relaxed">
                  Phew! That was close. You actually remember all those little details about me even under pressure. Good job, Sayang! 💛
                </p>
                <button onClick={() => setPhase("intro")} className="border-[4px] border-black bg-blue-500 hover:bg-blue-600 text-white font-pixel text-xs px-8 py-3 shadow-[4px_4px_0_#000] active:translate-y-1 active:shadow-none">
                  ▶ CONTINUE JOURNEY
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}