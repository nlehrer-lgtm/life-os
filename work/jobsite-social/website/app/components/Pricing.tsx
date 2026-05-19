'use client';

import { Check } from 'lucide-react';

type Plan = {
  id: string;
  tier: string;
  price: string;
  per: string;
  blurb: string;
  features: string[];
  recommended: boolean;
};

const PLANS: Plan[] = [
  {
    id: 'standard',
    tier: 'Standard',
    price: '$899',
    per: '/ month',
    blurb: 'Solid weekly presence for trades that just need to stay visible.',
    features: [
      '3 posts per week',
      'Monthly on-site photo shoot',
      'Account management',
      'Brand-tailored captions',
    ],
    recommended: false,
  },
  {
    id: 'premium',
    tier: 'Premium',
    price: '$1,499',
    per: '/ month',
    blurb: 'Full-service content with video and local SEO content.',
    features: [
      '4–5 posts per week',
      'On-site photo + video shoots',
      'Account management',
      'Brand-tailored captions',
      'Google Maps + Apple Maps content',
      'Priority support',
    ],
    recommended: true,
  },
];

type Props = {
  selected: string;
  onSelect: (id: string) => void;
  onSubscribe: () => void;
};

export default function Pricing({ selected, onSelect, onSubscribe }: Props) {
  return (
    <section id="pricing" style={{ background: '#FFFFFF', padding: '100px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow">Pricing</span>
          <h2 className="h2">Built for businesses that build.</h2>
          <p style={{ maxWidth: 560, margin: '0 auto' }}>
            Month-to-month. Cancel anytime. We earn the renewal every month.
          </p>
        </div>
        <div
          className="grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 24,
            maxWidth: 880,
            margin: '0 auto',
          }}
        >
          {PLANS.map((p) => {
            const isSel = selected === p.id;
            const rec = p.recommended;
            return (
              <div
                key={p.id}
                style={{
                  background: '#fff',
                  color: 'var(--color-brand-black)',
                  border: rec
                    ? '2px solid var(--color-brand-gold)'
                    : `2px solid ${isSel ? 'var(--color-brand-black)' : 'var(--color-gray-300)'}`,
                  padding: 32,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18,
                }}
              >
                {rec && (
                  <>
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: 'var(--color-brand-gold)',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: -14,
                        right: 24,
                        background: 'var(--color-brand-gold)',
                        color: 'var(--color-brand-black)',
                        fontFamily: 'var(--font-heading), sans-serif',
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        padding: '6px 12px',
                      }}
                    >
                      Recommended
                    </span>
                  </>
                )}
                <div
                  style={{
                    fontFamily: 'var(--font-heading), sans-serif',
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: rec ? 'var(--color-gold-active)' : 'var(--color-gray-500)',
                  }}
                >
                  {p.tier}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display), sans-serif',
                      fontSize: 72,
                      lineHeight: 1,
                      color: 'var(--color-brand-black)',
                    }}
                  >
                    {p.price}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading), sans-serif',
                      fontWeight: 500,
                      fontSize: 13,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-gray-500)',
                    }}
                  >
                    {p.per}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--color-gray-700)',
                    borderBottom: '1px solid var(--color-gray-300)',
                    paddingBottom: 18,
                  }}
                >
                  {p.blurb}
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    flex: 1,
                  }}
                >
                  {p.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: 14,
                        color: 'var(--color-brand-black)',
                      }}
                    >
                      <span
                        style={{
                          color: 'var(--color-brand-gold)',
                          flexShrink: 0,
                          display: 'inline-flex',
                        }}
                      >
                        <Check size={16} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={rec ? 'btn btn--primary' : 'btn btn--secondary'}
                  style={{ marginTop: 6, justifyContent: 'center', width: '100%' }}
                  onClick={() => {
                    onSelect(p.id);
                    onSubscribe();
                  }}
                >
                  {isSel ? 'Selected — Subscribe' : 'Choose Plan'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
