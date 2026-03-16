'use client';

import { useState, type FormEvent } from 'react';
import { Send, Loader2, AlertTriangle } from 'lucide-react';
import { showToast } from '@/components/ui/Toast';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
  : '';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(name: string, email: string, message: string): FormErrors {
  const errors: FormErrors = {};
  if (!name.trim()) errors.name = 'Введите ваше имя';
  if (!email.trim()) errors.email = 'Введите email';
  else if (!EMAIL_RE.test(email)) errors.email = 'Некорректный формат email';
  if (!message.trim()) errors.message = 'Введите сообщение';
  else if (message.trim().length < MIN_MESSAGE_LENGTH)
    errors.message = `Минимум ${MIN_MESSAGE_LENGTH} символов`;
  return errors;
}

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<FormErrors>({});

  if (!FORMSPREE_URL) {
    return (
      <div className="rounded-2xl border border-terracotta/20 bg-terracotta/5 p-6 sm:p-8">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-terracotta/15">
          <AlertTriangle className="h-5 w-5 text-terracotta" strokeWidth={1.75} />
        </div>
        <h3 className="font-display mb-2 text-lg font-semibold text-text">
          Форма временно недоступна
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          Пожалуйста, свяжитесь с нами другим способом. Мы работаем над восстановлением формы.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(name, email, message);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setErrors({});
        showToast('Сообщение отправлено! Спасибо за обратную связь.', 'success');
      } else {
        throw new Error('Formspree error');
      }
    } catch {
      setStatus('error');
      showToast('Ошибка при отправке. Попробуйте позже.', 'error');
    }
  };

  const isSubmitting = status === 'submitting';

  const inputBase = [
    'w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-text placeholder:text-text-muted/60',
    'transition-colors duration-150',
    'focus:border-sage/50 focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-sage/20',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' ');

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Форма обратной связи" className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-text">
          Имя
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          placeholder="Как к вам обращаться"
          disabled={isSubmitting}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className={`${inputBase} ${errors.name ? 'border-terracotta/50' : 'border-white/10'}`}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1.5 text-xs text-terracotta" role="alert">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-text">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          placeholder="example@mail.com"
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className={`${inputBase} ${errors.email ? 'border-terracotta/50' : 'border-white/10'}`}
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-1.5 text-xs text-terracotta" role="alert">{errors.email}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-text">
          Сообщение
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          placeholder="Расскажите, что у вас на уме..."
          rows={5}
          disabled={isSubmitting}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`${inputBase} resize-y ${errors.message ? 'border-terracotta/50' : 'border-white/10'}`}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-terracotta" role="alert">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={[
          'inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium sm:w-auto',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'bg-sage text-white hover:bg-sage/90',
          'disabled:cursor-not-allowed disabled:bg-sage/40',
        ].join(' ')}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Отправка...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Отправить
          </>
        )}
      </button>

      {status === 'success' && (
        <p className="text-sm text-sage">
          Спасибо! Ваше сообщение успешно отправлено.
        </p>
      )}
    </form>
  );
}
