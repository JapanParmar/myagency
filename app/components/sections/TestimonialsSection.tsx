'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Pixora transformed our digital presence completely. The team delivered a stunning website that increased our conversions by over 200% in the first three months.',
    author: 'Sarah Chen',
    role: 'CEO, NovaTech',
    avatar: 'SC',
    avatarBg: '#ff5a00',
    rating: 5,
    company: 'NovaTech',
  },
  {
    quote: 'Working with Pixora was the best investment we made last year. They understand not just design but business growth - every element has a purpose.',
    author: 'Marcus Rodriguez',
    role: 'Founder, Orbit Labs',
    avatar: 'MR',
    avatarBg: '#4e54c8',
    rating: 5,
    company: 'Orbit Labs',
  },
  {
    quote: 'The attention to detail is extraordinary. Our Shopify store went from average to industry-leading in 14 days. Customers consistently compliment the UX.',
    author: 'Emma Williams',
    role: 'Head of Brand, Luma',
    avatar: 'EW',
    avatarBg: '#00b377',
    rating: 5,
    company: 'Luma Skincare',
  },
  {
    quote: 'Fast, professional, and genuinely passionate about making things great. I have worked with three agencies before - Pixora is on another level entirely.',
    author: 'David Kim',
    role: 'CTO, Pulse Analytics',
    avatar: 'DK',
    avatarBg: '#9333ea',
    rating: 5,
    company: 'Pulse Analytics',
  },
  {
    quote: 'From the first strategy call to launch day, the whole process was seamless. They nailed our brand vision and delivered it 3 days ahead of schedule.',
    author: 'Priya Sharma',
    role: 'Marketing Director, Vantage',
    avatar: 'PS',
    avatarBg: '#e11d48',
    rating: 5,
    company: 'Vantage',
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [dragDir, setDragDir] = useState<1 | -1>(1);

  const prev = useCallback(() => {
    setDragDir(-1);
    setActive(i => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  const next = useCallback(() => {
    setDragDir(1);
    setActive(i => (i + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const current = testimonials[active];

  return (
    <section id="testimonials" className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="aw-label">testimonials</p>
          <h2
            className="mt-4 max-w-xl text-[clamp(2rem,4vw,42px)] font-bold leading-[1.08] tracking-[-1.4px]"
            style={{ color: 'var(--color-obsidian)' }}
          >
            Clients who believe in what we build.
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="#ff5a00" stroke="none" />
          ))}
          <span className="ml-1.5 text-[14px] font-medium" style={{ color: 'var(--color-slate)' }}>
            4.9 out of 5
          </span>
        </div>
      </div>

      {/* Big featured testimonial */}
      <div
        className="relative mt-10 overflow-hidden rounded-[32px]"
        style={{ backgroundColor: 'var(--color-obsidian)' }}
      >
        {/* Dot grid bg */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Glow */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 h-[450px] w-[450px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,90,0,0.15) 0%, transparent 60%)' }}
        />

        <div className="relative px-7 py-10 sm:px-12 sm:py-12 lg:px-16 lg:py-14">
          {/* Large quote mark */}
          <span
            className="pointer-events-none absolute top-6 left-10 select-none font-serif text-[120px] leading-none opacity-[0.06]"
            style={{ color: '#fff' }}
          >
            "
          </span>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, x: dragDir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -dragDir * 40 }}
              transition={{ duration: 0.42, ease: [0.19, 1, 0.22, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_e, info) => {
                if (info.offset.x < -50) next();
                else if (info.offset.x > 50) prev();
              }}
              className="cursor-grab select-none active:cursor-grabbing"
            >
              <blockquote
                className="max-w-3xl text-[clamp(1.05rem,2.1vw,20px)] font-medium leading-[1.6] tracking-[-0.3px]"
                style={{ color: 'var(--color-fog)' }}
              >
                "{current.quote}"
              </blockquote>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-[15px] font-bold text-white"
                  style={{ backgroundColor: current.avatarBg }}
                >
                  {current.avatar}
                </div>
                <div>
                  <p
                    className="text-[15px] font-semibold leading-none tracking-[-0.15px]"
                    style={{ color: 'var(--color-snow)' }}
                  >
                    {current.author}
                  </p>
                  <p className="mt-1.5 text-[13px]" style={{ color: 'var(--color-ash)' }}>
                    {current.role} � {current.company}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#ff5a00" stroke="none" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--color-ash)' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.14)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--color-ash)' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.14)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDragDir(i > active ? 1 : -1); setActive(i); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="rounded-full transition-all duration-200"
                  style={{
                    backgroundColor: i === active ? '#ff5a00' : 'rgba(255,255,255,0.2)',
                    width: i === active ? '20px' : '7px',
                    height: '7px',
                  }}
                />
              ))}
            </div>

            <span className="ml-auto text-[13px]" style={{ color: 'var(--color-ash)' }}>
              {active + 1} / {testimonials.length}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom row: 3 small cards */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {testimonials.slice(0, 3).map((t, i) => (
          <motion.button
            key={t.author}
            onClick={() => { setDragDir(i > active ? 1 : -1); setActive(i); }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            whileHover={{ y: -3 }}
            className="group rounded-[22px] p-5 text-left transition-colors"
            style={{
              backgroundColor: active === i ? 'var(--color-snow)' : 'var(--color-fog)',
              boxShadow: active === i ? 'rgb(228,228,231) 0px 1px 0px 0px inset' : 'none',
              border: `1px solid ${active === i ? 'var(--color-pebble)' : 'transparent'}`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                style={{ backgroundColor: t.avatarBg }}
              >
                {t.avatar}
              </div>
              <div>
                <p
                  className="text-[13px] font-semibold leading-none"
                  style={{ color: 'var(--color-obsidian)' }}
                >
                  {t.author}
                </p>
                <p className="mt-1 text-[11px]" style={{ color: 'var(--color-steel)' }}>
                  {t.company}
                </p>
              </div>
            </div>
            <p
              className="mt-3 line-clamp-2 text-[13px] leading-[1.5]"
              style={{ color: 'var(--color-slate)' }}
            >
              {t.quote}
            </p>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
