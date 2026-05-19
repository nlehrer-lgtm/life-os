import { Camera, Scissors, CalendarCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Step = {
  n: string;
  Icon: LucideIcon;
  t: string;
  b: string;
};

const STEPS: Step[] = [
  {
    n: '01',
    Icon: Camera,
    t: 'We Show Up',
    b: 'Recurring on-site shoots at your shop, truck, or jobsite. Photos and short-form video of your crew, your work, your gear.',
  },
  {
    n: '02',
    Icon: Scissors,
    t: 'We Create',
    b: 'Our team edits the footage, writes brand-tailored captions, and builds out a content calendar — no stock, no templates.',
  },
  {
    n: '03',
    Icon: CalendarCheck,
    t: 'We Post',
    b: 'Regular, scheduled posts keep your accounts active and visible. You never have to think about it.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      style={{
        background: 'var(--color-brand-black)',
        color: '#fff',
        padding: '100px 0',
        position: 'relative',
      }}
    >
      {/* Gold corner bracket motif */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 32,
          left: 32,
          width: 28,
          height: 28,
          borderTop: '3px solid var(--color-brand-gold)',
          borderLeft: '3px solid var(--color-brand-gold)',
          opacity: 0.6,
        }}
      />
      <span
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 32,
          right: 32,
          width: 28,
          height: 28,
          borderBottom: '3px solid var(--color-brand-gold)',
          borderRight: '3px solid var(--color-brand-gold)',
          opacity: 0.6,
        }}
      />
      <div className="container">
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'flex-end',
            marginBottom: 56,
            gap: 32,
          }}
        >
          <div>
            <span className="eyebrow" style={{ color: 'var(--color-brand-gold)' }}>
              How it works
            </span>
            <h2 className="h2" style={{ color: '#fff', maxWidth: 720, marginBottom: 0 }}>
              We show up.
              <br />
              We shoot. We post.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: 'rgba(255,255,255,0.78)' }}>
            Three steps. Zero effort from you. We treat your business like we&apos;d want ours
            treated.
          </p>
        </div>
        <div
          className="grid-3"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
        >
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              style={{
                background: 'var(--color-gray-900)',
                border: '1px solid #2A2624',
                padding: 32,
                position: 'relative',
              }}
            >
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: 'var(--color-brand-gold)',
                  transform: `scaleX(${(i + 1) / 3})`,
                  transformOrigin: 'left',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 32,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display), sans-serif',
                    fontSize: 64,
                    lineHeight: 0.9,
                    color: 'var(--color-brand-gold)',
                  }}
                >
                  {s.n}
                </span>
                <span
                  style={{
                    width: 56,
                    height: 56,
                    background: 'var(--color-brand-gold)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-brand-black)',
                  }}
                >
                  <s.Icon size={26} strokeWidth={2.5} />
                </span>
              </div>
              <h3
                className="h3"
                style={{
                  marginBottom: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  color: '#fff',
                }}
              >
                {s.t}
              </h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.78)' }}>{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
