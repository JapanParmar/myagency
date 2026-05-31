'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

const services = [
  'Website Design',
  'Mobile Experience',
  'SEO and Performance',
  'E-Commerce',
  'Redesign',
];

export default function ContactSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggle(s: string) {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">

        {/* Left: dark obsidian panel */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="relative overflow-hidden rounded-[32px] p-8 sm:p-10 lg:p-12"
          style={{ backgroundColor: 'var(--color-obsidian)' }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />
          <img src="/doodle-note.svg" alt="" aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 opacity-[0.08]" style={{ mixBlendMode: 'screen' }} />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,90,0,0.18) 0%, transparent 65%)' }} />

          <div className="relative flex h-full flex-col">
            <p className="aw-label" style={{ color: 'rgba(255,255,255,0.35)' }}>let&apos;s talk</p>
            <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,44px)] font-bold leading-[1.08] tracking-[-1.4px]" style={{ color: 'var(--color-snow)' }}>
              Got a project in mind? Let&apos;s make it real.
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-[1.65]" style={{ color: 'var(--color-ash)' }}>
              Tell us about your project and we&apos;ll get back within 24 hours with a tailored proposal.
            </p>
            <div className="mt-8 space-y-4">
              {[{ icon: Mail, label: 'hello@pixora.studio' }, { icon: MapPin, label: 'Remote-first. Based in NYC' }, { icon: Clock, label: 'Mon-Fri, 9am-6pm EST' }].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}>
                    <Icon size={14} color="var(--color-ash)" />
                  </div>
                  <span className="text-[14px]" style={{ color: 'var(--color-ash)' }}>{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-12">
              <motion.div whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }} className="flex items-center gap-2" style={{ color: 'var(--color-ember)' }}>
                <span className="text-[14px] font-semibold">View our work</span>
                <ArrowUpRight size={16} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right: white form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.19, 1, 0.22, 1] }}
          className="rounded-[32px] p-8 sm:p-10"
          style={{ backgroundColor: 'var(--color-snow)', boxShadow: 'rgb(228,228,231) 0px 1px 0px 0px inset' }}
        >
          {submitted ? (
            <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
              <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="flex h-14 w-14 items-center justify-center rounded-full text-[24px]" style={{ backgroundColor: 'var(--color-obsidian)', color: '#fff' }}>
                &#10003;
              </motion.div>
              <h3 className="mt-5 text-[22px] font-bold" style={{ color: 'var(--color-obsidian)' }}>Message received!</h3>
              <p className="mt-2 max-w-xs text-[14px] leading-[1.58]" style={{ color: 'var(--color-steel)' }}>We will review your inquiry and get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="aw-label">Your name</label>
                  <input type="text" required placeholder="Alex Johnson" className="aw-input" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="aw-label">Email address</label>
                  <input type="email" required placeholder="alex@company.com" className="aw-input" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="aw-label">Company / Project</label>
                <input type="text" placeholder="Company or project name" className="aw-input" />
              </div>
              <div className="flex flex-col gap-2.5">
                <p className="aw-label">Services needed</p>
                <div className="flex flex-wrap gap-2">
                  {services.map(s => {
                    const isActive = selected.includes(s);
                    return (
                      <motion.button type="button" key={s} onClick={() => toggle(s)} whileTap={{ scale: 0.95 }}
                        className="rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-all duration-150"
                        style={{ backgroundColor: isActive ? 'var(--color-obsidian)' : 'var(--color-fog)', color: isActive ? 'var(--color-snow)' : 'var(--color-slate)', borderColor: isActive ? 'var(--color-obsidian)' : 'var(--color-pebble)' }}>
                        {s}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="aw-label">Message</label>
                <textarea rows={4} required placeholder="Tell us about your project goals, timeline, and budget..." className="aw-input resize-none" />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }} className="aw-btn-primary w-full justify-center py-3.5 text-[15px]">
                Send message <ArrowUpRight size={15} className="ml-1.5" />
              </motion.button>
              <p className="text-center text-[12px]" style={{ color: 'var(--color-steel)' }}>No spam, no commitment. Just a friendly conversation.</p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
