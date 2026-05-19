import Image from 'next/image';

const COLS = [
  { h: 'Service', l: ['How It Works', 'Pricing', 'Case Studies', 'FAQ'] },
  { h: 'Trades', l: ['HVAC', 'Plumbing', 'Electrical', 'Landscaping', 'Roofing'] },
  { h: 'Company', l: ['About', 'Contact', 'Careers'] },
  { h: 'Connect', l: ['Instagram', 'Facebook', 'TikTok', 'YouTube'] },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-gray-100)',
        color: 'var(--color-brand-black)',
        paddingTop: 64,
        paddingBottom: 32,
        borderTop: '1px solid var(--color-gray-300)',
      }}
    >
      <div className="container">
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr repeat(4, 1fr)',
            gap: 48,
            paddingBottom: 48,
            borderBottom: '1px solid var(--color-gray-300)',
          }}
        >
          <div>
            <Image
              src="/logo-tight.png"
              alt="Jobsite Social"
              width={170}
              height={32}
              style={{ height: 32, width: 'auto', marginBottom: 16 }}
            />
            <p style={{ fontSize: 14, maxWidth: 280, color: 'var(--color-gray-700)' }}>
              On-site social media content for blue-collar businesses across Middle Tennessee.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <div
                style={{
                  fontFamily: 'var(--font-heading), sans-serif',
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold-active)',
                  marginBottom: 14,
                }}
              >
                {c.h}
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {c.l.map((x) => (
                  <li key={x} style={{ fontSize: 14, color: 'var(--color-brand-black)' }}>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 24,
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: 13,
            color: 'var(--color-gray-500)',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span>© 2025 Jobsite Social · Franklin, TN</span>
          <span>Made on jobsites, not in offices.</span>
        </div>
      </div>
    </footer>
  );
}
