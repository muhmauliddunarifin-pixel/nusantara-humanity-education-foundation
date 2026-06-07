/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyle = 'inline-flex items-center justify-center font-medium rounded-full cursor-pointer overflow-hidden transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-display';

    const sizeStyles = {
      sm: 'px-4 py-1.5 text-xs tracking-wide',
      md: 'px-6 py-2.5 text-sm tracking-wide',
      lg: 'px-8 py-3.5 text-base tracking-wide',
    };

    const variantStyles = {
      primary: 'gradient-gold-bg text-pure-dark font-semibold shadow-lg hover:shadow-gold/20 hover:scale-[1.02] active:scale-[0.98]',
      secondary: 'glass text-white hover:border-gold/30 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,199,0,0.1)] hover:scale-[1.02] active:scale-[0.98]',
      outline: 'border border-gold text-gold bg-transparent hover:bg-gold/10 hover:scale-[1.02] active:scale-[0.98]',
      ghost: 'text-white hover:text-gold hover:bg-white/5 active:scale-[0.98]',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
