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

      const newItems = Array.from({ length: 3 }).map(() => ({
        id: idRef.current++,
        x: 5 + Math.random() * 85, 
        y: 10 + Math.random() * 70,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      }));


      setItems(prev => [...prev.slice(-7), ...newItems]);
    };

    spawn(); 
    const t = setInterval(spawn, 800); 
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
        <header className="text-center mb-8">
          <p className="font-pixel text-sm text-pokedex-red mb-3">// MINI-GAME</p>
          <h2 className="font-pixel text-xl sm:text-3xl">Gotta Catch 'Em All</h2>
          <p className="text-base text-muted-foreground mt-3">Tap only the Pokéballs to catch them!</p>
        </header>

        <div className="rpg-box p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-pixel text-xs sm:text-sm">CAUGHT</span>
            <span className="font-pixel text-sm sm:text-base text-pokedex-red">{caught} / {TARGET}</span>
          </div>
          <div className="stat-bar mb-6 h-4">
            <span style={{ width: `${(Math.min(caught, TARGET) / TARGET) * 100}%`, transition: "width 0.3s" }} />
          </div>

          <div ref={containerRef} className="relative w-full rounded-lg overflow-hidden border-[4px] border-ink"
            style={{ height: 450, background: "linear-gradient(180deg, var(--pastel-blue) 0%, oklch(0.92 0.08 145) 100%)" }}>
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
                    className={`w-16 h-16 sm:w-20 sm:h-20 ${it.popping ? "pop" : ""} ${isFake ? "pointer-events-none cursor-default" : "cursor-pointer drop-shadow-xl z-10"}`}
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
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/60 backdrop-blur-sm z-20 gap-5">
                <p className="font-pixel text-poke-yellow text-xl sm:text-2xl" style={{ textShadow: "4px 4px 0 var(--ink)" }}>
                  ★ COMPLETE ★
                </p>
                <button
                  onClick={resetGame}
                  className="rpg-btn rpg-btn-yellow mt-4 text-sm px-6 py-3 shadow-lg"
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
          <motion.div className="fixed inset-0 z-50 bg-ink/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowLetter(false)}>
            <motion.div onClick={e => e.stopPropagation()}
              initial={{ scale: 0.7, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.7 }}
              className="rpg-box rpg-box-lg max-w-2xl w-full p-6 sm:p-10 max-h-[88vh] overflow-y-auto">
              <p className="font-pixel text-xs text-poke-yellow bg-ink inline-block px-3 py-1.5 rounded">+1000 EXP</p>
              <h3 className="font-pixel text-xl sm:text-2xl mt-4">★ LEVEL UP! ★</h3>
              <p className="text-base text-muted-foreground mt-2">A hidden letter has been unlocked.</p>

              <div className="mt-6 p-5 sm:p-8 border-[4px] border-ink rounded-lg bg-paper">
                <p className="font-pixel text-xs text-pokedex-red mb-5">// ANNIVERSARY LETTER</p>
                <p className="text-base sm:text-lg leading-relaxed text-ink">
                  Hai HEHEHE 💌<br /><br />
                  Happy 3rd Anniversary Sayang!! Thank you for making my life happier and brighter
                  every day. I’m soo sooo soooo grateful to have you in my life hihi. <br /><br />
                  I hope your day always filled with love, laughter, and
                  everything that makes you smile and happy yeay!! I love you to the moon and back!❤️ <br /><br />
                  Umm I don't have a fancy gift or a big surprise, 
                  but I hope this little letter can show you how much you mean to me. <br /><br />
                  Thank you for being you, and for letting me be a part of your life. <br /><br />
                  i'm sorry if i can't always be the best for you, 
                  but i promise to always try my best and give you all my love and support. <br /><br />
                  Aku merasa sangat amat senang bisa kenal sama kamu, bisa melakukan banyak hal bareng kamu,
                  dan bisa terus ada buat kamu. <br /><br />
                  Aku seneng bisa ada yang aku tunggu dihidup aku selama 3 tahun ini,
                  i love waiting for you, aku suka bisa nunggu kamu pulang kerja buat ngobrol sama aku,
                  aku seneng bisa nunggu kamu pulang buat ketemu aku tiap bulannya. <br /><br />
                  I feel so difficult to put into words how much you mean to me,
                  tapi sejujurnya aku sayanggg banget banget sama kamu,
                  mungkin aku selalu menaruh harapan yang membuat kamu terbebani, tapi sebenernya bukan itu maksud aku.<br /><br />
                  Aku selama ini sangat sulit ya untuk mengunkapkan apa yang aku rasa,
                  selama ini aku banyak takutnya, tapi aku bisa ngelakuin itu semua sama kamu,
                  i feel so grateful that i can be myself around you, 
                  that i can share my feelings and thoughts with you, and that i can love you in my own way. <br /><br />
                  Aku juga banyak salahnya, aku banyak bikin kamu sakit hati, aku buat kamu sedih, aku buat kamu kecewa,
                  aku buat kamu nangis, aku buat kamu bingung,
                  aku buat kamu capek, i feel so sorry for all the times i hurt you,
                  for all the times i made you sad, for all the times i made you disappointed, for all the times i made you cry, 
                  and for all the times i made you tired. <br /><br />
                  Aku minta maaf selama ini banyak menyakiti hati kamu,
                  i will try my best to be better for you, to be more understanding, 
                  to be more supportive, and to be more loving. <br /><br />
                  Selama 3 tahun ini bener bener merubah hidup aku, semenjak aku ketemu kamu, aku banyak merasa banyak hal yang bisa aku lakuin,
                  kamu selalu support aku, dengerin aku, aku bisa cerita semuanya sama kamu, aku seneng bisa sharing semua sama kamu,
                  mungkin beberapa ada yang buat kamu terbebani dan kamu mungkin capek dengernya,
                  tapi aku bener bener berterima kasih kamu selalu ada buat aku even for all the crazy things i said and i did, sorry... <br /><br />
                  Terima kasih ya sudah sayang sama aku, sudah memberikan banyak hal yang belum pernah aku dapet selama ini,
                  kasih sayang yang belum pernah aku dapet selama ini, i will say again i feel so grateful to have you in my life. <br /><br />
                  Terima kasih sudah bersama aku sejauh ini, terima kasih sudah selalu ada diantara semua keributan yang ada,
                  terima kasih sudah menerima aku selama ini, terima kasih selalu ada dengan semua maaf yang ada,
                  terimakasih selalu meluangkan waktu kamu buat aku. <br /><br />
                  Terima kasih juga selalu memilih aku walaupun entah berapa maaf yang akan kita ucapkan lagi,
                  i'm sorry for all the fights we had, 
                  for all the misunderstandings we had, for all the mistakes we made, 
                  but i'm also grateful for all of that because it made us stronger and closer. <br /><br />
                  I hope we can keep growing together, learning from each other, 
                  and loving each other for many more years to come or maybe forever hehe?? <br /><br />
                  Love you always💖
                </p>
              </div>

              <div className="flex gap-4 mt-6">
                <button onClick={() => setShowLetter(false)} className="rpg-btn rpg-btn-green w-full py-4 text-sm">
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