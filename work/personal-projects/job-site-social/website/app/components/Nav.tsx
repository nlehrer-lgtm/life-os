'use client';

import Image from 'next/image';

type Props = {
  onSubscribe: () => void;
  active?: string;
};

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'how', label: 'How It Works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav({ onSubscribe, active = 'pricing' }: Props) {
  return (
    <nav
      style={{
        background: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--color-gray-300)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 24px',
          gap: 24,
        }}
      >
        <a href="#top" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/logo-tight.png"
            alt="Jobsite Social"
            width={140}
            height={26}
            style={{ height: 26, width: 'auto' }}
            priority
          />
        </a>
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav-link ${active === l.id ? 'is-active' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </div>
        <button className="btn btn--primary" style={{ padding: '12px 22px' }} onClick={onSubscribe}>
          Subscribe
        </button>
      </div>
    </nav>
  );
}
