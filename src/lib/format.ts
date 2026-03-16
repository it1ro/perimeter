export function formatDate(dateStr: string, style: 'short' | 'long' = 'long'): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: style === 'short' ? 'short' : 'long',
    ...(style === 'long' && { year: 'numeric' }),
  });
}
