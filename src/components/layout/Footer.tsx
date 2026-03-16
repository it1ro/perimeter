import Link from 'next/link';

const footerLinks = [
  {
    title: 'Контент',
    links: [
      { href: '/articles', label: 'Статьи' },
      { href: '/tests', label: 'Тесты' },
      { href: '/infographics', label: 'Инфографика' },
    ],
  },
  {
    title: 'Проект',
    links: [
      { href: '/about', label: 'О проекте' },
      { href: '/contacts', label: 'Контакты' },
      { href: '/privacy', label: 'Политика конфиденциальности' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-background-soft" role="contentinfo">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-lg font-bold text-text transition-colors hover:text-sage"
            >
              Периметр
            </Link>
            <p className="mt-2 text-sm text-text-muted">
              Психология ясно — без воды и жаргона.
            </p>
          </div>

          {/* Nav groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-text-muted">
          © {year} Периметр. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
