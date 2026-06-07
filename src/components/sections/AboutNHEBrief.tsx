/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '../ui/Badge';
import { Target, Compass, Globe, CheckCircle2 } from 'lucide-react';

export const AboutNHEBrief: React.FC = () => {
  const values = [
    {
      icon: Globe,
      title: 'Integritas Kebangsaan',
      desc: 'Membawa semangat gotong royong luhur Nusantara dalam setiap napas aksi sosial kami.',
    },
    {
      icon: Compass,
      title: 'Pilar Masa Depan',
      desc: 'Menempatkan pendidikan berkarakter moral tinggi sebagai fondasi utama perubahan.',
    },
    {
      icon: Target,
      title: 'Empati Tanpa Batas',
      desc: 'Mengalirkan kemanusiaan di tempat krisis terdahsyat dengan inklusivitas mutlak.',
    },
  ];

  return (
    <section className="relative py-24 bg-muted-dark overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Column 1: Story / Written Text Content (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <Badge variant="primary">Kenali Organisasi</Badge>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Merajut Asa Nusantara Lewat <br />
                <span className="text-gradient-gold">Aksi Keadilan Sosial</span>
              </h2>
            </div>

            <div className="space-y-6 text-neutral-300 text-sm md:text-base leading-relaxed">
              <p>
                <strong className="text-white">Nusantara Humanity & Education (NHE) Foundation</strong> adalah sebuah lembaga yang berada dalam naungan <strong className="text-gold">Forum Genre Kabupaten Muna</strong> dan berfokus pada penguatan nilai-nilai kemanusiaan melalui pendidikan, pemberdayaan generasi muda, dan gerakan sosial berkelanjutan di seluruh wilayah Nusantara. 🌿
              </p>
              <p>
                NHE hadir sebagai respon atas berbagai tantangan sosial, kemiskinan, ketimpangan pendidikan, serta krisis kemanusiaan yang masih terjadi di Indonesia. Dengan semangat kolaborasi dan kepedulian, NHE berupaya menjadi jembatan substansial antara kepedulian publik dan kebutuhan nyata masyarakat khususnya generasi muda/remaja.
              </p>
              <p>
                Berlandaskan nilai kemanusiaan, keilmuan, dan pengabdian, NHE secara persisten merancang program taktis jangka panjang demi masa depan yang lebih inklusif dan adil bagi seluruh anak bangsa.
              </p>
            </div>

            {/* List of values/goals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-3 text-left hover:border-gold/20 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-semibold text-sm text-white">{v.title}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">{v.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Creative Vector Abstract Graphic (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-sm aspect-square bg-gradient-to-br from-gold/10 to-transparent rounded-3xl p-6 border border-white/5 flex items-center justify-center overflow-hidden"
            >
              {/* Spinning compass card graphic behind */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[280px] h-[280px] rounded-full border border-gold/10 border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[200px] h-[200px] rounded-full border border-white/5"
              />

              {/* Stacked floating functional panels resembling a dashboard */}
              <div className="relative w-full space-y-4">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-4 rounded-xl bg-pure-dark/90 border border-white/10 shadow-2xl space-y-2 flex items-start gap-3 transform -translate-x-4"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-xs text-white">Visi Kemanusiaan</h5>
                    <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">Menghapus kerentanan, merestorasi martabat kehidupan manusia.</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-4 rounded-xl bg-pure-dark/90 border border-gold/25 shadow-2xl space-y-2 flex items-start gap-3 transform translate-x-4 mix-blend-screen"
                >
                  <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/35 flex items-center justify-center text-gold shrink-0">
                    <CheckCircle2 className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-xs text-gold">Visi Pendidikan</h5>
                    <p className="text-[10px] text-neutral-300 font-sans leading-relaxed">Penyebaran ilmu dan keterampilan aplikaktif tanpa sekat batasan geografis.</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-4 rounded-xl bg-pure-dark/90 border border-white/10 shadow-2xl space-y-2 flex items-start gap-3 transform -translate-x-2"
                >
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-xs text-white">Visi Kolaborasi Kreatif</h5>
                    <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">Menghubungkan pemikir, relawan, dan pendidik lokal di lapangan.</p>
                  </div>
                </motion.div>
              </div>

              {/* Floating asset blur points */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_#FFC700]" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10B981]" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
