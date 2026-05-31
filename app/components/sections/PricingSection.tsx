import { CheckCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import SketchButton from '../ui/SketchButton';

type BillingType = 'one-time' | 'monthly';

const plans = [
  {
    name: 'Starter',
    tagline: 'Perfect for small business launches.',
    oneTime: '$1,499',
    monthly: '$299',
    features: ['Up to 5 pages', 'Mobile responsive', 'Basic SEO setup', '2 rounds of revisions', '30-day support'],
    highlight: false,
  },
  {
    name: 'Professional',
    tagline: 'For growth-focused teams.',
    oneTime: '$3,499',
    monthly: '$699',
    features: ['Up to 15 pages', 'Full SEO setup', 'CMS integration', 'E-commerce ready', 'Unlimited revisions'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    tagline: 'Custom builds for ambitious companies.',
    oneTime: '$7,999+',
    monthly: '$1,499',
    features: ['Unlimited pages', 'Custom integrations', 'Priority delivery', 'Dedicated project manager', '90-day support'],
    highlight: false,
  },
];

type PricingSectionProps = {
  scrollTo: (id: string) => void;
};

export default function PricingSection({ scrollTo }: Readonly<PricingSectionProps>) {
  const [billing, setBilling] = useState<BillingType>('one-time');

  return (
    <section id="pricing" className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
      <p className="aw-label">pricing</p>
      <h2
        className="mt-4 max-w-4xl text-[clamp(2rem,4vw,42px)] font-bold leading-[1.08] tracking-[-1.4px]"
        style={{ color: 'var(--color-obsidian)' }}
      >
        Transparent pricing for agency-level websites.
      </h2>

      <div
        className="mt-8 inline-flex rounded-full p-1"
        style={{ backgroundColor: 'var(--color-fog)' }}
      >
        {(['one-time', 'monthly'] as BillingType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setBilling(type)}
            className="rounded-full px-5 py-2 text-[13px] font-medium tracking-[-0.17px] transition-colors duration-200"
            style={{
              backgroundColor: billing === type ? 'var(--color-obsidian)' : 'transparent',
              color: billing === type ? '#ffffff' : 'var(--color-ash)',
            }}
          >
            {type === 'one-time' ? 'One-time' : 'Monthly'}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.article
            key={plan.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 0.5, delay: index * 0.04, ease: [0.19, 1, 0.22, 1] }}
            className={`aw-card flex flex-col${plan.highlight ? ' aw-card-dark' : ''}`}
            style={plan.highlight ? { boxShadow: 'var(--shadow-btn-primary)' } : {}}
          >
            {plan.highlight && (
              <div className="mb-3 -mt-2">
                <span className={plan.highlight ? 'aw-badge-outline' : 'aw-badge-ember'}>
                  Most popular
                </span>
              </div>
            )}
            <p
              className="text-[20px] font-semibold leading-[1.2] tracking-[-0.4px]"
              style={{ color: plan.highlight ? 'var(--color-snow)' : 'var(--color-obsidian)' }}
            >
              {plan.name}
            </p>
            <p className="mt-2 text-[14px] leading-[1.47] tracking-[-0.14px]" style={{ color: plan.highlight ? 'var(--color-ash)' : 'var(--color-steel)' }}>
              {plan.tagline}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={billing}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="text-[40px] font-bold leading-[1.09] tracking-[-1.4px]"
                style={{ color: plan.highlight ? 'var(--color-snow)' : 'var(--color-obsidian)' }}
              >
                {billing === 'one-time' ? plan.oneTime : `${plan.monthly}/mo`}
              </motion.div>
            </AnimatePresence>

            <ul
              className="mt-5 flex-1 space-y-3 pt-5"
              style={{ borderTop: `1px solid ${plan.highlight ? 'rgba(255,255,255,0.12)' : 'var(--color-fog)'}` }}
            >
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckCircle size={16} style={{ color: plan.highlight ? 'var(--color-ash)' : 'var(--color-meadow-green)', flexShrink: 0 }} />
                  <span className="text-[14px] leading-[1.47] tracking-[-0.14px]" style={{ color: plan.highlight ? 'var(--color-ash)' : 'var(--color-slate)' }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <SketchButton onClick={() => scrollTo('contact')} filled={plan.highlight}>
                Get started
              </SketchButton>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
