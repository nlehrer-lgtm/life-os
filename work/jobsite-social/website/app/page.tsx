'use client';

import { useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import StatBar from './components/StatBar';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SubscribeModal from './components/SubscribeModal';

export default function Page() {
  const [modal, setModal] = useState(false);
  const [plan, setPlan] = useState('premium');
  const openSubscribe = () => setModal(true);

  return (
    <div id="top">
      <Nav onSubscribe={openSubscribe} active="pricing" />
      <Hero onSubscribe={openSubscribe} />
      <StatBar />
      <HowItWorks />
      <Pricing selected={plan} onSelect={setPlan} onSubscribe={openSubscribe} />
      <Testimonials />
      <Contact onSubscribe={openSubscribe} />
      <Footer />
      <SubscribeModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}
