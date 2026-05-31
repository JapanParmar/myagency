import { motion } from 'framer-motion';

const stats = [
  { value: '150+', label: 'Projects delivered', sub: 'Across 12+ industries' },
  { value: '4.9', label: 'Average rating', sub: 'From 80+ client reviews' },
  { value: '14d', label: 'Avg. launch time', sub: 'From kickoff to live' },
];

const highlights = [
  'Full-stack design & development',
  'Next.js, Framer & Webflow specialists',
  'Dedicated project manager per client',
  'Launch-ready in 14 days on average',
];

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 lg:px-10 lg:py-24">
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr] lg:items-stretch">

        {/* Left: story panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
          className="rounded-[32px] p-8 sm:p-10 lg:p-12"
          style={{ backgroundColor: 'var(--color-fog)' }}
        >
          <p className="aw-label">about pixora</p>
          <h2
            className="mt-4 text-[clamp(1.9rem,4vw,44px)] font-bold leading-[1.08] tracking-[-1.4px]"
            style={{ color: 'var(--color-obsidian)' }}
          >
            We make brands feel at home on the internet.
          </h2>
          <p
            className="mt-5 max-w-lg text-[15px] leading-[1.65]"
            style={{ color: 'var(--color-steel)' }}
          >
            Pixora is a boutique digital studio helping growth-stage startups and established brands
            build exceptional web experiences - combining design thinking with engineering precision.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {highlights.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 + i * 0.06 }}
                className="flex items-start gap-2.5 rounded-[16px] p-3.5"
                style={{ backgroundColor: 'var(--color-snow)' }}
              >
                <span
                  className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: 'var(--color-obsidian)', color: '#fff' }}
                >
                  +
                </span>
                <span className="text-[13px] leading-[1.45]" style={{ color: 'var(--color-graphite)' }}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="aw-badge">Est. 2019</span>
            <span className="aw-badge-muted">Remote-first</span>
            <span className="aw-badge-muted">NYC based</span>
          </div>
        </motion.div>

        {/* Right: stat stack */}
        <div className="flex flex-row gap-4 lg:flex-col">
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-1 flex-col justify-center rounded-[28px] p-5 sm:p-7"
              style={{
                backgroundColor: i === 0 ? 'var(--color-obsidian)' : 'var(--color-snow)',
                boxShadow: i !== 0 ? 'rgb(228,228,231) 0px 1px 0px 0px inset' : 'none',
              }}
            >
              <p
                className="text-[36px] font-black leading-none tracking-[-2px] sm:text-[48px]"
                style={{ color: i === 0 ? 'var(--color-snow)' : 'var(--color-obsidian)' }}
              >
                {s.value}
              </p>
              <p
                className="mt-2 text-[13px] font-semibold sm:text-[15px]"
                style={{ color: i === 0 ? 'var(--color-ash)' : 'var(--color-steel)' }}
              >
                {s.label}
              </p>
              <p
                className="mt-0.5 text-[11px] sm:text-[12px]"
                style={{ color: i === 0 ? 'rgba(255,255,255,0.3)' : 'var(--color-pebble)' }}
              >
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
