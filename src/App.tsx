import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowUpRight, Menu, MoonStar, SunMedium, X } from 'lucide-react';

type ThemeMode = 'light' | 'dark';

const navItems = [
  { label: 'Manifesto', id: 'manifesto' },
  { label: 'Work', id: 'work' },
  { label: 'System', id: 'system' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
];

const metrics = [
  { value: '12', label: 'years in motion' },
  { value: '48', label: 'launch systems' },
  { value: '03', label: 'disciplines unified' },
];

const principles = [
  {
    number: '01',
    title: 'Geometric clarity',
    text: 'Compositions are built on rigid grids, balanced asymmetry, and deliberate negative space.',
  },
  {
    number: '02',
    title: 'Monoline precision',
    text: 'Thin strokes, restrained hierarchy, and line-based devices keep every interaction calm and exact.',
  },
  {
    number: '03',
    title: 'Editorial rhythm',
    text: 'Large typographic contrasts, structured spacing, and slow reveals create a premium reading flow.',
  },
];

const projects = [
  {
    name: 'Northgrid System',
    category: 'Architecture studio',
    summary: 'A modular site system with precise grids, restrained motion, and a minimal content architecture.',
    outcome: 'Reduced visual noise while increasing inquiry quality.',
  },
  {
    name: 'Atlas Ritual',
    category: 'Luxury product launch',
    summary: 'Editorial storytelling for a launch campaign shaped by circles, axes, and measured pacing.',
    outcome: 'Established a calmer, more authoritative brand presence.',
  },
  {
    name: 'Vector House',
    category: 'Experimental brand lab',
    summary: 'A digital identity system that merges monoline graphics with a strict monochrome interface.',
    outcome: 'Created a signature visual language that scales across touchpoints.',
  },
];

const process = [
  {
    step: 'Concept',
    detail: 'We define the editorial voice, spatial logic, and geometric rules before any visual decisions are made.',
  },
  {
    step: 'Structure',
    detail: 'The interface is mapped on a strict responsive grid so every section keeps its balance across breakpoints.',
  },
  {
    step: 'Motion',
    detail: 'Transitions are slow and intentional, with line drawing, fades, and gentle hover states.',
  },
  {
    step: 'Refinement',
    detail: 'Every border, label, and typographic ratio is tuned until the system feels quiet and complete.',
  },
];

function App() {
  const reduceMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const sectionIds = useMemo(() => ['home', ...navItems.map((item) => item.id)], []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: '-18% 0px -48% 0px',
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--text)]">
      <AmbientGrid reducedMotion={Boolean(reduceMotion)} />

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[color:var(--bg)/0.78] backdrop-blur-md"
      >
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <button
            type="button"
            onClick={() => scrollTo('home')}
            className="group flex items-center gap-3 text-left"
          >
            <span className="font-heading text-[1rem] font-semibold uppercase tracking-[0.34em] text-[var(--text)] sm:text-[1.05rem]">
              Atelier Grid
            </span>
            <span className="hidden h-px w-10 bg-[var(--border)] transition-transform duration-300 group-hover:translate-x-1 md:block" />
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`relative text-[0.72rem] uppercase tracking-[0.3em] transition-colors duration-300 ${
                  activeSection === item.id ? 'text-[var(--text)]' : 'text-[var(--muted)]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-[var(--text)] transition-all duration-300 ${
                    activeSection === item.id ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border)] text-[var(--text)] transition-all duration-300 hover:border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)]"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <MoonStar size={16} /> : <SunMedium size={16} />}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border)] text-[var(--text)] md:hidden"
              aria-label="Open navigation"
            >
              <Menu size={18} />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="hidden h-11 items-center gap-2 border border-[var(--text)] px-4 text-[0.72rem] uppercase tracking-[0.28em] transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--bg)] lg:inline-flex"
            >
              Begin
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[color:var(--bg)/0.98] px-5 py-5 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <span className="font-heading text-sm uppercase tracking-[0.32em]">Atelier Grid</span>
              <button type="button" onClick={() => setMobileOpen(false)} className="border border-[var(--border)] p-3">
                <X size={18} />
              </button>
            </div>

            <div className="mt-10 flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="flex items-center justify-between border-b border-[var(--border)] pb-4 text-left text-2xl font-semibold tracking-tight"
                >
                  {item.label}
                  <ArrowUpRight size={18} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-20">
        <section id="home" className="mx-auto w-full max-w-7xl px-5 pb-20 pt-14 sm:px-8 lg:px-10 lg:pb-28 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-4xl">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="section-kicker"
              >
                Swiss / Bauhaus digital experience
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-4xl font-heading text-[clamp(3.5rem,10vw,8.8rem)] font-semibold leading-[0.92] tracking-[-0.08em]"
              >
                Calm geometry for
                <span className="block">premium digital brands.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 max-w-2xl text-[1rem] leading-8 text-[var(--muted)] sm:text-[1.08rem]"
              >
                A restrained, monoline interface built for architectural brands, creative studios,
                and luxury tech products. The system is designed around grid discipline, measured motion,
                and a quiet editorial rhythm.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <button type="button" onClick={() => scrollTo('work')} className="line-button line-button--filled">
                  View selected work
                </button>
                <button type="button" onClick={() => scrollTo('contact')} className="line-button">
                  Start a conversation
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="mt-14 grid gap-4 border-t border-[var(--border)] pt-6 sm:grid-cols-3"
              >
                {metrics.map((metric) => (
                  <div key={metric.label} className="space-y-2">
                    <div className="font-heading text-4xl font-semibold tracking-[-0.07em] sm:text-5xl">
                      {metric.value}
                    </div>
                    <div className="max-w-[11rem] text-[0.72rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-[34rem]"
            >
              <div className="mono-frame relative overflow-hidden bg-[var(--panel)] p-4 sm:p-6">
                <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-4">
                  <div className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                    <span className="h-2 w-2 rounded-full border border-[var(--text)]" />
                    Abstract geometry panel
                  </div>
                  <div className="text-[0.68rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                    01 / 06
                  </div>
                </div>

                <div className="relative aspect-[4/5] overflow-hidden border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.45),transparent)]">
                  <svg
                    viewBox="0 0 520 640"
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full"
                  >
                    <defs>
                      <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="520" height="640" fill="url(#hero-grid)" />
                    <motion.circle
                      cx="260"
                      cy="240"
                      r="150"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.85"
                      strokeWidth="1"
                      initial={reduceMotion ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
                      animate={reduceMotion ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.path
                      d="M120 370H400"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.9"
                      strokeWidth="1"
                      initial={reduceMotion ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
                      animate={reduceMotion ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.35, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.path
                      d="M260 110V530"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.55"
                      strokeWidth="1"
                      strokeDasharray="8 8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    />
                    <motion.path
                      d="M160 180C220 130 300 130 360 180"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.9"
                      strokeWidth="1"
                      initial={reduceMotion ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
                      animate={reduceMotion ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.rect
                      x="200"
                      y="274"
                      width="120"
                      height="120"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.75"
                      strokeWidth="1"
                      initial={reduceMotion ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
                      animate={reduceMotion ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>

                  <motion.div
                    animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                    transition={reduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-8 top-8 h-24 w-24 rounded-full border border-[var(--text)]"
                  />
                  <motion.div
                    animate={reduceMotion ? undefined : { rotate: [0, 8, 0] }}
                    transition={reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute right-10 top-12 h-12 w-12 border border-[var(--text)]"
                  />
                  <motion.div
                    animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
                    transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-14 left-10 h-16 w-16 rounded-full border border-[var(--text)]"
                  />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2 border-t border-[var(--border)] pt-4">
                    <div className="text-[0.68rem] uppercase tracking-[0.3em] text-[var(--muted)]">Mode</div>
                    <div className="font-heading text-lg tracking-[-0.04em]">Monochrome editorial system</div>
                  </div>
                  <div className="space-y-2 border-t border-[var(--border)] pt-4">
                    <div className="text-[0.68rem] uppercase tracking-[0.3em] text-[var(--muted)]">Motion</div>
                    <div className="font-heading text-lg tracking-[-0.04em]">Slow, measured, and precise</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="manifesto" className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-10 border-t border-[var(--border)] pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="section-kicker">Manifesto</p>
              <h2 className="mt-5 max-w-xl font-heading text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.07em]">
                Built like a studio wall, read like an editorial spread.
              </h2>
            </div>

            <div className="grid gap-4">
              {principles.map((principle) => (
                <motion.div
                  key={principle.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-4 border-t border-[var(--border)] py-5 sm:grid-cols-[auto,1fr]"
                >
                  <div className="font-heading text-[0.84rem] tracking-[0.34em] text-[var(--muted)]">
                    {principle.number}
                  </div>
                  <div>
                    <div className="font-heading text-2xl tracking-[-0.05em] sm:text-3xl">{principle.title}</div>
                    <p className="mt-3 max-w-2xl text-[0.98rem] leading-8 text-[var(--muted)] sm:text-[1.04rem]">
                      {principle.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="border-t border-[var(--border)] pt-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-kicker">Selected Work</p>
                <h2 className="mt-5 font-heading text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.07em]">
                  Quiet interfaces with a strong point of view.
                </h2>
              </div>
              <p className="max-w-xl text-[0.98rem] leading-8 text-[var(--muted)]">
                Each case study is presented as a precise row rather than a heavy card, keeping the composition open,
                architectural, and easy to scan.
              </p>
            </div>

            <div className="mt-12 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {projects.map((project, index) => (
                <motion.article
                  key={project.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.24 }}
                  transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 4 }}
                  className="group grid gap-6 px-0 py-6 lg:grid-cols-[0.18fr,0.42fr,0.4fr] lg:gap-8 lg:px-6"
                >
                  <div className="font-heading text-sm uppercase tracking-[0.34em] text-[var(--muted)]">
                    0{index + 1}
                  </div>
                  <div>
                    <div className="font-heading text-3xl tracking-[-0.06em] sm:text-4xl">{project.name}</div>
                    <div className="mt-3 text-[0.72rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                      {project.category}
                    </div>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-[1fr,auto] lg:items-end">
                    <p className="max-w-xl text-[0.98rem] leading-8 text-[var(--muted)]">{project.summary}</p>
                    <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.28em] text-[var(--text)]">
                      View detail <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                    <p className="max-w-md text-sm leading-7 text-[var(--text)]">{project.outcome}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="system" className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-10 border-t border-[var(--border)] pt-12 lg:grid-cols-[1fr,0.9fr] lg:gap-16">
            <div>
              <p className="section-kicker">System</p>
              <h2 className="mt-5 max-w-2xl font-heading text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.07em]">
                Small rules, repeated well, create the premium result.
              </h2>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  'Consistent stroke weight across icons, dividers, and geometric motifs.',
                  'Editorial spacing calibrated on a 12-column responsive grid.',
                  'Minimal hover effects that feel magnetic instead of decorative.',
                  'SVG-first abstract assets instead of generic stock imagery.',
                ].map((item) => (
                  <div key={item} className="border border-[var(--border)] p-5">
                    <div className="mb-5 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                      <span className="h-px w-8 bg-[var(--text)]" />
                      Design rule
                    </div>
                    <p className="text-[0.98rem] leading-8 text-[var(--text)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mono-frame grid gap-6 border border-[var(--border)] p-6"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <div className="text-[0.68rem] uppercase tracking-[0.3em] text-[var(--muted)]">Material palette</div>
                <div className="text-[0.68rem] uppercase tracking-[0.3em] text-[var(--muted)]">01 / 02</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">Background</span>
                  <span className="font-heading text-lg">#F8F7F4 / #0D0D0D</span>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <span className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">Typography</span>
                  <span className="font-heading text-lg">Space Grotesk / Inter</span>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <span className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">Borders</span>
                  <span className="font-heading text-lg">1px monoline only</span>
                </div>
              </div>

              <svg viewBox="0 0 360 220" aria-hidden="true" className="mt-2 h-56 w-full">
                <motion.circle
                  cx="180"
                  cy="110"
                  r="72"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={reduceMotion ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  whileInView={reduceMotion ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.path
                  d="M108 110H252"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={reduceMotion ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  whileInView={reduceMotion ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.05, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.path
                  d="M180 38V182"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.4"
                  strokeDasharray="7 9"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                />
              </svg>
            </motion.div>
          </div>
        </section>

        <section id="process" className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="border-t border-[var(--border)] pt-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-kicker">Process</p>
                <h2 className="mt-5 font-heading text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.07em]">
                  A measured sequence from concept to calibration.
                </h2>
              </div>
              <p className="max-w-xl text-[0.98rem] leading-8 text-[var(--muted)]">
                Motion never becomes ornamental. It only exists to guide the eye through the hierarchy and reinforce the system.
              </p>
            </div>

            <div className="mt-12 grid gap-0 border border-[var(--border)] lg:grid-cols-4">
              {process.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-[var(--border)] p-6 lg:border-b-0 lg:border-r last:border-r-0"
                >
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                    <span className="text-[0.68rem] uppercase tracking-[0.3em] text-[var(--muted)]">0{index + 1}</span>
                    <span className="h-2 w-2 rounded-full border border-[var(--text)]" />
                  </div>
                  <div className="mt-6 font-heading text-2xl tracking-[-0.05em]">{item.step}</div>
                  <p className="mt-4 text-[0.98rem] leading-8 text-[var(--muted)]">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-10 border-t border-[var(--border)] pt-12 lg:grid-cols-[0.92fr,1.08fr] lg:gap-16">
            <div>
              <p className="section-kicker">Contact</p>
              <h2 className="mt-5 max-w-xl font-heading text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.07em]">
                Start with a brief, precise message.
              </h2>
              <p className="mt-6 max-w-lg text-[0.98rem] leading-8 text-[var(--muted)]">
                This composition is designed to feel calm and exact. If you want to adapt it further, the next step is usually typography tuning,
                content editing, or swapping the geometric system for your brand language.
              </p>

              <div className="mt-10 space-y-4 border-t border-[var(--border)] pt-6">
                <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4 text-sm">
                  <span className="uppercase tracking-[0.28em] text-[var(--muted)]">Email</span>
                  <a href="mailto:hello@ateliergrid.studio" className="transition-colors hover:text-[var(--muted)]">
                    hello@ateliergrid.studio
                  </a>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4 text-sm">
                  <span className="uppercase tracking-[0.28em] text-[var(--muted)]">Timezone</span>
                  <span>Remote / Global</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4 text-sm">
                  <span className="uppercase tracking-[0.28em] text-[var(--muted)]">Availability</span>
                  <span>Strategy, UI systems, and launch direction</span>
                </div>
              </div>
            </div>

            <form
              className="mono-frame grid gap-5 border border-[var(--border)] p-6 sm:p-8"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-3 text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                  Name
                  <input className="input-field" type="text" name="name" placeholder="Your name" />
                </label>
                <label className="grid gap-3 text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                  Email
                  <input className="input-field" type="email" name="email" placeholder="you@example.com" />
                </label>
              </div>

              <label className="grid gap-3 text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                Project focus
                <input className="input-field" type="text" name="focus" placeholder="Website redesign, brand system, campaign page" />
              </label>

              <label className="grid gap-3 text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                Brief
                <textarea
                  className="input-field min-h-36 resize-none py-4"
                  name="brief"
                  placeholder="Tell us what should feel different after the redesign."
                />
              </label>

              <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-5">
                <button type="submit" className="line-button line-button--filled">
                  Send brief
                </button>
                <button type="button" onClick={() => scrollTo('home')} className="line-button">
                  Back to top
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] bg-[color:var(--bg)/0.6]">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-5 py-6 text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)] sm:px-8 lg:grid-cols-3 lg:px-10">
          <div>Atelier Grid</div>
          <div className="lg:text-center">Swiss / Bauhaus minimal experience</div>
          <div className="lg:text-right">Framer Motion, Lenis, Tailwind CSS</div>
        </div>
      </footer>
    </div>
  );
}

function AmbientGrid({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.03),transparent_44%),linear-gradient(90deg,rgba(0,0,0,0.028)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.028)_1px,transparent_1px)] bg-[length:100%_100%,88px_88px,88px_88px] opacity-70" />

      <motion.div
        animate={reducedMotion ? undefined : { y: [0, 14, 0] }}
        transition={reducedMotion ? undefined : { duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[6%] top-[12%] h-40 w-40 rounded-full border border-[var(--border)] opacity-60 sm:h-56 sm:w-56"
      />

      <motion.div
        animate={reducedMotion ? undefined : { rotate: [0, 9, 0] }}
        transition={reducedMotion ? undefined : { duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[8%] top-[22%] h-28 w-28 border border-[var(--border)] opacity-60 sm:h-40 sm:w-40"
      />

      <motion.div
        animate={reducedMotion ? undefined : { x: [0, -8, 0] }}
        transition={reducedMotion ? undefined : { duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[12%] right-[14%] h-24 w-24 rounded-full border border-[var(--border)] opacity-50 sm:h-36 sm:w-36"
      />
    </div>
  );
}

export default App;

