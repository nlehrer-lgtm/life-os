// Jobsite Social — Website UI Kit
// All components exported on `window` at bottom of file.
const { useState, useEffect, useRef } = React;

// ---------- Icon helper (Lucide via global) ----------
function Icon({ name, size = 22, strokeWidth = 2.5, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({
        attrs: { 'stroke-width': strokeWidth, width: size, height: size },
        nameAttr: 'data-lucide',
      });
    }
  }, [name, size, strokeWidth]);
  return <span ref={ref} style={{ display: 'inline-flex', alignItems: 'center', ...style }} />;
}

// ---------- Nav (white bar) ----------
function Nav({ onSubscribe, active = 'pricing' }) {
  const links = [
    { id: 'work', label: 'Work' },
    { id: 'how', label: 'How It Works' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];
  return (
    <nav style={{ background: '#fff', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid #D4D4D4' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="../../assets/logo-tight.png" alt="Jobsite Social" style={{ height: 26 }} />
        </a>
        <div style={{ display: 'flex', gap: 28 }}>
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`}
              style={{
                fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 14,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: active === l.id ? '#D9A52E' : '#221E1F',
              }}>{l.label}</a>
          ))}
        </div>
        <button className="btn btn--primary" style={{ padding: '12px 22px' }} onClick={onSubscribe}>Subscribe</button>
      </div>
    </nav>
  );
}

// ---------- Hero (clean white — the lightest surface) ----------
function Hero({ onSubscribe }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', paddingTop: 100, paddingBottom: 100, borderBottom: '1px solid #EAEAE4' }}>
      {/* Subtle warm wash — barely there */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 80% 20%, rgba(244,192,70,0.08) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />
      <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center' }}>
        <div>
          <span className="eyebrow" style={{ color: '#D9A52E' }}>Middle Tennessee · Est. 2025</span>
          <h1 className="h1" style={{ color: '#221E1F' }}>
            On-Site Content.<br />
            <span style={{ color: '#D9A52E' }}>Consistent Posting.</span>
          </h1>
          <p style={{ marginTop: 24, maxWidth: 520, fontSize: 18, color: '#4A4A4A' }}>
            We show up to your shop, your truck, your jobsite — capture real content of your team doing real work — and keep your social running so you can get back to what you do best.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 32 }}>
            <button className="btn btn--primary" onClick={onSubscribe}>
              Subscribe Now <Icon name="arrow-right" size={18} />
            </button>
            <button className="btn btn--secondary">
              <Icon name="play" size={16} /> Watch the Reel
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
    <div style={{
      aspectRatio: '9 / 11',
      // Warm cream-to-amber wash standing in for jobsite photography
      background: 'linear-gradient(135deg, #f3e6cc 0%, #e6c98f 55%, #c79a3a 100%)',
      position: 'relative',
      border: '1px solid #D4D4D4',
      cursor: 'pointer',
    }} onClick={() => setPlaying(p => !p)}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: '#221E1F', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {playing
            ? <Icon name="pause" size={28} strokeWidth={3} style={{ color: '#F4C046' }} />
            : <Icon name="play" size={30} strokeWidth={3} style={{ color: '#F4C046', marginLeft: 4 }} />}
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#221E1F' }}>
          {playing ? 'Playing — Hardline HVAC reel' : '0:42 · Reel sample'}
        </div>
      </div>
      {/* Corner bracket motif from logo */}
      <span style={{ position: 'absolute', top: 12, left: 12, width: 24, height: 24, borderTop: '3px solid #221E1F', borderLeft: '3px solid #221E1F' }} />
      <span style={{ position: 'absolute', bottom: 12, right: 12, width: 24, height: 24, borderBottom: '3px solid #221E1F', borderRight: '3px solid #221E1F' }} />
    </div>
  );
}

// ---------- Stat bar (Drywall cream — one step deeper than hero) ----------
function StatBar() {
  const stats = [
    { num: '50', suf: '+', label: 'Businesses Served' },
    { num: '500', suf: '+', label: 'Posts Created' },
    { num: '1,200', suf: '', label: 'Hours Saved' },
    { num: '98', suf: '%', label: 'Retention' },
  ];
  return (
    <section style={{ background: '#F2F2F0', borderBottom: '1px solid #D4D4D4', padding: '52px 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {stats.map(s => (
          <div key={s.label} style={{ borderLeft: '3px solid #F4C046', paddingLeft: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 64, lineHeight: 1, color: '#221E1F' }}>
              {s.num}<span style={{ fontSize: 36, color: '#D9A52E' }}>{s.suf}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#221E1F', marginTop: 8 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Icon, Nav, Hero, StatBar });
