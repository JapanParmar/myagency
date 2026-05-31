import { motion } from 'framer-motion';
import { PenTool } from 'lucide-react';

const principles = [
  {
    title: 'Organic layout flow',
    text: 'The grid stays loose on purpose, so the interface feels hand-arranged instead of mechanically stacked.',
  },
  {
    title: 'Imperfect line work',
    text: 'Cards, buttons, and dividers use irregular borders, scribbles, and playful offsets to feel drawn by hand.',
  },
  {
    title: 'Creative notebook energy',
    text: 'A mix of sticky notes, doodles, annotations, and image boards turns the page into an interactive sketchbook.',
  },
];

export default function SketchbookSection() {
  return (
    <section id="sketchbook" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="sticky top-28 space-y-6 self-start">
          <p className="handwritten-label">creative system</p>
          <h2 className="font-display text-[clamp(2.2rem,5vw,5rem)] leading-[0.96] tracking-[-0.06em]">
            Built like a sketchbook spread, not a corporate grid.
          </h2>
          <p className="max-w-lg text-lg leading-8 text-[var(--muted)]">
            The layout is intentionally imperfect. Blocks float, notes overlap, and doodles interrupt the page in a way that feels expressive and alive.
          </p>

          <div className="grid gap-3">
            {['Hand-drawn borders', 'Messy-clean composition', 'Notebook-style annotations'].map((item) => (
              <div key={item} className="scribble-chip">
                <PenTool size={14} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
              whileHover={{ rotate: 0, y: -4, scale: 1.01 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
              className={`sketch-card ${index === 0 ? 'sm:col-span-2' : ''} bg-[var(--paper-2)]`}
            >
              <div className="flex items-center justify-between border-b-2 border-[var(--ink)] px-5 py-4">
                <span className="font-display text-sm uppercase tracking-[0.28em]">0{index + 1}</span>
                <span className="h-4 w-4 rounded-full border-2 border-[var(--ink)] bg-[var(--soft-blue)]" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-3xl leading-tight tracking-[-0.04em]">{item.title}</h3>
                <p className="mt-4 text-[1rem] leading-7 text-[var(--muted)]">{item.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
