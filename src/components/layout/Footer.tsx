/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId } from '../../types';
import { Separator } from '../ui/Separator';
import { Mail, MessageSquare, Instagram, Facebook, Linkedin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const socialLinks = [
    { name: 'Email Address', icon: Mail, href: 'mailto:nhefoundation26@gmail.com', detail: 'nhefoundation26@gmail.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/nhefoundation.id/', detail: '@nhe_foundation26' },
    { name: 'Saluran WhatsApp', icon: MessageSquare, href: 'https://whatsapp.com/channel/0029VbCJVVhHQbSBKk2brz1C', detail: 'WhatsApp Channel' },
    { name: 'Discord', icon: ArrowUpRight, href: 'https://discord.gg/TNRCGvk42', detail: 'Join Discord' },
  ];

  const handleNavClick = (id: PageId) => {
    onPageChange(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-pure-dark border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Golden ambient background radial light flare */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Summary Column (5 cols on Desktop) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden bg-white p-1 shadow-xl">
                <img
                  src="/img/logo.png"
                  alt="NHE Foundation Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left flex flex-col justify-center">
                <span className="block font-display font-extrabold tracking-tight text-white text-base md:text-lg uppercase leading-none mb-1">
                  Nusantara Humanity
                </span>
                <span className="block text-[10px] uppercase font-bold text-gold tracking-widest font-display leading-none">
                  & Education Foundation
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Berada dalam naungan Forum Genre Kabupaten Muna, berfokus pada penguatan nilai kemanusiaan melalui pendidikan, pemberdayaan generasi muda, dan gerakan sosial berkelanjutan.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full bg-white/5 border border-white/5 text-neutral-300 hover:text-gold hover:bg-gold/10 hover:border-gold/25 transition-all text-sm group"
                    title={social.name}
                  >
                    <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Nav links Column (3 cols on Desktop) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-display font-semibold text-xs tracking-widest text-gold uppercase">
              Navigasi Halaman
            </h4>
            <ul className="space-y-3">
              {[
                { id: 'home', label: 'Beranda' },
                { id: 'tentang', label: 'Tentang Kami' },
                { id: 'program', label: 'Program Unggulan' },
                { id: 'relawan', label: 'Perekrutan Relawan' },
                { id: 'kontak', label: 'Hubungi Kami' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id as PageId)}
                    className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-1 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Contacts Column (4 cols on Desktop) */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="font-display font-semibold text-xs tracking-widest text-gold uppercase">
              Hubungi Sekretariat
            </h4>
            <div className="space-y-4">
              <p className="text-neutral-300 text-sm leading-relaxed">
                Nusantara Humanity & Education Foundation<br />
                <span className="text-neutral-400 text-xs">Muna, Sulawesi Tenggara, Indonesia</span>
              </p>
              
              <div className="space-y-2.5 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gold" />
                  <a href="mailto:nhefoundation26@gmail.com" className="hover:text-white transition-colors">
                    nhefoundation26@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-gold" />
                  <a href="https://whatsapp.com/channel/0029VbCJVVhHQbSBKk2brz1C" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    Saluran WhatsApp NHE
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
                  <a href="https://discord.gg/TNRCGvk42" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    Join Discord Server
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12 opacity-50" glow />

        {/* Footer Base bottom area */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-sans">
          <p>
            &copy; 2026 m4uliddun. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="hover:text-gold transition-colors cursor-help">Kebijakan Privasi</span>
            <span className="hover:text-gold transition-colors cursor-help">Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
