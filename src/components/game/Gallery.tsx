import { motion } from "framer-motion";
import card1 from "@/assets/card-1.jpeg";
import card2 from "@/assets/card-2.jpeg";
import card3 from "@/assets/card-3.jpeg";
import card4 from "@/assets/card-4.JPG";
import card5 from "@/assets/card-5.JPG";
import card6 from "@/assets/card-6.JPG";
import { ElementIcon } from "@/components/svg/GameIcons";

const cards = [
  { 
    img: card1, 
    title: "Second Date", 
    caption: "Still a bit shy here, who knew this would be the start of our forever?", 
    type: "fairy" as const, 
    hp: 120 
  },
  { 
    img: card2, 
    title: "Graduation", 
    caption: "Feeling so proud and happy seeing you here 🎓",
    type: "electric" as const, 
    hp: 150 
  },
  { 
    img: card3, 
    title: "Work Days??", 
    caption: "Cannot more proud of you for landing your first job hihi kerennya! 🚀", 
    type: "fire" as const, 
    hp: 110 
  },
  { 
    img: card4, 
    title: "Sunny Outing", 
    caption: "Hoping we stay like this forever ☀️",
    type: "water" as const, 
    hp: 105 
  },
  { 
    img: card5, 
    title: "Sidang Day", 
    caption: "Thank you for being here with me and always supporting me 💐",
    type: "leaf" as const, 
    hp: 130 
  },
  { 
    img: card6, 
    title: "Never Ending", 
    caption: "Through all the fights and apologies, we made it through. Here we are, stronger than ever.", 
    type: "psychic" as const, 
    hp: 140 
  },
];

export function Gallery() {
  return (
    <section className="px-4 py-16 sm:py-20" style={{ background: "linear-gradient(180deg, var(--paper) 0%, var(--muted) 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <p className="font-pixel text-[10px] text-pokedex-red mb-2">// MEMORY LANE</p>
          <h2 className="font-pixel text-base sm:text-xl">Trainer's Gallery</h2>
          <p className="text-sm text-muted-foreground mt-2">A Pokédex of moments collected together.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="tcg-card"
            >
              <div className="p-3 pb-2 flex items-center justify-between">
                <span className="font-pixel text-[9px] text-ink/70">No. {String(i + 1).padStart(3, "0")}</span>
                <span className="font-pixel text-[10px] text-pokedex-red">HP {c.hp}</span>
              </div>
              <div className="mx-3 border-[3px] border-ink overflow-hidden bg-pastel-blue">
                <img src={c.img} alt={c.title} loading="lazy" width={512} height={512} className="w-full h-48 sm:h-56 object-cover" />
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6"><ElementIcon type={c.type} /></div>
                  <h3 className="font-pixel text-xs">{c.title}</h3>
                </div>
                <div className="border-[3px] border-ink rounded-md bg-paper p-3">
                  <p className="text-sm leading-relaxed">{c.caption}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
