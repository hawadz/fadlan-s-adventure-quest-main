import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "@/components/svg/GameIcons";
import bgmAudio from "@/assets/bgm.mp3"; 

const BGM_URL = bgmAudio;

export function BgmPlayer({ autoplay }: { autoplay: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.35;
    if (autoplay) {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [autoplay]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play().then(() => setPlaying(true)).catch(() => {}); }
    else { a.pause(); setPlaying(false); }
  };

  return (
    <>
      <audio ref={audioRef} src={BGM_URL} loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed top-3 right-3 z-40 rpg-btn rpg-btn-yellow !p-2 flex items-center gap-2"
      >
        <PlayIcon paused={!playing} />
      </button>
    </>
  );
}