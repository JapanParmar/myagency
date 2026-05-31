'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plus, Sparkles, Shapes } from 'lucide-react';
import { renderCanvas } from '@/components/ui/canvas';
import SketchButton from '../ui/SketchButton';

type HeroSectionProps = {
  reduceMotion: boolean;
  scrollTo: (id: string) => void;
};

export default function HeroSection({ reduceMotion, scrollTo }: Readonly<HeroSectionProps>) {
  useEffect(() => {
    if (!reduceMotion) {
      renderCanvas();
    }
  }, [reduceMotion]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-5 text-center"
      style={{ backgroundColor: 'var(--color-mist)' }}
    >
      {/* ── Ambient glow blobs ── */}
      <motion.div
        animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.15, 0.22, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,90,0,0.18) 0%, transparent 65%)' }}
      />
      <motion.div
        animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.1, 0.16, 0.1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="pointer-events-none absolute -bottom-20 -right-20 h-[500px] w-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(9,9,11,0.12) 0%, transparent 65%)' }}
      />

      {/* ── Top Badge Chip ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        className="z-10 mb-6 mt-10 sm:justify-center md:mb-4 md:mt-16"
      >
        <div
          className="relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-white px-3 py-1.5 text-xs font-medium tracking-tight shadow-sm"
          style={{ borderColor: 'var(--color-pebble)', color: 'var(--color-slate)' }}
        >
          <Shapes className="h-4 w-4 p-0.5" style={{ color: 'var(--color-ember)' }} />
          Introducing Pixora Studio.
          <button
            onClick={() => scrollTo('projects')}
            className="ml-1 inline-flex items-center font-bold"
            style={{ color: 'var(--color-ember)' }}
          >
            Explore{' '}
            <span aria-hidden="true" className="ml-0.5">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </motion.div>

      {/* ── Main Content Container ── */}
      <div className="z-10 mb-10 mt-4 max-w-4xl md:mt-6">
        <div className="px-2">
          {/* Outer bordered title box with Corner Pluses */}
          <div
            className="relative mx-auto border p-6 md:px-12 md:py-16"
            style={{
              borderColor: 'var(--color-pebble)',
              background: 'radial-gradient(80rem 48rem at center, var(--color-snow) 0%, transparent 100%)',
              borderRadius: '24px',
            }}
          >
            {/* 4 Corner Plus Icons */}
            <Plus
              strokeWidth={3}
              className="absolute -left-3.5 -top-3.5 h-7 w-7"
              style={{ color: 'var(--color-ember)' }}
            />
            <Plus
              strokeWidth={3}
              className="absolute -bottom-3.5 -left-3.5 h-7 w-7"
              style={{ color: 'var(--color-ember)' }}
            />
            <Plus
              strokeWidth={3}
              className="absolute -right-3.5 -top-3.5 h-7 w-7"
              style={{ color: 'var(--color-ember)' }}
            />
            <Plus
              strokeWidth={3}
              className="absolute -bottom-3.5 -right-3.5 h-7 w-7"
              style={{ color: 'var(--color-ember)' }}
            />

            {/* Headline */}
            <h1
              className="font-display select-none text-center text-4xl font-bold leading-none tracking-tight text-[var(--color-obsidian)] sm:text-5xl md:text-7xl lg:text-7xl"
              style={{ letterSpacing: '-2.5px' }}
            >
              Your complete platform for Web Development.
            </h1>

            {/* Availability indicator */}
            <div className="mt-6 flex items-center justify-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: 'var(--color-meadow-green)' }}></span>
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--color-meadow-green)' }}></span>
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-meadow-green)' }}>
                Available Now
              </p>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="mt-8 text-xl font-medium tracking-tight text-[var(--color-slate)] sm:text-2xl">
          Welcome to our website crafting studio! We are{' '}
          <span className="font-bold text-[var(--color-obsidian)]">Pixora</span>
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mb-12 mt-4 max-w-2xl px-4 text-sm leading-relaxed text-[var(--color-steel)] sm:px-6 sm:text-base md:max-w-3xl">
          We design and engineer high-converting digital solutions, custom websites, and interactive experiences that empower ambitious brands to lead their industries.
        </p>

        {/* Action CTAs */}
        <div className="flex justify-center gap-3">
          <SketchButton filled onClick={() => scrollTo('contact')}>
            Start Project
          </SketchButton>
          <SketchButton onClick={() => scrollTo('pricing')}>
            Book a call
          </SketchButton>
        </div>
      </div>

      {/* Interactive canvas animation trailing the mouse */}
      <canvas
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60"
        id="canvas"
        style={{ mixBlendMode: 'multiply' }}
      ></canvas>
    </section>
  );
}
