/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from '../../types';
import { Button } from '../ui/Button';
import { Sheet } from '../ui/Sheet';
import { Separator } from '../ui/Separator';
import { Menu, Sprout } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  activePage: PageId;
  onPageChange: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onPageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang Kami' },
    { id: 'program', label: 'Program' },
    { id: 'relawan', label: 'Relawan' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (id: PageId) => {
    onPageChange(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass-navbar py-4 shadow-xl' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Branding */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 group cursor-pointer focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden bg-white p-1 group-hover:rotate-3 group-hover:scale-105 shadow-2xl transition-all duration-300">
            <img
              src="/img/logo.png"
              alt="NHE Foundation Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-left flex flex-col justify-center">
            <span className="block font-display font-extrabold tracking-tight text-white text-[15px] md:text-[19px] uppercase leading-none mb-1">
              Nusantara Humanity
            </span>
            <span className="block text-[10px] md:text-[11px] uppercase font-bold text-gold tracking-widest font-display leading-none">
              & Education Foundation
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-5 py-2 rounded-full text-xs font-semibold font-display tracking-wider uppercase transition-colors overflow-hidden ${
                  isActive ? 'text-pure-dark' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 gradient-gold-bg z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Action CTA Button */}
        <div className="hidden md:block">
          <Button variant="primary" size="sm" onClick={() => handleNavClick('relawan')}>
            Bergabung Relawan
          </Button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-xl bg-white/5 text-white hover:bg-gold/10 hover:text-gold border border-white/5 transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Sheet */}
      <Sheet isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
        <div className="flex flex-col gap-3 py-6">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-5 py-4 rounded-xl flex items-center justify-between text-sm font-semibold font-display tracking-widest uppercase border transition-all ${
                  isActive
                    ? 'gradient-gold-bg text-pure-dark border-gold/50 shadow-lg shadow-gold/10'
                    : 'bg-white/5 text-neutral-300 border-transparent hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-pure-dark" />}
              </button>
            );
          })}
          
          <Separator className="my-6" glow />
          
          <Button
            variant="primary"
            size="lg"
            className="w-full mt-2"
            onClick={() => handleNavClick('relawan')}
          >
            Gabung Relawan
          </Button>
        </div>
      </Sheet>
    </nav>
  );
};
