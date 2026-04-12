// ============================================================================
// RESOURCE CATEGORIES CONFIGURATION
// Configuración centralizada de categorías de recursos
// ============================================================================

export interface ResourceCategory {
  id: string;
  icon: string;
  gradient: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  name: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
}

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: 'tools',
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"/></svg>',
    gradient: 'from-blue-400 to-cyan-600',
    bgColor: 'bg-blue-50/50 dark:bg-blue-950/10',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-600 dark:text-blue-400',
    name: {
      es: 'Herramientas',
      en: 'Tools'
    },
    description: {
      es: 'Herramientas esenciales para pentesting y hacking ético',
      en: 'Essential tools for pentesting and ethical hacking'
    }
  },
  {
    id: 'cheatsheets',
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"/></svg>',
    gradient: 'from-emerald-400 to-green-600',
    bgColor: 'bg-emerald-50/50 dark:bg-emerald-950/10',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    name: {
      es: 'Cheatsheets',
      en: 'Cheatsheets'
    },
    description: {
      es: 'Guías rápidas y hojas de referencia para comandos y técnicas',
      en: 'Quick guides and reference sheets for commands and techniques'
    }
  },
  {
    id: 'labs',
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/></svg>',
    gradient: 'from-purple-400 to-violet-600',
    bgColor: 'bg-purple-50/50 dark:bg-purple-950/10',
    borderColor: 'border-purple-200 dark:border-purple-800',
    textColor: 'text-purple-600 dark:text-purple-400',
    name: {
      es: 'Labs',
      en: 'Labs'
    },
    description: {
      es: 'Laboratorios y entornos de práctica para aprender hacking',
      en: 'Labs and practice environments to learn hacking'
    }
  },
  {
    id: 'videos',
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>',
    gradient: 'from-red-400 to-rose-600',
    bgColor: 'bg-red-50/50 dark:bg-red-950/10',
    borderColor: 'border-red-200 dark:border-red-800',
    textColor: 'text-red-600 dark:text-red-400',
    name: {
      es: 'Videos',
      en: 'Videos'
    },
    description: {
      es: 'Tutoriales en video y conferencias sobre ciberseguridad',
      en: 'Video tutorials and cybersecurity conferences'
    }
  },
  {
    id: 'challenges',
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0M9.75 9H6A2.25 2.25 0 0 0 3.75 11.25v6A2.25 2.25 0 0 0 6 19.5h12a2.25 2.25 0 0 0 2.25-2.25v-6A2.25 2.25 0 0 0 18 9h-3.75M12 9v3m0 0v3m0-3h3m-3 0H9"/></svg>',
    gradient: 'from-orange-400 to-amber-600',
    bgColor: 'bg-orange-50/50 dark:bg-orange-950/10',
    borderColor: 'border-orange-200 dark:border-orange-800',
    textColor: 'text-orange-600 dark:text-orange-400',
    name: {
      es: 'Retos',
      en: 'Challenges'
    },
    description: {
      es: 'Plataformas de retos y desafíos para practicar habilidades',
      en: 'Challenge platforms to practice your skills'
    }
  },
  {
    id: 'projects',
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/></svg>',
    gradient: 'from-cyan-400 to-sky-600',
    bgColor: 'bg-cyan-50/50 dark:bg-cyan-950/10',
    borderColor: 'border-cyan-200 dark:border-cyan-800',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    name: {
      es: 'Proyectos',
      en: 'Projects'
    },
    description: {
      es: 'Proyectos de código abierto y recursos de desarrollo',
      en: 'Open-source projects and development resources'
    }
  },
  {
    id: 'vulnerabilities',
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>',
    gradient: 'from-rose-400 to-pink-600',
    bgColor: 'bg-rose-50/50 dark:bg-rose-950/10',
    borderColor: 'border-rose-200 dark:border-rose-800',
    textColor: 'text-rose-600 dark:text-rose-400',
    name: {
      es: 'Vulnerabilidades',
      en: 'Vulnerabilities'
    },
    description: {
      es: 'Bases de datos de vulnerabilidades y CVEs',
      en: 'Vulnerability databases and CVEs'
    }
  }
];

/**
 * Obtiene una categoría por su ID
 */
export function getCategoryById(id: string): ResourceCategory | undefined {
  return RESOURCE_CATEGORIES.find(cat => cat.id === id);
}

/**
 * Obtiene el nombre de una categoría en el idioma especificado
 */
export function getCategoryName(id: string, lang: 'es' | 'en'): string {
  const category = getCategoryById(id);
  return category?.name[lang] || id;
}

/**
 * Obtiene la descripción de una categoría en el idioma especificado
 */
export function getCategoryDescription(id: string, lang: 'es' | 'en'): string {
  const category = getCategoryById(id);
  return category?.description[lang] || '';
}

/**
 * Verifica si un ID de categoría es válido
 */
export function isValidCategory(id: string): boolean {
  return RESOURCE_CATEGORIES.some(cat => cat.id === id);
}

/**
 * Obtiene todos los IDs de categorías
 */
export function getAllCategoryIds(): string[] {
  return RESOURCE_CATEGORIES.map(cat => cat.id);
}
