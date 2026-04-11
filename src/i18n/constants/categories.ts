/**
 * Configuración de categorías de contenido
 * Blog, Writeups, CTF, etc.
 */

export const BLOG_CATEGORIES = {
  tutorial: {
    id: 'tutorial',
    label: {
      en: 'Tutorial',
      es: 'Tutorial',
    },
    icon: '📚',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
  },
  writeup: {
    id: 'writeup',
    label: {
      en: 'Writeup',
      es: 'Writeup',
    },
    icon: '📝',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
  },
  research: {
    id: 'research',
    label: {
      en: 'Research',
      es: 'Investigación',
    },
    icon: '🔬',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400',
  },
  tools: {
    id: 'tools',
    label: {
      en: 'Tools',
      es: 'Herramientas',
    },
    icon: '🛠️',
    color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400',
  },
  news: {
    id: 'news',
    label: {
      en: 'News',
      es: 'Noticias',
    },
    icon: '📰',
    color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
  },
} as const;

export const CTF_CATEGORIES = {
  web: {
    id: 'web',
    label: {
      en: 'Web',
      es: 'Web',
    },
    icon: '🌐',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
  },
  pwn: {
    id: 'pwn',
    label: {
      en: 'Pwn',
      es: 'Pwn',
    },
    icon: '💥',
    color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
  },
  crypto: {
    id: 'crypto',
    label: {
      en: 'Crypto',
      es: 'Criptografía',
    },
    icon: '🔐',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400',
  },
  forensics: {
    id: 'forensics',
    label: {
      en: 'Forensics',
      es: 'Forense',
    },
    icon: '🔍',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
  },
  reversing: {
    id: 'reversing',
    label: {
      en: 'Reverse Engineering',
      es: 'Ingeniería Inversa',
    },
    icon: '⚙️',
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
  },
  misc: {
    id: 'misc',
    label: {
      en: 'Misc',
      es: 'Misceláneo',
    },
    icon: '🎲',
    color: 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400',
  },
  osint: {
    id: 'osint',
    label: {
      en: 'OSINT',
      es: 'OSINT',
    },
    icon: '🕵️',
    color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400',
  },
  stego: {
    id: 'stego',
    label: {
      en: 'Steganography',
      es: 'Esteganografía',
    },
    icon: '🖼️',
    color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-400',
  },
} as const;

export const OPERATING_SYSTEMS = {
  linux: {
    id: 'linux',
    label: 'Linux',
    icon: '🐧',
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
  },
  windows: {
    id: 'windows',
    label: 'Windows',
    icon: '🪟',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
  },
  other: {
    id: 'other',
    label: {
      en: 'Other',
      es: 'Otro',
    },
    icon: '💻',
    color: 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400',
  },
} as const;

export type BlogCategory = keyof typeof BLOG_CATEGORIES;
export type CTFCategory = keyof typeof CTF_CATEGORIES;
export type OperatingSystem = keyof typeof OPERATING_SYSTEMS;

/**
 * Obtiene la configuración de una categoría de blog
 */
export function getBlogCategory(id: BlogCategory) {
  return BLOG_CATEGORIES[id];
}

/**
 * Obtiene la configuración de una categoría de CTF
 */
export function getCTFCategory(id: CTFCategory) {
  return CTF_CATEGORIES[id];
}

/**
 * Obtiene la configuración de un sistema operativo
 */
export function getOS(id: OperatingSystem) {
  return OPERATING_SYSTEMS[id];
}
