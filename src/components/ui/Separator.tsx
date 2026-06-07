/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  glow?: boolean;
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  glow = false,
  className = '',
  ...props
}) => {
  const isHorizontal = orientation === 'horizontal';
  
  return (
    <div
      className={`
        ${isHorizontal ? 'h-[1px] w-full' : 'w-[1px] h-full'}
        ${glow 
          ? 'bg-gradient-to-r from-transparent via-gold/30 to-transparent shadow-[0_0_10px_rgba(255,199,0,0.2)]' 
          : 'bg-white/10'
        }
        ${className}
      `}
      {...props}
    />
  );
};
