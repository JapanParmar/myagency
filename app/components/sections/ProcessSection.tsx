import { motion } from 'framer-motion';

const steps = [
  {
    num: '01', title: 'Discovery',
    text: 'We start with a deep-dive call to understand your goals, users, and competitive landscape.',
    accent: '#ff5a00',
  },
  {
    num: '02', title: 'Strategy & Wireframes',
    text: 'We map out the site structure, user flows, and wireframes before any visual design begins.',
    accent: '#ffbb26',
  },
  {
    num: '03', title: 'Design & Build',
    text: 'High-fidelity design and development run in parallel for fast, iterative feedback cycles.',
    accent: '#00ca48',
  },
  {
    num: '04', title: 'Launch & Support',
    text: 'We handle deployment, QA testing, and post-launch support to ensure everything runs smoothly.',
    accent: '#a78bfa',
  },
];

export default function ProcessSection({ reduceMotion }: Readonly<{ reduceMotion: boolean }>) {
  return (
    <section
      id="process"
      className="overflow-hidden"
      style={{ backgroundColor: 'var(--color-obsidian)' }}
    >
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="aw-label" style={{ color: 'rgba(255,255,255,0.28)' }}>process</p>
            <h2
              className="mt-4 max-w-xl text-[clamp(2rem,4vw,42px)] font-bold leading-[1.08] tracking-[-1.4px]"
              style={{ color: 'var(--color-snow)' }}
            >
              From idea to launch in four clear steps.
            </h2>
          </div>
          <span className="aw-badge-outline">Avg. 14-day delivery</span>
        </div>

        {/* Timeline */}
        <div className="relative mt-14">
          {/* Background connector line (desktop) */}
          <div
            className="absolute top-6 hidden lg:block"
            style={{
              left: '24px',
              right: '20%',
              height: '2px',
              backgroundColor: 'rgba(255,255,255,0.07)',
            }}
          >
            <motion.div
              className="h-full origin-left"
              style={{ backgroundColor: 'var(--color-ember)' }}
              initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1] }}
            />
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: reduceMotion ? 0 : i * 0.12, ease: [0.19, 1, 0.22, 1] }}
                className="group relative flex flex-col"
              >
                {/* Step circle */}
                <div
                  className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-[14px] font-bold"
                  style={{
                    backgroundColor: 'var(--color-snow)',
                    color: 'var(--color-obsidian)',
                    outline: `3px solid ${step.accent}`,
                    outlineOffset: '3px',
                  }}
                >
                  {step.num}
                </div>

                <h3
                  className="mt-6 text-[18px] font-bold leading-[1.2] tracking-[-0.36px]"
                  style={{ color: 'var(--color-snow)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-3 flex-1 text-[14px] leading-[1.6]"
                  style={{ color: 'var(--color-ash)' }}
                >
                  {step.text}
                </p>

                {/* Colored accent bar */}
                <motion.div
                  className="mt-6 h-1 rounded-full"
                  style={{ backgroundColor: step.accent, width: '32px' }}
                  initial={reduceMotion ? {} : { width: 0 }}
                  whileInView={{ width: 32 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

