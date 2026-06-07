/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-pure-dark/80 backdrop-blur-md cursor-pointer"
          />

          {/* Drawer Sheet Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 bottom-0 right-0 w-full max-w-sm h-full bg-muted-dark border-l border-white/5 shadow-2xl p-6 z-10 flex flex-col justify-between"
          >
            {/* Header close area */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-display font-bold text-gradient-gold text-lg">NHE Foundation</span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-gold" />
                </button>
              </div>
              {children}
            </div>

            {/* Sticky trademark footprint at the base */}
            <div className="text-center font-display text-[10px] text-neutral-500 uppercase tracking-widest pt-4 border-t border-white/5">
              Nusantara Humanity & Education © 2026
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
