/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', className = '', ...props }, ref) => {
    const baseStyle = 'inline-flex items-center px-3 py-1 text-xs font-semibold font-display tracking-wider rounded-full uppercase transition-all duration-300';
    
    const variantStyles = {
      primary: 'bg-gold/15 text-gold border border-gold/30',
      secondary: 'bg-white/5 text-white/80 border border-white/10',
      outline: 'border border-gold text-gold bg-transparent',
    };

    return (
      <span
        ref={ref}
        className={`${baseStyle} ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
