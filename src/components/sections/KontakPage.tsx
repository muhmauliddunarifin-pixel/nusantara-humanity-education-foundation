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
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/Dialog';
import { Mail, MessageSquare, Instagram, Send, MapPin, CheckCircle, Sparkles, ArrowUpRight, AlertCircle } from 'lucide-react';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../firebase';

export const KontakPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailStatusMessage, setEmailStatusMessage] = useState<string | null>(null);

  const socialLinks = [
    {
      name: 'Surat Elektronik',
      value: 'nhefoundation26@gmail.com',
      icon: Mail,
      href: 'mailto:nhefoundation26@gmail.com',
    },
    {
      name: 'Instagram Resmi',
      value: '@nhe_foundation26',
      icon: Instagram,
      href: 'https://www.instagram.com/nhe_foundation26?igsh=ODZncW10dXpkM2lu',
    },
    {
      name: 'Saluran WhatsApp',
      value: 'Ikuti Saluran WhatsApp NHE',
      icon: MessageSquare,
      href: 'https://whatsapp.com/channel/0029VbCJVVhHQbSBKk2brz1C',
    },
    {
      name: 'Join Discord Server',
      value: 'Discord Community Link',
      icon: ArrowUpRight,
      href: 'https://discord.gg/TNRCGvk42',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof formData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) newErrors.name = 'Nama lengkap wajib diisi';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Alamat email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.subject.trim()) newErrors.subject = 'Subjek pesan wajib diisi';
    if (!formData.message.trim()) {
      newErrors.message = 'Isi pesan wajib ditulis';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Isi pesan minimal terdiri atas 15 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setEmailStatusMessage(null);
    const randomId = doc(collection(db, 'contacts')).id;

    try {
      // 1. Write message to Firestore database
      await setDoc(doc(db, 'contacts', randomId), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: serverTimestamp(),
      });

      // 2. Transmit to server SMTP router to notify Gmail
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }),
        });

        const resData = await response.json();
        if (response.ok && resData.success) {
          setEmailStatusMessage(resData.message || "Pesan berhasil diteruskan langsung ke Gmail NHE.");
        } else {
          setEmailStatusMessage(resData.error || "Gagal meneruskan surel, namun pesan berhasil terekam di database.");
        }
      } catch (apiErr) {
        console.error("API contact error: ", apiErr);
        setEmailStatusMessage("Koneksi server SMTP terhambat. Pesan Anda tetap berhasil tersimpan di sistem.");
      }

      setSenderName(formData.name);
      setIsSuccessOpen(true);
      // Reset form variables
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      console.error("Firebase write error: ", err);
      try {
        handleFirestoreError(err, OperationType.CREATE, `contacts/${randomId}`);
      } catch (mappedError) {
        if (mappedError instanceof Error) {
          setSubmitError(mappedError.message);
        } else {
          setSubmitError("Gagal menyimpan pesan karena batasan penulisan database.");
        }
      }
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
      {/* Absolute backgrounds spotlights */}
      <div className="absolute top-[20%] left-[-15%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Page Header */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <Badge variant="primary">Hubungan Kemitraan & Informasi</Badge>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white select-none">
          Hubungi Sekretariat <br />
          <span className="text-gradient-gold">NHE Foundation</span>
        </h1>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans max-w-xl mx-auto">
          Ingin berkolaborasi, bertanya mengenai detail program, atau mengajukan kemitraan strategis? Tim komunikator NHE siap menyambut pesan Anda secara profesional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Coordinates (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="glass-card p-6 md:p-8 space-y-8">
            <div className="space-y-2">
              <h3 className="font-display font-semibold text-lg text-white">Saluran Informasi Resmi</h3>
              <p className="text-xs text-neutral-400 font-sans">NHE hanya melayani korespondensi formal maupun sukarela melalui saluran terverifikasi di bawah ini.</p>
            </div>

            <div className="space-y-5">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-gold/25 hover:bg-gold/5 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center text-gold group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-mono tracking-wider font-semibold text-neutral-400">
                        {item.name}
                      </span>
                      <span className="block text-sm font-sans font-medium text-white group-hover:text-gold transition-colors">
                        {item.value}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Sekretariat Address placeholder */}
            <div className="pt-4 border-t border-white/5 flex gap-3 text-xs text-neutral-400 font-sans leading-relaxed">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-display">Kesekretariatan NHE Foundation</strong><br />
                Naungan Forum Genre Kabupaten Muna,<br />
                Kabupaten Muna, Sulawesi Tenggara, Indonesia.
              </div>
            </div>
          </Card>

          {/* Secure channels disclosure */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-gold">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <h4 className="font-display font-semibold text-xs tracking-wider uppercase">Pelayanan Profesional</h4>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Setiap korespondensi kemitraan atau donasi aset berwujud akan direspon secara tertulis dan formal menggunakan kops surat resmi keabsahan yayasan.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Message Form (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="glass-card p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
            
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-2xl font-bold font-display text-white">Kirim Pesan Langsung</CardTitle>
              <p className="text-xs text-neutral-400 font-sans mt-1">Kami menghargai setiap masukan dan gagasan kolaborasi dari masyarakat umum.</p>
            </CardHeader>

            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nama Lengkap */}
                  <Input
                    label="Nama Lengkap Anda"
                    name="name"
                    placeholder="Contoh: Muhammad Ilham"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                  />

                  {/* Email */}
                  <Input
                    label="Alamat Email Korespondensi"
                    name="email"
                    type="email"
                    placeholder="nama@perusahaan.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                  />
                </div>

                {/* Subjek */}
                <Input
                  label="Subjek Hubungan / Hal Utama"
                  name="subject"
                  placeholder="Contoh: Pengajuan Kemitraan Kurikulum Adat"
                  value={formData.subject}
                  onChange={handleInputChange}
                  error={errors.subject}
                />

                {/* Pesan */}
                <Textarea
                  label="Isi Pesan / Rincian Maksud"
                  name="message"
                  placeholder="Tuliskan gagasan orisinal, pertanyaan, maupun maksud hubungan kemitraan Anda secara rincian..."
                  value={formData.message}
                  onChange={handleInputChange}
                  error={errors.message}
                  rows={6}
                />

                {submitError && (
                  <div className="flex gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs font-sans animate-fade-in">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold pb-1">Gagal Mengirim Pesan</strong>
                      <span className="opacity-90">{submitError}</span>
                    </div>
                  </div>
                )}

                {/* Link submit button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full relative group"
                  >
                    <span>{isSubmitting ? 'Mengirim Pesan...' : 'Kirim Pesan Ke Sekretariat'}</span>
                    {!isSubmitting && <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </div>

              </form>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Message Sent Success Dialog */}
      <Dialog isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)}>
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
            <CheckCircle className="w-6 h-6 animate-pulse" />
          </div>
          <DialogTitle>Pesan Berhasil Terkirim!</DialogTitle>
          <DialogDescription>
            Terima kasih, <strong className="text-white">{senderName}</strong>. Pesan Anda telah didistribusikan ke kompartemen relasi kemitraan kesekretariatan NHE Foundation.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 px-1 text-xs text-neutral-300 leading-relaxed font-sans space-y-2">
          {emailStatusMessage && (
            <div className="p-3 mb-3 rounded-lg bg-white/5 border border-white/10 text-gold text-[11px] font-medium leading-relaxed">
              📬 Status Pengiriman Email:<br />
              <span className="text-white font-normal block pt-1 opacity-90">{emailStatusMessage}</span>
            </div>
          )}
          <p>
            • Kode pelacakan korespondensi digital Anda telah terdaftar otomatis dalam tim log surat masuk.
          </p>
          <p>
            • Tanggapan formal nan terarah akan dilayangkan langsung ke alamat email terdaftar Anda dalam kurun waktu 1x24 jam kerja berikutnya.
          </p>
        </div>

        <DialogFooter>
          <Button variant="primary" size="sm" className="w-full text-xs" onClick={() => setIsSuccessOpen(false)}>
            Mengerti
          </Button>
        </DialogFooter>
      </Dialog>

    </motion.div>
  );
};
