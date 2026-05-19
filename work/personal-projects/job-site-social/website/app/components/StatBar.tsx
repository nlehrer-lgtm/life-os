const STATS = [
  { num: '50', suf: '+', label: 'Businesses Served' },
  { num: '500', suf: '+', label: 'Posts Created' },
  { num: '1,200', suf: '', label: 'Hours Saved' },
  { num: '98', suf: '%', label: 'Retention' },
];

export default function StatBar() {
  return (
    <section
      style={{
        background: 'var(--color-gray-100)',
        borderBottom: '1px solid var(--color-gray-300)',
        padding: '52px 0',
      }}
    >
      <div
        className="container grid-4"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}
      >
        {STATS.map((s) => (
          <div
            key={s.label}
            style={{ borderLeft: '3px solid var(--color-brand-gold)', paddingLeft: 20 }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontSize: 64,
                lineHeight: 1,
                color: 'var(--color-brand-black)',
              }}
            >
              {s.num}
              <span style={{ fontSize: 36, color: 'var(--color-gold-active)' }}>{s.suf}</span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading), sans-serif',
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-black)',
                marginTop: 8,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
