'use client';

import { type ButtonHTMLAttributes } from 'react';

interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  label: string;
}

export function Tag({ active = false, label, className = '', ...props }: TagProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50',
        active
          ? 'bg-sage/20 text-sage ring-1 ring-sage/40'
          : 'bg-white/10 text-text-muted hover:bg-white/20 hover:text-text',
        className,
      ].join(' ')}
      aria-pressed={active}
      {...props}
    >
      {label}
    </button>
  );
}
