'use client';
import { Code2, Globe, Search, ShoppingCart, Smartphone, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    num: '01', icon: Globe, name: 'Website Design & Development',
    desc: 'Custom high-performance websites built to convert visitors into customers. Built with Next.js, Framer, or Webflow.',
    tag: '2-4 weeks',
  },
  {
    num: '02', icon: Smartphone, name: 'Mobile-First Experience',
    desc: 'Pixel-perfect responsive layouts that look and feel great on every screen and device.',
    tag: 'Included',
  },
  {
    num: '03', icon: Zap, name: 'Performance Optimization',
    desc: 'Core Web Vitals tuning for faster load times, improved search rankings, and better user retention.',
    tag: '48h audits',
  },
  {
    num: '04', icon: Search, name: 'SEO & Analytics Setup',
    desc: 'Technical SEO configuration plus analytics setup so you can measure what is actually working.',
    tag: 'Included',
  },
  {
    num: '05', icon: ShoppingCart, name: 'E-Commerce Builds',
    desc: 'Revenue-focused Shopify and WooCommerce storefront experiences with optimized checkout flows.',
    tag: '3-6 weeks',
  },
  {
    num: '06', icon: Code2, name: 'Website Redesign',
    desc: 'A full upgrade from outdated UI to a modern, conversion-first web experience your users will love.',
    tag: '2-5 weeks',
  },
];

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="aw-label">services</p>
          <h2
            className="mt-4 max-w-xl text-[clamp(2rem,4vw,42px)] font-bold leading-[1.08] tracking-[-1.4px]"
            style={{ color: 'var(--color-obsidian)' }}
          >
            Everything you need to launch and grow.
          </h2>
        </div>
        <span className="aw-badge-muted">6 services</span>
      </div>

      <div className="mt-10" style={{ borderTop: '1px solid var(--color-fog)' }}>
        {services.map((svc, i) => {
          const Icon = svc.icon;
          const isH = hovered === i;
          return (
            <motion.div
              key={svc.num}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              animate={{ backgroundColor: isH ? '#09090b' : 'rgba(9, 9, 11, 0)' }}
              transition={{ duration: 0.18 }}
              className="cursor-pointer rounded-[16px]"
              style={{ borderBottom: '1px solid var(--color-fog)' }}
            >
              <div className="flex items-center gap-4 px-4 py-5">
                <motion.span
                  animate={{ color: isH ? 'rgba(255,255,255,0.2)' : 'var(--color-pebble)' }}
                  className="w-8 flex-shrink-0 text-[12px] font-bold tracking-[0.6px]"
                >
                  {svc.num}
                </motion.span>

                <motion.div
                  animate={{ backgroundColor: isH ? 'rgba(255,255,255,0.1)' : 'var(--color-fog)' }}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[12px]"
                >
                  <Icon size={17} color={isH ? '#fff' : 'var(--color-graphite)'} />
                </motion.div>

                <motion.h3
                  animate={{ color: isH ? '#fff' : 'var(--color-obsidian)' }}
                  className="flex-1 text-[16px] font-semibold tracking-[-0.32px] sm:text-[17px]"
                >
                  {svc.name}
                </motion.h3>

                <motion.span
                  animate={{
                    backgroundColor: isH ? 'rgba(255,255,255,0.1)' : 'var(--color-fog)',
                    color: isH ? 'rgba(255,255,255,0.7)' : 'var(--color-steel)',
                  }}
                  className="hidden rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.8px] sm:block"
                >
                  {svc.tag}
                </motion.span>

                <motion.span
                  animate={{ rotate: isH ? 45 : 0, color: isH ? '#ff5a00' : 'var(--color-ash)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="ml-1 flex-shrink-0 text-[18px] leading-none"
                >
                  &rarr;
                </motion.span>
              </div>

              <AnimatePresence>
                {isH && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p
                      className="px-4 pb-5 pl-[80px] text-[14px] leading-[1.6]"
                      style={{ color: 'var(--color-ash)' }}
                    >
                      {svc.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
