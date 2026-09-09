import React from 'react';
import { TactileHero } from '../components/tactile/TactileHero';
import { TactileGrid } from '../components/tactile/TactileGrid';

export const Home: React.FC = () => {
  return (
    <div className="w-full select-none font-sans pb-3">
      {/* ── TACTILE 3D / CLAYMORPHIC DASHBOARD (Reference-Accurate) ── */}
      <section className="w-full max-w-7xl mx-auto">
        <TactileHero />
        <TactileGrid />
      </section>
    </div>
  );
};

export default Home;
