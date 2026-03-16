'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/articles', label: 'Статьи' },
  { href: '/tests', label: 'Тесты' },
  { href: '/infographics', label: 'Инфографика' },
  { href: '/about', label: 'О проекте' },
];

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
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-background-soft shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Мобильное меню"
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
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

        <nav className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={[
                'rounded-lg px-4 py-3 text-base font-medium transition-colors',
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
