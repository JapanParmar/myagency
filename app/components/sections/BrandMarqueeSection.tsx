const brands = [
  'VORTEX',
  'LUMINARY',
  'NEXORA',
  'STELLARX',
  'CRESTLINE',
  'ORBIX',
  'PARALLAX',
  'DEEPWAVE',
  'ZENITH',
  'SOLARIS',
  'MERIDIAN',
  'APEXIO',
  'NOVACORE',
  'DRIFTMARK',
  'ETHEREAL',
  'KINETICA',
];

export default function BrandMarqueeSection() {
  const doubled = [...brands, ...brands];

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 lg:px-10">
      <p
        className="text-center text-[11px] font-semibold uppercase tracking-[0.08em]"
        style={{ color: 'var(--color-steel)' }}
      >
        Trusted by ambitious businesses worldwide
      </p>

      <div
        className="mt-6 overflow-hidden rounded-[24px] px-6 py-5"
        style={{ backgroundColor: 'var(--color-snow)', boxShadow: 'var(--shadow-card-inset)' }}
      >
        <div className="flex w-max gap-12 whitespace-nowrap animate-[marquee_22s_linear_infinite]">
          {doubled.map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="text-[13px] font-semibold tracking-[0.14em]"
              style={{ color: 'var(--color-ash)' }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
