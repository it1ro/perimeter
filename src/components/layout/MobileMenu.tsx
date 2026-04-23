'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-black/30 backdrop-blur-2xl transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Мобильное меню"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-background-soft/25 backdrop-blur-2xl pointer-events-none"
        />

        <div className="relative flex h-16 items-center justify-between border-b border-white/10 px-5">
          <span className="text-sm font-medium text-text-muted">Меню</span>
          <button
            onClick={onClose}
            aria-label="Закрыть меню"
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-white/10 hover:text-text"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav
          aria-label="Мобильная навигация"
          className="relative flex flex-1 flex-col gap-2 overflow-y-auto p-6"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={[
                'rounded-xl px-4 py-3 text-base font-medium transition-colors',
                isActive(link.href)
                  ? 'bg-sage/15 text-sage'
                  : 'text-text hover:bg-white/10 hover:text-sage',
              ].join(' ')}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
