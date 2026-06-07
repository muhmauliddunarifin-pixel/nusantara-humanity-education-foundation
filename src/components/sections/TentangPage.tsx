/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Separator } from '../ui/Separator';
import { ShieldAlert, Heart, GraduationCap, Users2, CalendarDays, Compass, CheckCircle } from 'lucide-react';

export const TentangPage: React.FC = () => {
  const values = [
    {
      icon: ShieldAlert,
      title: 'Integritas',
      desc: 'Kami menjunjung tinggi kejujuran, akuntabilitas moral, serta keadilan sosial dalam menyalurkan setiap bentuk bantuan sosial bagi masyarakat Nusantara.',
    },
    {
      icon: Heart,
      title: 'Kemanusiaan',
      desc: 'NHE berpihak penuh pada martabat kehidupan, perlindungan masa kanak-kanak, serta pengentasan kerawanan sosial beralaskan kasih sayang tulus.',
    },
    {
      icon: GraduationCap,
      title: 'Pendidikan',
      desc: 'Merupakan jangkar peradaban. Kami berkomitmen menyalakan api pengetahuan, keterampillan terapan, serta akhlak budi pekerti luhur bagi generasi depan.',
    },
    {
      icon: Users2,
      title: 'Kolaborasi',
      desc: 'Perubahan kolosal dicapai melalui kebersamaan. Kami merajut sinergi yang inklusif bersama relawan, pemuka adat, komunitas lokal, dan akademisi.',
    },
  ];

  const timelineSteps = [
    {
      year: 'Fase Inisiasi',
      title: 'Keresahan yang Mengkristal',
      desc: 'Bertemu di tengah tugas kerelaan lapangan, sekelompok praktisi pendidikan dan pegiat mitigasi bencana menggagas wadah yang murni berfokus melayani geografi 3T.',
    },
    {
      year: 'Fase Pendirian Dasar',
      title: 'Konsolidasi & Kelahiran NHE',
      desc: 'Para penasihat kultural menetapkan visi Nusantara Humanity & Education. Struktur kerangka kurikulum literasi tech serta tanggap kemanusiaan dirampungkan.',
    },
    {
      year: 'Fase Proyeksi 2026',
      title: 'Bentangan Kebaikan Nusantara',
      desc: 'Peluncuran jaringan platform rekrutmen terpusat guna merangkul 100 relawan terlatih mengemban 20 program spesifik pada 10 kota sasaran perdana.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="pt-32 pb-24 space-y-24"
    >
      {/* Background spotlights */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
        <Badge variant="primary">Mengenal Lebih Dekat</Badge>
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white select-none">
          Misi Mulia Untuk <br />
          <span className="text-gradient-gold">Nusantara Indonesia</span>
        </h1>
        <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-sans">
          Nusantara Humanity & Education (NHE) Foundation adalah lembaga di bawah naungan Forum Genre Kabupaten Muna yang berkomitment pada keadilan sosial, pendidikan bermutu, dan pemberdayaan berkelanjutan.
        </p>
      </div>

      {/* Segment 1: Visi & Misi Col (2 Columns on Desktop) */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card Visi */}
          <Card className="glass-card p-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
            <CardHeader className="p-6">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center text-gold mb-4">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <CardTitle className="text-2xl font-bold font-display text-white">Visi Organisasi</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 font-sans text-neutral-300 text-sm md:text-base leading-relaxed space-y-4">
              <p>
                Menjadi penggerak perubahan sosial yang berkelanjutan dalam menciptakan masyarakat yang adil, beradab, dan berdaya melalui Humanity, Education and Empowerment (HEE).
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-gold uppercase tracking-wider font-display font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>Humanity, Education & Empowerment (HEE)</span>
              </div>
            </CardContent>
          </Card>

          {/* Card Misi */}
          <Card className="glass-card p-4 relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
            <CardHeader className="p-6">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center text-gold mb-4">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl font-bold font-display text-white">Misi Keberlanjutan</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 font-sans text-neutral-300 text-sm md:text-base leading-relaxed">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/15 font-display font-bold text-xs text-gold flex items-center justify-center shrink-0 mt-0.5">1</div>
                  <p>Menyelenggarakan kegiatan kemanusiaan yang responsif.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/15 font-display font-bold text-xs text-gold flex items-center justify-center shrink-0 mt-0.5">2</div>
                  <p>Memberikan edukasi dan literasi untuk meningkatkan kesadaran generasi muda.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/15 font-display font-bold text-xs text-gold flex items-center justify-center shrink-0 mt-0.5">3</div>
                  <p>Memberikan pemberdayaan kepada masyarakat khususnya generasi muda melalui pelatihan dan pendampingan.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/15 font-display font-bold text-xs text-gold flex items-center justify-center shrink-0 mt-0.5">4</div>
                  <p>Membangun jaringan kolaborasi dengan berbagai pihak secara transparan dan berintegritas.</p>
                </li>
              </ul>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Segment 2: Timeline Cerita (Cerita Organisasi) */}
      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="text-center space-y-4 mb-20">
          <Badge variant="primary">Lintas Sejarah Keberanian</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">Timeline Cerita Kami</h2>
          <p className="text-sm text-neutral-400 font-sans max-w-sm mx-auto">Perjalanan murni bagaimana semangat gotong royong ini dirajut.</p>
        </div>

        {/* Vertical Timeline Track */}
        <div className="absolute top-[240px] bottom-10 left-[26px] md:left-1/2 w-[1px] bg-white/10" />

        <div className="space-y-12 md:space-y-16">
          {timelineSteps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row relative items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Visual marker marker dot */}
                <div className="absolute top-1 left-3 md:left-1/2 -translate-x-[9.5px] w-5 h-5 rounded-full border-2 border-gold bg-muted-dark flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                </div>

                {/* Desktop Spacer on alternative side, column sizes standard */}
                <div className="hidden md:block w-1/2" />

                {/* Timeline Panel element */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                  <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 space-y-4 hover:border-gold/25 transition-all">
                    <div className="flex items-center gap-2 text-gold font-display font-semibold text-xs uppercase tracking-widest">
                      <CalendarDays className="w-4 h-4" />
                      <span>{step.year}</span>
                    </div>
                    <h4 className="font-display font-semibold text-lg text-white">{step.title}</h4>
                    <p className="text-sm text-neutral-400 font-sans leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Segment 3: Nilai-Nilai Organisasi (4 Cards) */}
      <div className="max-w-7xl mx-auto px-6 whitespace-normal">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="primary">Karakter Dasar</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">Nilai-Nilai Organisasi</h2>
          <p className="text-sm text-neutral-400 font-sans max-w-sm mx-auto">Landasan etika dan kode moral tertinggi yang melekat dalam tubuh NHE.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="glass-card p-4 h-full flex flex-col justify-between">
                  <CardHeader className="p-6 pb-2">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center text-gold mb-4 font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-white font-display text-base tracking-tight font-bold">
                      {v.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2 text-neutral-400 font-sans text-xs leading-relaxed leading-normal">
                    {v.desc}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

    </motion.div>
  );
};
