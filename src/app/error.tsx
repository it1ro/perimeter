'use client';

import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Можно добавить логирование в будущем
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium text-text-muted">Что-то пошло не так</p>
      <h1 className="font-display mt-3 text-3xl font-semibold text-text sm:text-4xl">
        Непредвиденная ошибка
      </h1>
      <p className="mt-3 max-w-md text-sm text-text-muted">
        Мы уже работаем над тем, чтобы это не повторилось. Попробуйте перезагрузить страницу.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center rounded-full bg-sage px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sage/90"
        >
          Попробовать снова
        </button>
        <button
          type="button"
          onClick={() => window.location.assign('/')}
          className="inline-flex items-center rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-text transition hover:border-white/30 hover:bg-white/5"
        >
          На главную
        </button>
      </div>
    </main>
  );
}

