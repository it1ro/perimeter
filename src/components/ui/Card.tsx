import { type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  as?: 'div' | 'article' | 'section';
}

export function Card({
  hoverable = false,
  as: Tag = 'div',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <Tag
      className={[
        'rounded-2xl border border-white/10 bg-background-soft p-5',
        hoverable &&
          'cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-lg hover:shadow-black/30',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </Tag>
  );
}
