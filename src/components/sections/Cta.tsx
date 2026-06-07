/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { PageId } from '../../types';
import { Sparkles, Calendar } from 'lucide-react';

interface CtaProps {
  onPageChange: (page: PageId) => void;
}

export const Cta: React.FC<CtaProps> = ({ onPageChange }) => {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-pure-dark">
      {/* Container framing resembling a premium card */}
      <div className="max-w-6xl mx-auto rounded-3xl gradient-gold-bg p-8 md:p-16 text-pure-dark relative overflow-hidden shadow-2xl border border-gold/30">
        
        {/* Background visual graphics like smooth circles to create depth */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-black/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8 flex flex-col items-center">
          
          {/* Subtle CTA floating tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pure-dark/10 border border-pure-dark/10 font-display text-[10px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3 h-3 text-pure-dark" />
            <span>Gerakan Gotong Royong</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight select-none">
            Mari Membangun <br />
            Masa Depan Bersama
          </h2>

          <p className="text-sm sm:text-base font-medium opacity-85 leading-relaxed max-w-xl font-sans">
            Setiap tindakan kecil memiliki kekuatan untuk membangkitkan masa depan. Jadilah saksi dan pelaku dari penyebaran asa kemanusiaan dan pendidikan berkualitas tinggi di seluruh penjuru Nusantara.
          </p>

          {/* Primary CTA Buttons with high contrast dark themes for legibility inside Gold background */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-2">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto bg-pure-dark text-white border-transparent hover:bg-pure-dark/85 hover:shadow-xl active:scale-95"
              onClick={() => {
                onPageChange('relawan');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Menjadi Relawan
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-pure-dark text-pure-dark hover:bg-pure-dark/5 font-semibold active:scale-95"
              onClick={() => {
                onPageChange('kontak');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Hubungi Kami
            </Button>
          </div>

        </div>

        {/* Small decorative indicator on card base */}
        <div className="absolute bottom-4 right-6 text-[9px] uppercase tracking-widest font-mono opacity-50 font-semibold hidden md:block">
          NHE Foundation - 2026
        </div>
      </div>
    </section>
  );
};
