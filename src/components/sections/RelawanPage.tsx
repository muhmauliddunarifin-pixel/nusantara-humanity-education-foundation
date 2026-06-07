/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Separator } from '../ui/Separator';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/Dialog';
import { VolunteerRegistration } from '../../types';
import { 
  Heart, Send, CheckCircle, AlertCircle, ShieldAlert, Sparkles
} from 'lucide-react';

export const RelawanPage: React.FC = () => {
  const [formData, setFormData] = useState<VolunteerRegistration>({
    fullName: '',
    email: '',
    whatsapp: '',
    city: '',
    skill: '',
    motivation: '',
  });

  const [errors, setErrors] = useState<Partial<VolunteerRegistration>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);



  const skillsList = [
    { value: 'Departemen Kemanusiaan (Humanitarian)', label: 'Departemen Kemanusiaan (Humanitarian)' },
    { value: 'Departemen Pengembangan Ekonomi', label: 'Departemen Pengembangan Ekonomi' },
    { value: 'Departemen Edukasi dan Literasi', label: 'Departemen Edukasi dan Literasi' },
    { value: 'Departemen Pemberdayaan Remaja', label: 'Departemen Pemberdayaan Remaja' },
    { value: 'Departemen Media & Komunikasi', label: 'Departemen Media & Komunikasi' },
    { value: 'Departemen Kemitraan & Jaringan', label: 'Departemen Kemitraan & Jaringan' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof VolunteerRegistration]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<VolunteerRegistration> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Nama lengkap wajib diisi';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Alamat email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format alamat email tidak valid';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp aktif wajib diisi';
    } else if (!/^\+?[0-9]{9,15}$/.test(formData.whatsapp.replace(/[\s-]/g, ''))) {
      newErrors.whatsapp = 'Nomor WhatsApp tidak valid (Gunakan format numerik 9-15 digit)';
    }

    if (!formData.city.trim()) newErrors.city = 'Kota domisili asal wajib diisi';
    if (!formData.skill) newErrors.skill = 'Silakan pilih bidang keahlian utama Anda';
    if (!formData.motivation.trim()) {
      newErrors.motivation = 'Harap tuliskan alasan singkat Anda ingin bergabung';
    } else if (formData.motivation.trim().length < 20) {
      newErrors.motivation = 'Motivasi bergabung minimal terdiri atas 20 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/sheets/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Gagal mengirim pendaftaran ke Spreadsheet.");
      }
      
      setSubmittedName(formData.fullName);
      setIsSuccessDialogOpen(true);
      // Reset form on success
      setFormData({
        fullName: '',
        email: '',
        whatsapp: '',
        city: '',
        skill: '',
        motivation: '',
      });
    } catch (err: any) {
      console.error("Pendaftaran error: ", err);
      setSubmitError(err.message || "Terjadi kesalahan tak terduga saat mengirim berkas pendaftaran.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-24 max-w-7xl mx-auto px-6 space-y-16"
    >
      {/* Background radial spotlights */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Page Header */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <Badge variant="primary">Pintu Gerbang Pengabdian</Badge>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white select-none">
          Perekrutan Jaringan <br />
          <span className="text-gradient-gold">Relawan Nusantara</span>
        </h1>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans max-w-xl mx-auto">
          NHE mengundang individu berintegritas, berempati tinggi, dan memiliki dorongan kuat untuk melakukan gotong royong mendistribusikan dampak kebaikan di pelosok Nusantara.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
          {/* Requirement callouts */}
          <Card className="glass-card p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center text-gold">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white uppercase tracking-tight">Kriteria Dasar Relawan</h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-xs text-gold shrink-0 mt-0.5">✓</div>
                <p>Minimal berusia 18 tahun dan berkomitmen menyelesaikan program penugasan kerja yang disepakati.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-xs text-gold shrink-0 mt-0.5">✓</div>
                <p>Menjunjung tinggi etika keragaman budaya adat, moralitas, serta inklusivitas sosial di lapangan.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-xs text-gold shrink-0 mt-0.5">✓</div>
                <p>Mendedikasikan keterampilan secara sukarela demi kemajuan masyarakat, bukan keuntungan pribadi.</p>
              </div>
            </div>

            <Separator className="opacity-30" />

            <div className="p-4 rounded-xl bg-gold/10 border border-gold/15 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display font-semibold text-xs text-gold uppercase tracking-wider">Tanpa Biaya</h4>
                <p className="text-[11px] text-neutral-300 font-sans leading-relaxed pt-0.5">NHE melarang segala bentuk pungutan biaya rekrutmen. Seluruh proses pendaftaran ini berjalan secara tepercaya dan transparan.</p>
              </div>
            </div>
          </Card>

          {/* Sincere message */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-gold">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <h4 className="font-display font-semibold text-xs tracking-wider uppercase">Fase Pembekalan Terarah</h4>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Setiap relawan terpilih wajib mengikuti rangkaian pembekalan kesiapan psikososial, penguasaan metodologi pengajaran kreatif, serta dasar mitigasi bencana terpadu pra-penugasan.
            </p>
          </div>
        </div>

        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="glass-card p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-2xl font-bold font-display text-white">Formulir Pendaftaran</CardTitle>
              <p className="text-xs text-neutral-400 font-sans mt-1">Silakan lengkapi koordinat keahlian Anda untuk diulas sekretariat internal.</p>
            </CardHeader>

            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Nama Lengkap */}
                <Input
                  label="Nama Lengkap Sobat"
                  name="fullName"
                  placeholder="Contoh: Arya Yudhistira"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={errors.fullName}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <Input
                    label="Alamat Email Aktif"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                  />

                  {/* WhatsApp */}
                  <Input
                    label="Nomor WhatsApp"
                    name="whatsapp"
                    placeholder="Contoh: 081234567890"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    error={errors.whatsapp}
                    helperText="Guna koordinasi tim sekretariat"
                  />
                </div>

                {/* Kota Domisili */}
                <Input
                  label="Kota Domisili Asal"
                  name="city"
                  placeholder="Contoh: Bandung / Jayapura"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={errors.city}
                />

                {/* Keahlian Select (Custom Styled styled dropdown form element inside TSX) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 font-display">
                    Pilihan Bidang Keahlian Utama
                  </label>
                  <select
                    name="skill"
                    value={formData.skill}
                    onChange={handleInputChange}
                    className={`
                      w-full px-4 py-3 rounded-xl text-sm font-sans 
                      glass-input bg-brand-dark cursor-pointer transition-all duration-300
                      ${errors.skill ? 'border-red-500/50' : 'border-white/80'}
                    `}
                    style={{ backgroundColor: '#1F1F1F' }}
                  >
                    <option value="" disabled className="text-neutral-500">
                      -- Pilih Bidang Keahlian --
                    </option>
                    {skillsList.map((skill) => (
                      <option key={skill.value} value={skill.value} className="text-white bg-brand-dark py-2">
                        {skill.label}
                      </option>
                    ))}
                  </select>
                  {errors.skill && (
                    <p className="text-xs text-red-400 font-sans mt-1">{errors.skill}</p>
                  )}
                </div>

                {/* Motivasi Textarea */}
                <Textarea
                  label="Motivasi & Alasan Ingin Bergabung"
                  name="motivation"
                  placeholder="Sampaikan secara singkat mengenai kepedulian Anda, pandangan Anda mengenai visi kemanusiaan/pendidikan NHE, maupun riwayat pengabdian jika ada..."
                  value={formData.motivation}
                  onChange={handleInputChange}
                  error={errors.motivation}
                  rows={5}
                />

                {submitError && (
                  <div className="flex gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs font-sans animate-fade-in">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold pb-1">Gagal Mengirim Pendaftaran</strong>
                      <span className="opacity-90">{submitError}</span>
                    </div>
                  </div>
                )}

                {/* Form submit button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full relative group"
                  >
                    <span>{isSubmitting ? 'Mengirim Data Terenkripsi...' : 'Kirim Berkas Pendaftaran'}</span>
                    {!isSubmitting && <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </div>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Dialog Modal upon registration completed */}
      <Dialog isOpen={isSuccessDialogOpen} onClose={() => setIsSuccessDialogOpen(false)}>
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
            <CheckCircle className="w-6 h-6 animate-pulse" />
          </div>
          <DialogTitle>Pendaftaran Berhasil Diterima!</DialogTitle>
          <DialogDescription>
            Terima kasih, <strong className="text-white">{submittedName}</strong>! Formulir pendaftaran relawan Anda telah diterima oleh kesekretariatan Nusantara Humanity & Education Foundation secara terhormat.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 px-1 text-xs text-neutral-300 leading-relaxed font-sans space-y-3">
          <p>
            • Berkas pendaftaran Anda saat ini masuk ke tahap ulasan kelayakan dasar oleh internal komite rekrutmen.
          </p>
          <p>
            • Agenda komunikasi resmi berikutnya (Fase Wawancara Singkat) akan dilayangkan langsung oleh naracubung resmi NHE ke nomor WhatsApp terdaftar Anda dalam 48 jam ke depan.
          </p>
        </div>

        <DialogFooter>
          <Button variant="primary" size="sm" className="w-full text-xs cursor-pointer" onClick={() => setIsSuccessDialogOpen(false)}>
            Mengerti, Terima Kasih
          </Button>
        </DialogFooter>
      </Dialog>

    </motion.div>
  );
};
