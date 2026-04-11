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
    icon: '🛠️',
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
    icon: '📋',
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
    icon: '🧪',
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
    icon: '🎥',
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
    icon: '🎮',
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
    icon: '🚀',
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
    icon: '🔓',
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
