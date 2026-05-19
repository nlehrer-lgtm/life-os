'use client';

import { FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';

type Props = { onSubscribe: () => void };

export default function Contact({ onSubscribe }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubscribe();
  };
  return (
    <section id="contact" style={{ background: '#FFFFFF', padding: '100px 0' }}>
      <div
        className="container hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}
      >
        <div>
          <span className="eyebrow">Get started</span>
          <h2 className="h2">
            Get back to work.
            <br />
            <span style={{ color: 'var(--color-gold-active)' }}>We&apos;ll handle the feed.</span>
          </h2>
          <p style={{ maxWidth: 480 }}>
            Schedule a 15-minute call. We&apos;ll learn about your shop, pick a plan, and lock in
            your first shoot.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            background: 'var(--color-gray-100)',
            border: '1px solid var(--color-gray-300)',
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
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
              height: 4,
              background: 'var(--color-brand-gold)',
            }}
          />
          <ContactField label="Business" placeholder="e.g. Hardline HVAC" />
          <ContactField label="Email" placeholder="you@yourbusiness.com" type="email" />
          <ContactField label="City" placeholder="Franklin, TN" />
          <button className="btn btn--primary" style={{ marginTop: 8, justifyContent: 'center' }}>
            Book the Call <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </form>
      </div>
    </section>
  );
}

function ContactField({
  label,
  placeholder,
  type = 'text',
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span className="field-label">{label}</span>
      <input className="field-input" type={type} placeholder={placeholder} />
    </label>
  );
}
