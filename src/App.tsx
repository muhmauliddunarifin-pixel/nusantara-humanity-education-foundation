/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Page components
import { Hero } from './components/sections/Hero';
import { Storytelling } from './components/sections/Storytelling';
import { AboutNHEBrief } from './components/sections/AboutNHEBrief';
import { ProgramOverview } from './components/sections/ProgramOverview';
import { ImpactTarget } from './components/sections/ImpactTarget';
import { Quote } from './components/sections/Quote';
import { Cta } from './components/sections/Cta';

// Sub-pages detail components
import { TentangPage } from './components/sections/TentangPage';
import { ProgramPage } from './components/sections/ProgramPage';
import { RelawanPage } from './components/sections/RelawanPage';
import { KontakPage } from './components/sections/KontakPage';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [loading, setLoading] = useState(true);

  // Deep Link Hash Route Sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['home', 'tentang', 'program', 'relawan', 'kontak'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      } else {
        setActivePage('home');
      }
    };

    // Run on initial bundle mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    
    // Simulate premium loader animation
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(loadTimer);
    };
  }, []);

  const handlePageChange = (page: PageId) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading Screen Animation
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-pure-dark flex flex-col items-center justify-center gap-6">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-[2rem] border-4 border-gold/10 border-t-gold"
          />
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white p-1 select-none pointer-events-none shadow-2xl flex items-center justify-center">
            <img
              src="/img/logo.png"
              alt="NHE Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="text-center space-y-1.5 animate-pulse">
          <h2 className="font-display font-extrabold text-base tracking-[0.2em] text-white uppercase select-none">
            NHE Foundation
          </h2>
          <p className="text-[10px] text-gold font-mono tracking-widest uppercase">
            Memuat Harapan Nusantara...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pure-dark text-white relative selection:bg-gold selection:text-pure-dark">
      {/* Interactive global radial gradient light flow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Persistent Glass Sticky Navigation Bar */}
      <Navbar activePage={activePage} onPageChange={handlePageChange} />

      {/* Main Pages Content Frame - Smooth transitions and staggered reveals */}
      <main className="relative z-10 min-h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {activePage === 'home' && (
              <>
                <Hero onPageChange={handlePageChange} />
                <Storytelling />
                <AboutNHEBrief />
                <ProgramOverview onPageChange={handlePageChange} />
                <ImpactTarget />
                <Quote />
                <Cta onPageChange={handlePageChange} />
              </>
            )}

            {activePage === 'tentang' && <TentangPage />}

            {activePage === 'program' && <ProgramPage />}

            {activePage === 'relawan' && <RelawanPage />}

            {activePage === 'kontak' && <KontakPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Dynamic unified Footer */}
      <Footer onPageChange={handlePageChange} />
    </div>
  );
}
