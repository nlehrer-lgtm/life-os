// Continued — sections + footer

// ---------- How It Works — the DARK anchor section ----------
function HowItWorks() {
  const steps = [
    { n: '01', icon: 'camera', t: 'We Show Up', b: 'Recurring on-site shoots at your shop, truck, or jobsite. Photos and short-form video of your crew, your work, your gear.' },
    { n: '02', icon: 'scissors', t: 'We Create', b: 'Our team edits the footage, writes brand-tailored captions, and builds out a content calendar — no stock, no templates.' },
    { n: '03', icon: 'calendar-check', t: 'We Post', b: 'Regular, scheduled posts keep your accounts active and visible. You never have to think about it.' },
  ];
  return (
    <section id="how" style={{ background: '#221E1F', color: '#fff', padding: '100px 0', position: 'relative' }}>
      {/* Faint gold corner accent — references the logo bracket motif */}
      <span style={{ position: 'absolute', top: 32, left: 32, width: 28, height: 28, borderTop: '3px solid #F4C046', borderLeft: '3px solid #F4C046', opacity: 0.6 }} />
      <span style={{ position: 'absolute', bottom: 32, right: 32, width: 28, height: 28, borderBottom: '3px solid #F4C046', borderRight: '3px solid #F4C046', opacity: 0.6 }} />
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, gap: 32 }}>
          <div>
            <span className="eyebrow">How it works</span>
            <h2 className="h2" style={{ color: '#fff', maxWidth: 720, marginBottom: 0 }}>We show up.<br />We shoot. We post.</h2>
          </div>
          <p style={{ maxWidth: 360, color: 'rgba(255,255,255,0.78)' }}>Three steps. Zero effort from you. We treat your business like we'd want ours treated.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ background: '#1A1A1A', border: '1px solid #2A2624', padding: 32, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#F4C046', transform: `scaleX(${(i+1)/3})`, transformOrigin: 'left' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 64, lineHeight: 0.9, color: '#F4C046' }}>{s.n}</span>
                <span style={{ width: 56, height: 56, background: '#F4C046', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#221E1F' }}>
                  <Icon name={s.icon} size={26} strokeWidth={2.5} />
                </span>
              </div>
              <h3 className="h3" style={{ marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.02em', color: '#fff' }}>{s.t}</h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.78)' }}>{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Pricing — light, gold-bordered recommended card ----------
function Pricing({ selected, onSelect, onSubscribe }) {
  const plans = [
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
  return (
    <section id="pricing" style={{ background: '#FFFFFF', padding: '100px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow" style={{ color: '#D9A52E' }}>Pricing</span>
          <h2 className="h2">Built for businesses that build.</h2>
          <p style={{ maxWidth: 560, margin: '0 auto' }}>Month-to-month. Cancel anytime. We earn the renewal every month.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 880, margin: '0 auto' }}>
          {plans.map(p => {
            const isSel = selected === p.id;
            const rec = p.recommended;
            return (
              <div key={p.id}
                style={{
                  background: '#fff',
                  color: '#221E1F',
                  border: rec ? '2px solid #F4C046' : `2px solid ${isSel ? '#221E1F' : '#D4D4D4'}`,
                  padding: 32,
                  position: 'relative',
                  display: 'flex', flexDirection: 'column', gap: 18,
                }}>
                {rec && (
                  <>
                    <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#F4C046' }} />
                    <span style={{
                      position: 'absolute', top: -14, right: 24,
                      background: '#F4C046', color: '#221E1F',
                      fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 11,
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                      padding: '6px 12px',
                    }}>Recommended</span>
                  </>
                )}
                <div style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: rec ? '#D9A52E' : '#888',
                }}>{p.tier}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 72, lineHeight: 1, color: '#221E1F' }}>{p.price}</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888' }}>{p.per}</span>
                </div>
                <p style={{ fontSize: 14, color: '#4A4A4A', borderBottom: '1px solid #D4D4D4', paddingBottom: 18 }}>{p.blurb}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-body)', fontSize: 14, color: '#221E1F' }}>
                      <span style={{ color: '#F4C046', flexShrink: 0, display: 'inline-flex' }}><Icon name="check" size={16} strokeWidth={3} /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={rec ? 'btn btn--primary' : 'btn btn--secondary'}
                  style={{ marginTop: 6, justifyContent: 'center', width: '100%' }}
                  onClick={() => { onSelect(p.id); onSubscribe(); }}>
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

// ---------- Testimonials — cream section, white cards ----------
function Testimonials() {
  const quotes = [
    {
      q: 'They show up, get it done, and our feed actually looks like us. No fluff. We\'ve booked three jobs off Instagram this month alone.',
      n: 'Travis B.',
      l: 'Owner · Hardline HVAC, Franklin TN',
    },
    {
      q: 'I tried two other agencies before these guys. Difference is they actually came to the shop. Real content of real work — clients notice.',
      n: 'Marisa K.',
      l: 'Operations · Cumberland Electric, Spring Hill TN',
    },
  ];
  return (
    <section style={{ background: '#EAEAE4', padding: '100px 0' }}>
      <div className="container">
        <span className="eyebrow" style={{ color: '#D9A52E' }}>What clients say</span>
        <h2 className="h2">Real work. Real reviews.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {quotes.map((Q, i) => (
            <div key={i} style={{ background: '#fff', padding: 32, border: '1px solid #D4D4D4', position: 'relative' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: 96, lineHeight: 0.6, color: '#F4C046', position: 'absolute', top: 24, left: 22 }}>"</span>
              <div style={{ paddingLeft: 60 }}>
                <p style={{ fontSize: 17, color: '#221E1F', marginBottom: 18, lineHeight: 1.5 }}>{Q.q}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{Q.n}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: 14, color: '#888' }}>{Q.l}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Contact — white surface, form on cream card ----------
function Contact({ onSubscribe }) {
  return (
    <section id="contact" style={{ background: '#FFFFFF', padding: '100px 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <span className="eyebrow" style={{ color: '#D9A52E' }}>Get started</span>
          <h2 className="h2">
            Get back to work.<br />
            <span style={{ color: '#D9A52E' }}>We'll handle the feed.</span>
          </h2>
          <p style={{ maxWidth: 480 }}>Schedule a 15-minute call. We'll learn about your shop, pick a plan, and lock in your first shoot.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubscribe(); }}
          style={{ background: '#F2F2F0', border: '1px solid #D4D4D4', padding: 32, display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
          <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#F4C046' }} />
          <ContactField label="Business" placeholder="e.g. Hardline HVAC" />
          <ContactField label="Email" placeholder="you@yourbusiness.com" type="email" />
          <ContactField label="City" placeholder="Franklin, TN" />
          <button className="btn btn--primary" style={{ marginTop: 8, justifyContent: 'center' }}>
            Book the Call <Icon name="arrow-right" size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}

function ContactField({ label, placeholder, type = 'text' }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#221E1F' }}>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          background: '#fff', border: '1px solid #D4D4D4', borderRadius: 0,
          padding: '14px 14px', color: '#221E1F', fontFamily: 'var(--font-body)', fontSize: 15,
        }}
      />
    </label>
  );
}

// ---------- Footer — Drywall cream ----------
function Footer() {
  const cols = [
    { h: 'Service', l: ['How It Works', 'Pricing', 'Case Studies', 'FAQ'] },
    { h: 'Trades', l: ['HVAC', 'Plumbing', 'Electrical', 'Landscaping', 'Roofing'] },
    { h: 'Company', l: ['About', 'Contact', 'Careers'] },
    { h: 'Connect', l: ['Instagram', 'Facebook', 'TikTok', 'YouTube'] },
  ];
  return (
    <footer style={{ background: '#F2F2F0', color: '#221E1F', paddingTop: 64, paddingBottom: 32, borderTop: '1px solid #D4D4D4' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr repeat(4, 1fr)', gap: 48, paddingBottom: 48, borderBottom: '1px solid #D4D4D4' }}>
          <div>
            <img src="../../assets/logo-tight.png" alt="Jobsite Social" style={{ height: 32, marginBottom: 16 }} />
            <p style={{ fontSize: 14, maxWidth: 280, color: '#4A4A4A' }}>On-site social media content for blue-collar businesses across Middle Tennessee.</p>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#D9A52E', marginBottom: 14 }}>{c.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {c.l.map(x => <li key={x} style={{ fontSize: 14, color: '#221E1F' }}>{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 24, fontFamily: 'var(--font-body)', fontSize: 13, color: '#888' }}>
          <span>© 2025 Jobsite Social · Franklin, TN</span>
          <span>Made on jobsites, not in offices.</span>
        </div>
      </div>
    </footer>
  );
}

// ---------- Subscribe modal — unchanged (modal is on its own surface anyway) ----------
function SubscribeModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(34,30,31,0.78)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ background: '#fff', maxWidth: 480, width: '100%', padding: 40, position: 'relative', border: '2px solid #F4C046' }}>
        <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#F4C046' }} />
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'transparent', border: 'none', color: '#221E1F', display: 'inline-flex' }}>
          <Icon name="x" size={22} strokeWidth={2.5} />
        </button>
        <span className="eyebrow" style={{ color: '#D9A52E' }}>You're in</span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1, textTransform: 'uppercase', marginBottom: 12, marginTop: 6 }}>Let's get on a call.</h3>
        <p style={{ marginBottom: 24, fontSize: 15 }}>We'll reach out within one business day to schedule your first shoot.</p>
        <button className="btn btn--primary" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>Got it</button>
      </div>
    </div>
  );
}

Object.assign(window, { HowItWorks, Pricing, Testimonials, Contact, Footer, SubscribeModal });
