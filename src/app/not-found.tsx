import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium text-text-muted">Ошибка 404</p>
      <h1 className="font-display mt-3 text-3xl font-semibold text-text sm:text-4xl">
        Страница не найдена
      </h1>
      <p className="mt-3 max-w-md text-sm text-text-muted">
        Возможно, вы ошиблись в адресе или страница была перенесена. Попробуйте начать с главной.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-sage px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sage/90"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}

