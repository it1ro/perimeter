import type { Metadata } from 'next';
import { ContactForm } from '@/components/contacts/ContactForm';
import { Mail, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Свяжитесь с командой Периметра — задайте вопрос, предложите тему или поделитесь обратной связью.',
  openGraph: {
    title: 'Контакты | Периметр',
    description:
      'Свяжитесь с командой Периметра — задайте вопрос, предложите тему или поделитесь обратной связью.',
    images: [{ url: '/images/og/og-default.png', width: 1200, height: 630, alt: 'Периметр — Контакты' }],
  },
};

export default function ContactsPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-14">
          <h1 className="font-display mb-2 text-4xl font-bold text-text sm:text-5xl">
            Контакты
          </h1>
          <p className="text-base text-text-muted">
            Есть вопрос, предложение или обратная связь? Напишите нам
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto]">
          {/* Form */}
          <ContactForm />

          {/* Sidebar */}
          <aside className="space-y-6 lg:w-72">
            <div className="rounded-2xl border border-white/10 bg-background-soft p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sage/15">
                <Mail className="h-5 w-5 text-sage" strokeWidth={1.75} />
              </div>
              <h3 className="font-display mb-2 text-lg font-semibold text-text">
                Напишите нам
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                Используйте форму или напишите напрямую — мы стараемся отвечать в течение
                нескольких дней.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-background-soft p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue/15">
                <MessageCircle className="h-5 w-5 text-blue" strokeWidth={1.75} />
              </div>
              <h3 className="font-display mb-2 text-lg font-semibold text-text">
                Предложить тему
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                Хотите, чтобы мы написали о чём-то конкретном? Расскажите — мы всегда рады
                новым идеям.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
