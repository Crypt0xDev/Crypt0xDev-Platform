/**
 * Tipos para internacionalización
 */

/**
 * Idiomas soportados
 */
export type Language = 'es' | 'en';

/**
 * Estructura de traducciones
 */
export interface Translation {
  nav: {
    home: string;
    blog: string;
    writeups: string;
    ctf: string;
    about: string;
    search: string;
  };
  common: {
    readMore: string;
    backTo: string;
    publishedOn: string;
    updatedOn: string;
    timeToRead: string;
    minutes: string;
    tags: string;
    relatedPosts: string;
    noResults: string;
    loading: string;
  };
  [key: string]: any;
}

/**
 * Rutas localizadas
 */
export interface LocalizedRoutes {
  [key: string]: {
    es: string;
    en: string;
  };
}
