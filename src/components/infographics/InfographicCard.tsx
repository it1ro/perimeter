'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';

interface InfographicCardProps {
  src: string;
  alt: string;
  title: string;
  description?: string;
}

export function InfographicCard({ src, alt, title, description }: InfographicCardProps) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          setOpen(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
        if (previouslyFocusedElementRef.current) {
          previouslyFocusedElementRef.current.focus();
        }
      };
    }

    return undefined;
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Открыть инфографику: ${title}`}
        className="group w-full rounded-2xl border border-white/10 bg-background-soft p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-lg hover:shadow-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={src}
            alt={alt}
            fill
            unoptimized
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/30">
            <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </div>
        </div>
        <h3 className="font-display mt-3 text-base font-semibold text-text">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-text-muted">{description}</p>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Инфографика: ${title}`}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <m.div
              className="relative max-h-[90vh] max-w-4xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                ref={closeButtonRef}
                onClick={() => setOpen(false)}
                className="absolute -right-2 -top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background-soft text-text-muted transition-colors hover:bg-white/20 hover:text-text"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={900}
                unoptimized
                className="rounded-2xl"
              />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
