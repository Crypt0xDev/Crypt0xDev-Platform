/**
 * Utilidades para manejo de fechas
 */

/**
 * Formatea una fecha en formato legible
 */
export function formatDate(date: Date, lang: string = 'es'): string {
  return new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Obtiene el tiempo de lectura estimado
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
