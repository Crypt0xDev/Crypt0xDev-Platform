/**
 * Utilidades de validación
 */

/**
 * Valida si un email es válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida si una URL es válida
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Valida si una fecha es válida
 */
export function isValidDate(date: any): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Valida rango de longitud de string
 */
export function isValidLength(text: string, min: number, max: number): boolean {
  const length = text.trim().length;
  return length >= min && length <= max;
}

/**
 * Valida que un valor esté en un array de opciones
 */
export function isValidOption<T>(value: T, options: readonly T[]): boolean {
  return options.includes(value);
}

/**
 * Sanitiza input HTML para prevenir XSS
 */
export function sanitizeHTML(html: string): string {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Valida y sanitiza slug URL
 */
export function validateSlug(slug: string): { valid: boolean; sanitized: string } {
  const sanitized = slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');

  return {
    valid: sanitized.length > 0 && /^[a-z0-9-]+$/.test(sanitized),
    sanitized,
  };
}

/**
 * Valida formato de color hexadecimal
 */
export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Valida rango numérico
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Valida que un objeto tenga las propiedades requeridas
 */
export function hasRequiredProperties<T extends object>(
  obj: any,
  required: (keyof T)[]
): obj is T {
  return required.every((prop) => prop in obj && obj[prop] !== undefined);
}
