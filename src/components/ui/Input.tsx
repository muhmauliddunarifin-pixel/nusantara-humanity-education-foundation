/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', type = 'text', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 font-display">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={`
            w-full px-4 py-3 rounded-xl text-sm font-sans 
            glass-input transition-all duration-300
            placeholder:text-neutral-500
            ${error ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' : ''}
            ${className}
          `}
          {...props}
        />
        {error ? (
          <p className="text-xs text-red-400 font-sans mt-1">{error}</p>
        ) : (
          helperText && (
            <p className="text-xs text-neutral-500 font-sans mt-1">{helperText}</p>
          )
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
