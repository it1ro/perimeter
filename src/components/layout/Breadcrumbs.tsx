import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Хлебные крошки"
      className={`flex flex-wrap items-center gap-1 text-sm text-text-muted ${className}`}
    >
      <Link href="/" className="transition-colors hover:text-text">
        Главная
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <span aria-hidden="true" className="text-white/20">
            /
          </span>
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-text">
              {item.label}
            </Link>
          ) : (
            <span className="text-text" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
