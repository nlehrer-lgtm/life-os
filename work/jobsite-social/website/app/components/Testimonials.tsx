type Quote = {
  q: string;
  n: string;
  l: string;
};

const QUOTES: Quote[] = [
  {
    q: "They show up, get it done, and our feed actually looks like us. No fluff. We've booked three jobs off Instagram this month alone.",
    n: 'Travis B.',
    l: 'Owner · Hardline HVAC, Franklin TN',
  },
  {
    q: 'I tried two other agencies before these guys. Difference is they actually came to the shop. Real content of real work — clients notice.',
    n: 'Marisa K.',
    l: 'Operations · Cumberland Electric, Spring Hill TN',
  },
];

export default function Testimonials() {
  return (
    <section style={{ background: 'var(--color-cream-deep)', padding: '100px 0' }}>
      <div className="container">
        <span className="eyebrow">What clients say</span>
        <h2 className="h2">Real work. Real reviews.</h2>
        <div
          className="grid-2"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}
        >
          {QUOTES.map((Q, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                padding: 32,
                border: '1px solid var(--color-gray-300)',
                position: 'relative',
              }}
            >
              <span
                aria-hidden
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 96,
                  lineHeight: 0.6,
                  color: 'var(--color-brand-gold)',
                  position: 'absolute',
                  top: 24,
                  left: 22,
                }}
              >
                &ldquo;
              </span>
              <div style={{ paddingLeft: 60 }}>
                <p
                  style={{
                    fontSize: 17,
                    color: 'var(--color-brand-black)',
                    marginBottom: 18,
                    lineHeight: 1.5,
                  }}
                >
                  {Q.q}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 10,
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading), sans-serif',
                      fontWeight: 700,
                      fontSize: 15,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {Q.n}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontStyle: 'italic',
                      fontSize: 14,
                      color: 'var(--color-gray-500)',
                    }}
                  >
                    {Q.l}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
