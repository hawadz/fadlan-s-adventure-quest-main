import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LockScreen } from "@/components/game/LockScreen";
import { BgmPlayer } from "@/components/game/BgmPlayer";
import { Hero } from "@/components/game/Hero";
import { CatchGame } from "@/components/game/CatchGame";
import { Gallery } from "@/components/game/Gallery";
import { Stats } from "@/components/game/Stats";
import { QuizGame } from "@/components/game/QuizGame";
import { MemoryMatch } from "@/components/game/MemoryMatch";
import { EggGacha } from "@/components/game/EggGacha";
import { BossBattle } from "@/components/game/BossBattle";
import { Inventory } from "@/components/game/Inventory";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fadlan's Adventure — Birthday & Anniversary" },
      { name: "description", content: "A retro RPG / Pokémon-style celebration site. Press start to play." },
    ],
  }),
  component: Index,
});

function Index() {
  const [unlocked, setUnlocked] = useState(false);
  const [questDone, setQuestDone] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [memoryDone, setMemoryDone] = useState(false);
  const [bossDefeated, setBossDefeated] = useState(false);

  return (
    <main className="min-h-screen">
      {!unlocked && <LockScreen onUnlock={() => setUnlocked(true)} />}
      {unlocked && (
        <>
          <BgmPlayer autoplay />
          <Hero />

          <CatchGame onComplete={() => setQuestDone(true)} />
          <MemoryMatch onComplete={() => setMemoryDone(true)} />
          <EggGacha />
          <BossBattle onComplete={() => setBossDefeated(true)} />
          <QuizGame onComplete={() => setQuizDone(true)} />
          <Gallery />
          <Stats />
          <Inventory />

          <footer className="px-4 py-10 text-center" style={{ background: "var(--ink)" }}>
            <p className="font-pixel text-[10px] text-poke-yellow">
              ★ STATUS ★ {(questDone && quizDone && memoryDone && bossDefeated) ? "HALL OF FAME UNLOCKED" : "JOURNEY CONTINUES"}
            </p>
            <p className="text-xs text-white/70 mt-3">Made with ❤️ - Let's catch more memories together.</p>
          </footer>
        </>
      )}
    </main>
  );
}