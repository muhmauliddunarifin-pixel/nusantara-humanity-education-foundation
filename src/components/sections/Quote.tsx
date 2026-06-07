/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Quote as QuoteIcon } from 'lucide-react';

export const Quote: React.FC = () => {
  return (
    <section className="relative py-28 md:py-36 bg-brand-dark overflow-hidden" style={{ backgroundColor: '#1F1F1F' }}>
      {/* Decorative vector grid mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,199,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 flex flex-col items-center"
        >
          {/* Shimmer vector Quote mark ring */}
          <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shadow-lg shadow-gold/5">
            <QuoteIcon className="w-5 h-5" />
          </div>

          <blockquote className="space-y-4 max-w-4xl">
            <p className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight px-4 select-none">
              "Perubahan besar dimulai ketika seseorang memilih untuk peduli."
            </p>
          </blockquote>

          {/* Elegant signature dividing marker line */}
          <div className="flex items-center gap-3 py-4">
            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold" />
            <span className="font-display text-xs font-semibold text-gold uppercase tracking-widest">
              N Nusantara Humanity & Education
            </span>
            <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
