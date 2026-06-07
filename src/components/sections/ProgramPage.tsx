/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Separator } from '../ui/Separator';
import { programsData } from '../../data/programs';
import { GraduationCap, HeartHandshake, Compass, Cpu, Target, ShieldCheck, Sparkles } from 'lucide-react';

export const ProgramPage: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState(programsData[0].id);

  const getIcon = (iconName: string, color: string) => {
    const style = { color };
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-8 h-8" style={style} />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-8 h-8" style={style} />;
      case 'Compass':
        return <Compass className="w-8 h-8" style={style} />;
      case 'Cpu':
        return <Cpu className="w-8 h-8" style={style} />;
      default:
        return <GraduationCap className="w-8 h-8" style={style} />;
    }
  };

  const activeProgram = programsData.find((p) => p.id === selectedProgram) || programsData[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-24 space-y-20 max-w-7xl mx-auto px-6"
    >
      {/* Page Header */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <Badge variant="primary">Fokus Pengabdian</Badge>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white select-none">
          Pilar Kerja & <br />
          <span className="text-gradient-gold">Program Unggulan</span>
        </h1>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans max-w-xl mx-auto">
          Setiap inisiatif dirancang secara terukur untuk menanggapi persoalan real kemasyarakatan dengan integritas pelaporan dan dampak berkelanjutan.
        </p>
      </div>

      {/* Program Selector Tabs - Apple style glass slider */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-white/5 rounded-2xl border border-white/5 max-w-4xl mx-auto">
        {programsData.map((prog) => {
          const isActive = selectedProgram === prog.id;
          return (
            <button
              key={prog.id}
              onClick={() => setSelectedProgram(prog.id)}
              className={`relative px-5 py-3 rounded-xl text-xs md:text-sm font-semibold font-display tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 outline-none cursor-pointer ${
                isActive ? 'text-pure-dark font-extrabold' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeProgramTab"
                  className="absolute inset-0 bg-gold rounded-xl z-0"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{prog.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Program Active Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProgram}
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -15 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          id={`detail-${activeProgram.id}`}
        >
          {/* Main program description block (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <Card className="glass-card p-6 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {getIcon(activeProgram.icon, activeProgram.themeColor)}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                      {activeProgram.title}
                    </h2>
                    <span className="text-[10px] tracking-wider uppercase font-mono text-gold-hover font-semibold">
                      Spesifikasi Kurikulum NHE
                    </span>
                  </div>
                </div>

                <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-sans font-light">
                  {activeProgram.description}
                </p>

                <Separator className="opacity-40" />

                {/* Sub-block Objectives / Tujuan (Tujuan Program) */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-gold">
                    <Target className="w-4 h-4" />
                    <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-white">Tujuan Pokok</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {activeProgram.objectives.map((obj, i) => (
                      <div key={i} className="flex gap-3.5 items-start p-4 rounded-xl bg-white/5 border border-white/5 hover:border-gold/20 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 mt-0.5 font-display font-bold text-xs">
                          {i + 1}
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                          {obj}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </Card>
          </div>

          {/* Side impact details block (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Impact Projection card */}
            <Card className="glass-card p-8 border border-gold/15 relative overflow-hidden">
              {/* Highlight gradient edge */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold/30 via-gold to-gold/30" />

              <div className="space-y-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-sm text-white tracking-widest uppercase">Target Dampak Perolehan</h3>
                    <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-mono">Dampak Yang Diharapkan</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {activeProgram.expectedImpact.map((impact, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] mt-2 shrink-0 animate-pulse" />
                      <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                        {impact}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="opacity-30" />

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center text-xs text-neutral-400 font-sans leading-relaxed">
                  Semua target perolehan dampak mengacu pada parameter evaluasi bulanan yang diaudit internal demi transparansi moral Nusantara.
                </div>
              </div>
            </Card>

            {/* Quick action card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent border border-white/5 space-y-4">
              <div className="flex items-center gap-2 text-gold">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                <h4 className="font-display font-semibold text-xs tracking-wider uppercase">Tertarik Ikut Pengabdian?</h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                NHE menugaskan tim relawan terdidik ke area penyaluran agar target program ini tercapai dengan baik. Jadilah inisiator gerakan.
              </p>
              <div className="text-[10px] uppercase font-mono tracking-widest text-white/50">
                Pendaftaran Aktif 2026
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </motion.div>
  );
};
