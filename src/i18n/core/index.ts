import en from '../translations/en.json';
import es from '../translations/es.json';

export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'es';

export const ui = {
  en,
  es,
} as const;

export type Language = keyof typeof ui;

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = ui[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
}

export function getLocalizedPath(path: string, lang: Language): string {
  // Si ya tiene el idioma en la ruta, reemplazarlo
  const pathWithoutLang = path.replace(/^\/(en|es)/, '');
  return `/${lang}${pathWithoutLang}`;
}

export function getAllLanguagesForSlug(slug: string, collection: 'blog' | 'writeups') {
  return Object.keys(ui).map(lang => ({
    lang,
    path: `/${lang}/${collection}/${slug}`,
  }));
}
