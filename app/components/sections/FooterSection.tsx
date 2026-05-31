'use client';

import { ArrowUpRight } from 'lucide-react';

type FooterSectionProps = {
  scrollTo: (id: string) => void;
};

const footerLinks = {
  Services: [
    { label: 'Brand Websites', id: 'services' },
    { label: 'E-Commerce Builds', id: 'services' },
    { label: 'SaaS Landing Pages', id: 'services' },
    { label: 'Conversion Audits', id: 'services' },
  ],
  Company: [
    { label: 'About', id: 'about' },
    { label: 'Our Process', id: 'process' },
    { label: 'Selected Work', id: 'projects' },
    { label: 'Client Reviews', id: 'testimonials' },
  ],
  Pricing: [
    { label: 'Starter Plan', id: 'pricing' },
    { label: 'Professional', id: 'pricing' },
    { label: 'Enterprise', id: 'pricing' },
    { label: 'Book a Call', id: 'contact' },
  ],
};

export default function FooterSection({ scrollTo }: Readonly<FooterSectionProps>) {
  return (
    <footer
      className="mx-4 mb-4 overflow-hidden rounded-[32px]"
      style={{ backgroundColor: 'var(--color-obsidian)' }}
    >
      {/* Top row */}
      <div className="mx-auto max-w-[1200px] px-8 pt-14 pb-10 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[22px] font-bold tracking-[-0.44px]" style={{ color: 'var(--color-snow)' }}>
                Pixora Studio
              </p>
              <p className="mt-2 text-[14px] leading-[1.55] tracking-[-0.14px]" style={{ color: 'var(--color-ash)' }}>
                We help ambitious businesses launch websites that generate leads, build trust, and grow revenue.
              </p>
            </div>

            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="group inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium transition-all"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--color-snow)', border: '1px solid rgba(255,255,255,0.14)' }}
            >
              Start a project
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <div className="flex gap-3">
              {['X', 'Li', 'Gh', 'Dr'].map((icon) => (
                <div
                  key={icon}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'var(--color-ash)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p
                className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em]"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {category}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      className="text-[14px] font-medium tracking-[-0.14px] transition-colors hover:opacity-70"
                      style={{ color: 'rgba(255,255,255,0.65)' }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-8 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />

      {/* Bottom row */}
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-8 py-6 lg:px-12">
        <p className="text-[13px] tracking-[-0.13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
          © {new Date().getFullYear()} Pixora Studio. All rights reserved.
        </p>
        <div className="flex gap-5">
          {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
            <button
              key={item}
              type="button"
              className="text-[13px] font-medium tracking-[-0.13px] transition-opacity hover:opacity-60"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
