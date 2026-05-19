'use client';

import { useState } from 'react';
import { ArrowRight, Play, Pause } from 'lucide-react';

type Props = { onSubscribe: () => void };

export default function Hero({ onSubscribe }: Props) {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#FFFFFF',
        paddingTop: 100,
        paddingBottom: 100,
        borderBottom: '1px solid var(--color-cream-deep)',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 80% 20%, rgba(244,192,70,0.08) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="container hero-grid"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <div>
          <span className="eyebrow">Middle Tennessee · Est. 2025</span>
          <h1 className="h1" style={{ color: 'var(--color-brand-black)' }}>
            On-Site Content.
            <br />
            <span style={{ color: 'var(--color-gold-active)' }}>Consistent Posting.</span>
          </h1>
          <p style={{ marginTop: 24, maxWidth: 520, fontSize: 18, color: 'var(--color-gray-700)' }}>
            We show up to your shop, your truck, your jobsite — capture real content of your team
            doing real work — and keep your social running so you can get back to what you do best.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
            <button className="btn btn--primary" onClick={onSubscribe}>
              Subscribe Now <ArrowRight size={18} strokeWidth={2.5} />
            </button>
            <button className="btn btn--secondary">
              <Play size={16} strokeWidth={2.5} /> Watch the Reel
            </button>
          </div>
        </div>
        <DemoVideo />
      </div>
    </section>
  );
}

function DemoVideo() {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setPlaying((p) => !p)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setPlaying((p) => !p);
      }}
      style={{
        aspectRatio: '9 / 11',
        background: 'linear-gradient(135deg, #f3e6cc 0%, #e6c98f 55%, #c79a3a 100%)',
        position: 'relative',
        border: '1px solid var(--color-gray-300)',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'var(--color-brand-black)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {playing ? (
            <Pause size={28} strokeWidth={3} color="var(--color-brand-gold)" />
          ) : (
            <Play
              size={30}
              strokeWidth={3}
              color="var(--color-brand-gold)"
              style={{ marginLeft: 4 }}
            />
          )}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-heading), sans-serif',
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-brand-black)',
          }}
        >
          {playing ? 'Playing — Hardline HVAC reel' : '0:42 · Reel sample'}
        </div>
      </div>
      {/* Corner bracket motif from logo */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          width: 24,
          height: 24,
          borderTop: '3px solid var(--color-brand-black)',
          borderLeft: '3px solid var(--color-brand-black)',
        }}
      />
      <span
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          width: 24,
          height: 24,
          borderBottom: '3px solid var(--color-brand-black)',
          borderRight: '3px solid var(--color-brand-black)',
        }}
      />
    </div>
  );
}
