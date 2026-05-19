'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

type Props = { open: boolean; onClose: () => void };

export default function SubscribeModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(34,30,31,0.78)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          maxWidth: 480,
          width: '100%',
          padding: 40,
          position: 'relative',
          border: '2px solid var(--color-brand-gold)',
        }}
      >
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
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            background: 'transparent',
            border: 'none',
            color: 'var(--color-brand-black)',
            display: 'inline-flex',
          }}
        >
          <X size={22} strokeWidth={2.5} />
        </button>
        <span className="eyebrow">You&apos;re in</span>
        <h3
          style={{
            fontFamily: 'var(--font-display), sans-serif',
            fontSize: 44,
            lineHeight: 1,
            textTransform: 'uppercase',
            marginBottom: 12,
            marginTop: 6,
          }}
        >
          Let&apos;s get on a call.
        </h3>
        <p style={{ marginBottom: 24, fontSize: 15 }}>
          We&apos;ll reach out within one business day to schedule your first shoot.
        </p>
        <button
          className="btn btn--primary"
          onClick={onClose}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
