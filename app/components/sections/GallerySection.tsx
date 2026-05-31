import { motion } from 'framer-motion';

const gallery = [
  {
    title: 'Brand pages that feel sketched in the margin',
    note: 'Editorial hero, playful copy, and hand-drawn CTAs.',
    accent: 'bg-[var(--soft-yellow)]',
  },
  {
    title: 'Illustrated sections with human warmth',
    note: 'Notebooks, sticky tape, and soft motion cues.',
    accent: 'bg-[var(--soft-blue)]',
  },
  {
    title: 'Creative layouts with premium pacing',
    note: 'Asymmetry balanced by whitespace and line rhythm.',
    accent: 'bg-[var(--soft-pink)]',
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="handwritten-label">image-led storytelling</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,5.2rem)] leading-[0.95] tracking-[-0.06em]">
            Doodles, boards, and hand-made visual rhythm.
          </h2>
        </div>
        <p className="max-w-xl text-lg leading-8 text-[var(--muted)]">
          Images appear like pages torn from a notebook: framed, annotated, and offset just enough to feel handcrafted.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {gallery.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20, rotate: index % 2 === 0 ? -2 : 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 1.5 }}
            whileHover={{ rotate: 0, y: -6 }}
            viewport={{ once: true, amount: 0.26 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="sketch-card overflow-hidden bg-[var(--paper-2)]"
          >
            <div className={`h-3 ${item.accent}`} />
            <div className="p-4">
              <div className="relative overflow-hidden rounded-[22px_16px_24px_18px] border-2 border-[var(--ink)] bg-white">
                <img src="/doodle-note.svg" alt="Hand-drawn doodle note" className="w-full object-cover" />
                <div className="absolute left-4 top-4 rounded-full border-2 border-[var(--ink)] bg-[var(--paper)] px-3 py-1 font-display text-[0.64rem] uppercase tracking-[0.26em] shadow-[3px_3px_0_0_var(--ink)]">
                  page {index + 1}
                </div>
              </div>

              <h3 className="mt-5 font-display text-2xl leading-tight tracking-[-0.04em]">{item.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-7 text-[var(--muted)]">{item.note}</p>

              <div className="mt-5 flex items-center justify-between border-t-2 border-dashed border-[var(--ink)] pt-4 text-[0.72rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                <span>illustrated section</span>
                <span>hover for a bounce</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
