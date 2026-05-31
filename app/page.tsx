'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { Menu, X } from 'lucide-react';
import AboutSection from './components/sections/AboutSection';
import BackgroundDoodles from './components/BackgroundDoodles';
import BrandMarqueeSection from './components/sections/BrandMarqueeSection';
import ContactSection from './components/sections/ContactSection';
import FooterSection from './components/sections/FooterSection';
import HeroSection from './components/sections/HeroSection';
import PricingSection from './components/sections/PricingSection';
import ProcessSection from './components/sections/ProcessSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ServicesSection from './components/sections/ServicesSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import SectionDivider from './components/ui/SectionDivider';
import SketchButton from './components/ui/SketchButton';

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Process', id: 'process' },
  { label: 'Reviews', id: 'testimonials' },
  { label: 'Pricing', id: 'pricing' },
];

export default function Page() {
  const reduceMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const sectionIds = useMemo(() => ['hero', ...navItems.map((item) => item.id), 'contact'], []);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.09,
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
      { threshold: 0.34, rootMargin: '-14% 0px -42% 0px' }
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
    <div className="relative min-h-screen overflow-x-clip" style={{ backgroundColor: 'var(--color-mist)', color: 'var(--color-ink)' }}>
      <BackgroundDoodles reducedMotion={Boolean(reduceMotion)} />

      {/* -- Nav -- */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ backgroundColor: 'rgba(244, 244, 245, 0.88)', borderBottom: '1px solid var(--color-fog)' }}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
          <button
            type="button"
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 text-left"
          >
            <span className="text-[15px] font-semibold tracking-[-0.3px]" style={{ color: 'var(--color-obsidian)' }}>
              Pixora Studio
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className="rounded-full px-4 py-2 text-[14px] font-medium tracking-[-0.14px] transition-colors duration-150"
                style={{
                  color: activeSection === item.id ? 'var(--color-obsidian)' : 'var(--color-steel)',
                  backgroundColor: activeSection === item.id ? 'var(--color-fog)' : 'transparent',
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <SketchButton className="hidden md:inline-flex" onClick={() => scrollTo('contact')} filled>
              Book a call
            </SketchButton>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full md:hidden"
              style={{ backgroundColor: 'var(--color-fog)' }}
              aria-label="Open menu"
            >
              <Menu size={17} />
            </button>
          </div>
        </div>
      </header>

      {/* -- Mobile Menu -- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[80] px-5 py-5 md:hidden"
            style={{ backgroundColor: 'var(--color-snow)' }}
          >
            <div className="flex items-center justify-between pb-5" style={{ borderBottom: '1px solid var(--color-fog)' }}>
              <span className="text-[15px] font-semibold tracking-[-0.3px]" style={{ color: 'var(--color-obsidian)' }}>
                Pixora Studio
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: 'var(--color-fog)' }}
              >
                <X size={17} />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-1">
              {[...navItems, { label: 'Contact', id: 'contact' }].map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="flex items-center py-4 text-left text-[20px] font-medium tracking-[-0.4px] transition-colors"
                  style={{ color: 'var(--color-obsidian)', borderBottom: '1px solid var(--color-fog)' }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="mt-8">
              <SketchButton onClick={() => scrollTo('contact')} filled>
                Book a call
              </SketchButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -- Sections -- */}
      <main>
        <HeroSection reduceMotion={Boolean(reduceMotion)} scrollTo={scrollTo} />
        <BrandMarqueeSection />
        <SectionDivider label="about the agency" />
        <AboutSection />
        <SectionDivider label="our core services" />
        <ServicesSection />
        <SectionDivider label="selected projects" />
        <ProjectsSection scrollTo={scrollTo} />
        <SectionDivider label="our process" />
        <ProcessSection reduceMotion={Boolean(reduceMotion)} />
        <SectionDivider label="client testimonials" />
        <TestimonialsSection />
        <SectionDivider label="pricing plans" />
        <PricingSection scrollTo={scrollTo} />
        <SectionDivider label="say hello" />
        <ContactSection />
      </main>

      <FooterSection scrollTo={scrollTo} />
    </div>
  );
}
