/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const Storytelling: React.FC = () => {
  const narrativeLines = [
    { text: 'Setiap anak berhak mendapatkan kesempatan.', color: 'from-white via-white to-white/70' },
    { text: 'Setiap masyarakat berhak mendapatkan dukungan.', color: 'from-white via-white to-white/70' },
    { text: 'Setiap masa depan dimulai dari pendidikan.', color: 'from-white via-gold to-white/70' },
    { text: 'Dan NHE hadir untuk mewujudkannya.', color: 'from-gold via-gold-hover to-gold' },
  ];

  return (
    <section
      id="storytelling-section"
      className="relative py-28 md:py-40 bg-pure-dark overflow-hidden"
    >
      {/* Decorative vertical center tracking timeline line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-gold/15 to-transparent z-0" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div className="space-y-24 md:space-y-36">
          {narrativeLines.map((line, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  type: 'spring',
                  damping: 30,
                  stiffness: 150,
                  delay: 0.1,
                }}
                className="relative group py-2"
              >
                {/* Visual marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-muted-dark border border-gold/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                </div>

                <div className="space-y-4">
                  {idx === 3 && (
                    <div className="flex justify-center items-center gap-1.5 mx-auto mb-2 text-gold opacity-85 text-xs tracking-widest uppercase font-display font-medium">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      <span>Sebuah Komitmen Mulia</span>
                    </div>
                  )}
                  
                  <h2
                    className={`font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r ${line.color} bg-clip-text text-transparent px-4 max-w-2xl mx-auto leading-tight`}
                  >
                    "{line.text}"
                  </h2>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
