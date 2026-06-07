/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId } from '../../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { GraduationCap, HeartHandshake, Compass, Cpu, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { programsData } from '../../data/programs';

interface ProgramOverviewProps {
  onPageChange: (page: PageId) => void;
}

export const ProgramOverview: React.FC<ProgramOverviewProps> = ({ onPageChange }) => {
  // Mapping of icons based on string ID
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-gold" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-gold" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-gold" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-gold" />;
      default:
        return <GraduationCap className="w-6 h-6 text-gold" />;
    }
  };

  const handleProgramClick = (programId: string) => {
    // Navigate to program tab and scroll to program block
    onPageChange('program');
    setTimeout(() => {
      const element = document.getElementById(`detail-${programId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="relative py-24 bg-pure-dark overflow-hidden">
      {/* Decorative gradient spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-gold-radial opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <Badge variant="primary">Pilar Gerakan</Badge>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Program Pengabdian <br />
              <span className="text-gradient-gold">Nusantara</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm md:text-base max-w-md font-sans leading-relaxed">
            Setiap aksi kami dirancang secara spesifik, terukur, dan berdampingan erat dengan masyarakat lokal untuk memastikan keberlanjutan perubahan jangka panjang.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programsData.map((program, idx) => {
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex"
              >
                <Card className="flex flex-col justify-between w-full p-2 h-full glass-card group cursor-pointer" onClick={() => handleProgramClick(program.id)}>
                  <div>
                    <CardHeader className="p-6 pb-2">
                      <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold/15 transition-all duration-300">
                        {getIcon(program.icon)}
                      </div>
                      <CardTitle className="text-white group-hover:text-gold transition-colors font-display text-lg tracking-tight font-bold">
                        {program.title}
                      </CardTitle>
                      <CardDescription className="text-neutral-400 text-xs tracking-wider uppercase font-semibold font-display pt-1">
                        Pilar {idx + 1}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6 pt-2 font-sans text-sm text-neutral-300 leading-relaxed">
                      {program.shortDesc}
                    </CardContent>
                  </div>

                  <CardFooter className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gold font-display group-hover:text-white transition-colors">
                    <span>Lihat Detail Program</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional CTA below grid */}
        <div className="text-center mt-16">
          <Button variant="secondary" onClick={() => onPageChange('program')}>
            Eksplorasi Kurikulum & Program Kerja
          </Button>
        </div>

      </div>
    </section>
  );
};
