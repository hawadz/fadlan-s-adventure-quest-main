import { SVGProps } from "react";

const ink = "var(--ink)";

export function Pokeball({ color = "var(--pokedex-red)", ...p }: SVGProps<SVGSVGElement> & { color?: string }) {
  return (
    <svg viewBox="0 0 64 64" {...p}>
      <circle cx="32" cy="32" r="28" fill="white" stroke={ink} strokeWidth="4" />
      <path d="M4 32a28 28 0 0 1 56 0z" fill={color} stroke={ink} strokeWidth="4" />
      <rect x="4" y="30" width="56" height="4" fill={ink} />
      <circle cx="32" cy="32" r="7" fill="white" stroke={ink} strokeWidth="4" />
      <circle cx="32" cy="32" r="2.5" fill={ink} />
    </svg>
  );
}

export function GreatBall(p: SVGProps<SVGSVGElement>) { return <Pokeball color="var(--water)" {...p} />; }
export function UltraBall(p: SVGProps<SVGSVGElement>) { return <Pokeball color="var(--ink)" {...p} />; }
export function MasterBall(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" {...p}>
      <circle cx="32" cy="32" r="28" fill="white" stroke={ink} strokeWidth="4" />
      <path d="M4 32a28 28 0 0 1 56 0z" fill="oklch(0.55 0.22 300)" stroke={ink} strokeWidth="4" />
      <text x="32" y="22" textAnchor="middle" fontFamily="Press Start 2P" fontSize="8" fill="white">M</text>
      <circle cx="22" cy="18" r="3" fill="oklch(0.85 0.15 340)" stroke={ink} strokeWidth="2" />
      <circle cx="42" cy="18" r="3" fill="oklch(0.85 0.15 340)" stroke={ink} strokeWidth="2" />
      <rect x="4" y="30" width="56" height="4" fill={ink} />
      <circle cx="32" cy="32" r="7" fill="white" stroke={ink} strokeWidth="4" />
      <circle cx="32" cy="32" r="2.5" fill={ink} />
    </svg>
  );
}

export function PixelHeart(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" shapeRendering="crispEdges" {...p}>
      {[
        "0110011 0",
        "1111111 1",
        "1111111 1",
        "1111111 1",
        "0111111 0",
        "0011110 0",
        "0001100 0",
      ].map((row, y) =>
        row.replace(/\s/g, "").split("").map((c, x) =>
          c === "1" ? <rect key={`${x}-${y}`} x={x + 1} y={y + 3} width="1" height="1" fill="var(--pokedex-red)" /> : null
        )
      )}
    </svg>
  );
}

export function Sparkle(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="var(--poke-yellow)" stroke={ink} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function Potion({ color = "var(--pokedex-red)" }: { color?: string }) {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="24" y="6" width="16" height="6" fill="oklch(0.5 0.05 260)" stroke={ink} strokeWidth="3" />
      <rect x="20" y="12" width="24" height="6" fill="oklch(0.7 0.04 260)" stroke={ink} strokeWidth="3" />
      <path d="M18 22 Q14 30 14 40 Q14 56 32 56 Q50 56 50 40 Q50 30 46 22 Z" fill="white" stroke={ink} strokeWidth="3" />
      <path d="M20 38 Q14 38 14 44 Q14 56 32 56 Q50 56 50 44 Q50 38 44 38 Z" fill={color} stroke={ink} strokeWidth="3" />
      <ellipse cx="24" cy="32" rx="3" ry="6" fill="white" opacity="0.8" />
    </svg>
  );
}

export function Gameboy() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="10" y="6" width="44" height="52" rx="4" fill="var(--pastel-blue)" stroke={ink} strokeWidth="3" />
      <rect x="16" y="12" width="32" height="22" fill="var(--gb-green)" stroke={ink} strokeWidth="2" />
      <rect x="14" y="42" width="6" height="2" fill={ink} />
      <rect x="16" y="40" width="2" height="6" fill={ink} />
      <circle cx="42" cy="44" r="2.5" fill="var(--pokedex-red)" stroke={ink} strokeWidth="1.5" />
      <circle cx="48" cy="40" r="2.5" fill="var(--pokedex-red)" stroke={ink} strokeWidth="1.5" />
      <rect x="26" y="52" width="4" height="2" rx="1" fill={ink} />
      <rect x="34" y="52" width="4" height="2" rx="1" fill={ink} />
    </svg>
  );
}

export function ElementIcon({ type }: { type: "fire" | "water" | "electric" | "leaf" | "fairy" | "psychic" }) {
  const map: Record<string, { c: string; d: string }> = {
    fire:    { c: "var(--fire)",     d: "M12 2 C 14 8 20 10 18 16 C 17 20 14 22 12 22 C 10 22 6 20 6 16 C 6 12 10 10 12 2 Z" },
    water:   { c: "var(--water)",    d: "M12 2 C 18 10 20 14 20 17 A 8 8 0 1 1 4 17 C 4 14 6 10 12 2 Z" },
    electric:{ c: "var(--electric)", d: "M13 2 L4 14 H10 L8 22 L20 9 H13 L15 2 Z" },
    leaf:    { c: "var(--leaf)",     d: "M4 20 C 4 8 12 4 20 4 C 20 12 16 20 4 20 Z M 4 20 L 14 10" },
    fairy:   { c: "oklch(0.85 0.12 340)", d: "M12 2 L14 9 L21 10 L15 14 L17 21 L12 17 L7 21 L9 14 L3 10 L10 9 Z" },
    psychic: { c: "oklch(0.65 0.18 320)", d: "M12 3 A9 9 0 1 0 21 12 A6 6 0 0 1 12 3 Z" },
  };
  const { c, d } = map[type];
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="12" r="11" fill="white" stroke={ink} strokeWidth="2" />
      <path d={d} fill={c} stroke={ink} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon({ paused }: { paused: boolean }) {
  return (
    <svg viewBox="0 0 16 16" shapeRendering="crispEdges" className="w-5 h-5">
      {paused ? (
        <>
          <rect x="3" y="2" width="2" height="12" fill={ink} />
          <rect x="5" y="3" width="2" height="10" fill={ink} />
          <rect x="7" y="4" width="2" height="8" fill={ink} />
          <rect x="9" y="5" width="2" height="6" fill={ink} />
          <rect x="11" y="6" width="2" height="4" fill={ink} />
        </>
      ) : (
        <>
          <rect x="3" y="3" width="3" height="10" fill={ink} />
          <rect x="10" y="3" width="3" height="10" fill={ink} />
        </>
      )}
    </svg>
  );
}
