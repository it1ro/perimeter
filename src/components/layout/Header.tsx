'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MobileMenu } from './MobileMenu';
import { NAV_LINKS } from '@/lib/constants';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group relative inline-block px-2 pb-1 pt-4 text-xl font-bold tracking-tight text-text transition-colors hover:text-sage"
        >
          {/* Corner brackets — perimeter frame */}
          <span className="absolute -left-1.5 -top-1.5 h-3 w-3 border-l border-t border-sage/25 transition-colors group-hover:border-sage/50" />
          <span className="absolute -right-1.5 -top-1.5 h-3 w-3 border-r border-t border-sage/25 transition-colors group-hover:border-sage/50" />
          <span className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border-b border-l border-sage/25 transition-colors group-hover:border-sage/50" />
          <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border-b border-r border-sage/25 transition-colors group-hover:border-sage/50" />

          <span className="absolute left-2 top-1 text-[10px] font-semibold tracking-wider text-sage">
            Мой
          </span>
          Периметр
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Основная навигация" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150',
                isActive(link.href)
                  ? 'text-text after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-sage after:content-[""]'
                  : 'text-text-muted hover:text-text',
              ].join(' ')}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className="rounded-lg p-2 text-text-muted transition-colors hover:bg-white/10 hover:text-text md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
