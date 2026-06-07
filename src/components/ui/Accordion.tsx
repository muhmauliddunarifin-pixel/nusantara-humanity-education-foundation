/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface AccordionContextType {
  openValue: string | null;
  setOpenValue: (value: string | null) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  defaultValue?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ children, className = '', defaultValue = null }) => {
  const [openValue, setOpenValue] = useState<string | null>(defaultValue);

  return (
    <AccordionContext.Provider value={{ openValue, setOpenValue }}>
      <div className={`space-y-3 ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
};

export interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ value, children, className = '' }) => {
  return (
    <div className={`glass-card rounded-xl overflow-hidden border border-white/5 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { value });
        }
        return child;
      })}
    </div>
  );
};

export interface AccordionTriggerProps {
  value?: string;
  children: React.ReactNode;
  className?: string;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ value, children, className = '' }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionTrigger must be used within Accordion');

  const { openValue, setOpenValue } = context;
  const isOpen = openValue === value;

  const handleToggle = () => {
    setOpenValue(isOpen ? null : value || null);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`w-full flex items-center justify-between p-5 text-left text-white hover:text-gold transition-colors font-display font-medium text-sm md:text-base md:p-6 ${className}`}
    >
      <span>{children}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="text-neutral-400"
      >
        <ChevronDown className="w-5 h-5 text-gold" />
      </motion.div>
    </button>
  );
};

export interface AccordionContentProps {
  value?: string;
  children: React.ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ value, children, className = '' }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionContent must be used within Accordion');

  const { openValue } = context;
  const isOpen = openValue === value;

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className={`px-5 pb-5 pt-0 text-sm text-neutral-300 leading-relaxed font-sans md:px-6 md:pb-6 ${className}`}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
