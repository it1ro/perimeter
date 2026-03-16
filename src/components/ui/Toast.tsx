'use client';

import { useEffect, useState } from 'react';

type ToastVariant = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose?: () => void;
}

const variantConfig: Record<
  ToastVariant,
  { icon: string; classes: string }
> = {
  success: {
    icon: '✓',
    classes: 'border-sage/40 bg-sage/10 text-sage',
  },
  error: {
    icon: '✕',
    classes: 'border-terracotta/40 bg-terracotta/10 text-terracotta',
  },
  info: {
    icon: 'i',
    classes: 'border-blue/40 bg-blue/10 text-blue',
  },
};

export function Toast({
  message,
  variant = 'info',
  duration = 3000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const { icon, classes } = variantConfig[variant];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={[
        'flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg',
        'transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        classes,
      ].join(' ')}
    >
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs"
        aria-hidden="true"
      >
        {icon}
      </span>
      {message}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Toast container & hook                                               */
/* ------------------------------------------------------------------ */

interface ToastItem extends ToastProps {
  id: string;
}

let _setToasts: React.Dispatch<React.SetStateAction<ToastItem[]>> | null = null;

export function showToast(
  message: string,
  variant: ToastVariant = 'info',
  duration = 3000,
) {
  const id = crypto.randomUUID();
  _setToasts?.((prev) => [...prev, { id, message, variant, duration }]);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    _setToasts = setToasts;
    return () => {
      _setToasts = null;
    };
  }, []);

  const remove = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <div
      aria-label="Уведомления"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => remove(toast.id)} />
      ))}
    </div>
  );
}
