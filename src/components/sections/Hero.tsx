/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '../ui/Button';
import { PageId } from '../../types';
import { ArrowRight, ChevronDown, Sparkles, Heart, Award } from 'lucide-react';

interface HeroProps {
  onPageChange: (page: PageId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onPageChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Gentle scroll parallax offsets
  const yBg = useTransform(scrollY, [0, 800], [0, 100]);
  const opacityBg = useTransform(scrollY, [0, 600], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 bg-pure-dark"
    >
      {/* Background radial spotlight glows */}
      <motion.div
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-gold-radial opacity-35 filter blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-gold/5 opacity-20 filter blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/5 opacity-15 filter blur-[140px]" />
      </motion.div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      {/* Main container with 2 Column Grid */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-4 md:pt-8">
        
        {/* Left Column: Text Content & Actions */}
        <div className="lg:col-span-7 text-left space-y-6 flex flex-col justify-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-sans text-[10px] md:text-[11px] tracking-widest uppercase font-semibold hover:border-gold/30 hover:bg-white/10 transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin-slow" />
            <span>Forum Genre Kabupaten Muna</span>
          </motion.div>

          <div className="space-y-4">
            {/* Elegant rotating gold brand ring and Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-xl border border-dashed border-gold/40"
                />
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-md p-1 overflow-hidden select-none pointer-events-none">
                  <img
                    src="/img/logo.png"
                    alt="NHE Logo"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="text-[11px] uppercase font-mono tracking-wider text-gold font-bold">
                Nusantara Humanity & Education
              </div>
            </motion.div>

            {/* Shimmering Display Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[52px] font-display font-extrabold tracking-tight leading-tight md:leading-[1.15] text-white select-none">
              Integritas Nyata.<br className="hidden md:inline" />{" "}
              Kemanusiaan Tanggap.<br className="hidden md:inline" />{" "}
              Pendidikan <span className="text-gradient-gold">Setara.</span>
            </h1>
          </div>

          {/* Emotional Narrative Text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-400 font-sans max-w-lg leading-relaxed"
          >
            Nusantara Humanity & Education (NHE) Foundation berada di bawah naungan Forum Genre Kabupaten Muna, mengabdi untuk keadilan kemanusiaan, pemberdayaan generasi muda/remaja, serta pemerataan akses edukasi literatif yang berkelanjutan.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto relative group whitespace-nowrap"
              onClick={() => onPageChange('relawan')}
            >
              Bergabung Sebagai Relawan
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto whitespace-nowrap"
              onClick={() => onPageChange('tentang')}
            >
              Visi & Sejarah Kami
            </Button>
          </motion.div>

        </div>

        {/* Right Column: High-Impact Image Card with depth layering */}
        <div className="lg:col-span-12 xl:col-span-5 lg:col-start-8 lg:col-end-13 relative w-full flex justify-center lg:justify-end py-8 lg:py-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm sm:max-w-md lg:max-w-none"
          >
            {/* Back glow for image */}
            <div className="absolute inset-0 bg-gold/15 rounded-[2rem] filter blur-2xl z-0 -rotate-2 scale-95 select-none pointer-events-none" />

            {/* Stylized premium image card container */}
            <div className="relative z-10 p-2.5 rounded-[2rem] bg-neutral-900/80 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden group hover:border-gold/30 transition-all duration-500">
              <div className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full rounded-[1.5rem] overflow-hidden bg-neutral-950 relative">
                <img
                  src="/img/hero.png"
                  alt="Aksi Kemanusiaan dan Pendidikan NHE Foundation"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Vignette / Gradient scrim inside the card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Scrim Overlay Title (Small & clean) */}
                <div className="absolute bottom-5 left-5 right-5 text-left z-20">
                  <span className="block text-[10px] uppercase tracking-widest text-gold font-bold mb-1">PROGRAM UNGGULAN</span>
                  <p className="text-sm font-semibold text-white leading-snug font-display">Tanggap Bencana Alam & Edukasi Pelosok Negeri</p>
                </div>
              </div>
            </div>

            {/* Bottom-left floating badge (Volunteers active) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-4 -left-4 z-25 bg-[#0f1011] border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:border-gold/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 fill-gold" />
              </div>
              <div className="text-left font-display">
                <p className="text-xs uppercase font-extrabold text-gold tracking-widest leading-none mb-1">
                  100% Mandiri
                </p>
                <p className="text-[10px] text-neutral-400 font-mono leading-none">
                  Pengabdian Tanpa Motif Politik
                </p>
              </div>
            </motion.div>

            {/* Top-right floating tag indicator */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -top-4 -right-4 z-25 bg-gold text-pure-dark font-sans px-4 py-2.5 rounded-2xl shadow-[0_10px_20px_rgba(255,199,0,0.2)] flex items-center gap-2"
            >
              <Award className="w-4 h-4 fill-pure-dark" />
              <span className="text-xs font-black uppercase tracking-wider">
                AKREDITASI SOSIAL
              </span>
            </motion.div>

          </motion.div>
        </div>

      </div>

      {/* Floating indicator reminding of down scrolls */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer hidden lg:flex"
        onClick={() => {
          const firstSection = document.getElementById('storytelling-section');
          if (firstSection) {
            firstSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span className="text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase">
          Gulir ke Bawah
        </span>
        <ChevronDown className="w-4 h-4 text-gold" />
      </motion.div>
    </section>
  );
};
