/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Badge } from '../ui/Badge';
import { Sparkles, CalendarRange, Map, Users2, Award, Users } from 'lucide-react';

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

const TickingCounter: React.FC<CounterProps> = ({ target, duration = 1500, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentElement = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Cosine ease-out curve for smooth deceleration
      const easePercentage = 1 - Math.cos((percentage * Math.PI) / 2);
      
      setCount(Math.floor(easePercentage * target));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const ImpactTarget: React.FC = () => {
  const targets = [
    {
      icon: Users2,
      targetVal: 100,
      suffix: '+',
      label: 'Relawan Terlatih',
      description: 'Pemuda, akademisi, dan praktisi kesehatan/sosial siap mengabdi di garis depan gerakan.'
    },
    {
      icon: Award,
      targetVal: 20,
      suffix: '',
      label: 'Program Kerja Terencana',
      description: 'Intervensi sosial spesifik dan terukur di bidang pengajaran, kemanusiaan, dan kecakapan digital.'
    },
    {
      icon: Map,
      targetVal: 10,
      suffix: '',
      label: 'Kota & Kabupaten Fokus',
      description: 'Konsentrasi penyaluran dampak utama di daerah 3T (Tertinggal, Terdepan, dan Terluar).'
    },
    {
      icon: Users,
      targetVal: 1000,
      suffix: '+',
      label: 'Penerima Manfaat Langsung',
      description: 'Anak-anak, warga pra-sejahtera, komunitas adat, dan pendidik lokal mendapat akses inklusif.'
    }
  ];

  return (
    <section className="relative py-24 bg-muted-dark overflow-hidden">
      {/* Absolute grid and ambient glow */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-20" />
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <Badge variant="primary" className="mx-auto">
            Resolusi Proyeksi
          </Badge>
          <div className="flex justify-center items-center gap-1.5 text-gold text-xs font-mono font-semibold uppercase tracking-widest">
            <CalendarRange className="w-4 h-4" />
            <span>Target Tahun Progresif 2026</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Mewujudkan Dampak <br />
            <span className="text-gradient-gold">Nyata Berkelanjutan</span>
          </h2>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans max-w-xl mx-auto">
            NHE berfokus pada target realistis yang dirancang komprehensif untuk melayani masyarakat terpinggirkan dengan tolok ukur kesuksesan terukur.
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {targets.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-2xl border border-white/5 hover:border-gold/25 relative overflow-hidden group text-center md:text-left flex flex-col items-center md:items-start"
              >
                {/* Minimalist icon background accent */}
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center text-gold mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                    <TickingCounter target={item.targetVal} suffix={item.suffix} />
                  </h3>
                  
                  <h4 className="font-display font-bold text-sm text-gold-hover uppercase tracking-wider">
                    {item.label}
                  </h4>
                  
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Shimmer accent line at card head */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>

        {/* Accountability footnote */}
        <div className="text-center mt-12 text-xs text-neutral-500 font-mono flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Informasi di atas merupakan perencanaan operasi & target kinerja NHE Foundation per tahun 2026.</span>
        </div>

      </div>
    </section>
  );
};
