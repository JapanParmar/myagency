import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type ProjectsSectionProps = {
  scrollTo: (id: string) => void;
};

const ACCENT = { a: '#ff5a00', b: '#4e54c8', c: '#00b377' };

const projects = [
  {
    num: '01', category: 'E-Commerce / Shopify', name: 'Nextlevel Studio',
    desc: 'Complete e-commerce overhaul with a custom storefront and optimized checkout flow that drives measurable revenue.',
    results: ['+340% Revenue', '-40% Bounce'],
    accent: ACCENT.a,
  },
  {
    num: '02', category: 'Brand & Web Design', name: 'Aura Brand Identity',
    desc: 'Full brand system and marketing website for a wellness startup entering a competitive market.',
    results: ['+210% Leads', '4.9/5 Rating'],
    accent: ACCENT.b,
  },
  {
    num: '03', category: 'SaaS / Product', name: 'Solaris Digital',
    desc: 'SaaS onboarding redesign that dramatically improved trial-to-activation conversion rates.',
    results: ['+146% Activation', '60d Delivery'],
    accent: ACCENT.c,
  },
];

export default function ProjectsSection({ scrollTo }: Readonly<ProjectsSectionProps>) {
  return (
    <section id="projects" className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="aw-label">selected work</p>
          <h2
            className="mt-4 max-w-xl text-[clamp(2rem,4vw,42px)] font-bold leading-[1.08] tracking-[-1.4px]"
            style={{ color: 'var(--color-obsidian)' }}
          >
            Real projects, real results.
          </h2>
        </div>
        <button
          onClick={() => scrollTo('contact')}
          className="text-[14px] font-medium underline-offset-4 hover:underline"
          style={{ color: 'var(--color-slate)' }}
          type="button"
        >
          Start a project &rarr;
        </button>
      </div>

      <div className="mt-10 space-y-4">
        {projects.map((p, i) => (
          <motion.article
            key={p.num}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ x: 5 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: [0.19, 1, 0.22, 1] }}
            className="group flex cursor-pointer overflow-hidden rounded-[24px]"
            style={{
              backgroundColor: 'var(--color-snow)',
              boxShadow: 'rgb(228,228,231) 0px 1px 0px 0px inset',
            }}
          >
            {/* Colored left accent bar */}
            <div className="w-[6px] flex-shrink-0" style={{ backgroundColor: p.accent }} />

            <div className="flex flex-1 flex-wrap items-center gap-5 p-6 sm:flex-nowrap sm:gap-7 sm:p-7">
              {/* Faint number */}
              <span
                className="hidden flex-shrink-0 text-[60px] font-black leading-none tracking-[-2.5px] lg:block"
                style={{ color: 'var(--color-fog)' }}
              >
                {p.num}
              </span>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <span
                  className="inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.7px]"
                  style={{ backgroundColor: p.accent + '18', color: p.accent }}
                >
                  {p.category}
                </span>
                <h3
                  className="mt-2.5 text-[20px] font-bold leading-[1.2] tracking-[-0.5px] sm:text-[22px]"
                  style={{ color: 'var(--color-obsidian)' }}
                >
                  {p.name}
                </h3>
                <p
                  className="mt-2 max-w-xl text-[14px] leading-[1.58]"
                  style={{ color: 'var(--color-steel)' }}
                >
                  {p.desc}
                </p>
              </div>

              {/* Results + arrow */}
              <div className="flex flex-shrink-0 flex-col items-end gap-2">
                {p.results.map((r) => (
                  <span
                    key={r}
                    className="inline-flex rounded-full px-3 py-1 text-[12px] font-semibold"
                    style={{ backgroundColor: p.accent + '14', color: p.accent }}
                  >
                    {r}
                  </span>
                ))}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="mt-1.5 flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ backgroundColor: p.accent }}
                >
                  <ArrowUpRight size={15} color="#fff" />
                </motion.div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

