/**
 * Barrel file - Re-exporta todas las utilidades
 */

// Date utilities
export { formatDate, getReadingTime } from './date';

// String utilities
export { capitalize, slugify, truncate } from './string';

// Content utilities
export { groupBy, sortByDate, filterByLang, getUniqueBySlug } from './content';

// SEO utilities
export {
  generateMetaTags,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateSEOTitle,
  extractExcerpt,
  generateSlug,
} from './seo';

// Validation utilities
export {
  isValidEmail,
  isValidURL,
  isValidDate,
  isValidLength,
  isValidOption,
  sanitizeHTML,
  validateSlug,
  isValidHexColor,
  isInRange,
  hasRequiredProperties,
} from './validation';
