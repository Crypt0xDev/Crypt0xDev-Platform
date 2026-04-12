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
    icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
  },
  writeup: {
    id: 'writeup',
    label: {
      en: 'Writeup',
      es: 'Writeup',
    },
    icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
  },
  research: {
    id: 'research',
    label: {
      en: 'Research',
      es: 'Investigación',
    },
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/></svg>',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400',
  },
  tools: {
    id: 'tools',
    label: {
      en: 'Tools',
      es: 'Herramientas',
    },
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"/></svg>',
    color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400',
  },
  news: {
    id: 'news',
    label: {
      en: 'News',
      es: 'Noticias',
    },
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"/></svg>',
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
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></svg>',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
  },
  pwn: {
    id: 'pwn',
    label: {
      en: 'Pwn',
      es: 'Pwn',
    },
    icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
  },
  crypto: {
    id: 'crypto',
    label: {
      en: 'Crypto',
      es: 'Criptografía',
    },
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400',
  },
  forensics: {
    id: 'forensics',
    label: {
      en: 'Forensics',
      es: 'Forense',
    },
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
  },
  reversing: {
    id: 'reversing',
    label: {
      en: 'Reverse Engineering',
      es: 'Ingeniería Inversa',
    },
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/></svg>',
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
  },
  misc: {
    id: 'misc',
    label: {
      en: 'Misc',
      es: 'Misceláneo',
    },
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3"/><circle cx="8" cy="8" r="1.5"/><circle cx="16" cy="8" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="8" cy="16" r="1.5"/><circle cx="16" cy="16" r="1.5"/></svg>',
    color: 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400',
  },
  osint: {
    id: 'osint',
    label: {
      en: 'OSINT',
      es: 'OSINT',
    },
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>',
    color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400',
  },
  stego: {
    id: 'stego',
    label: {
      en: 'Steganography',
      es: 'Esteganografía',
    },
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/></svg>',
    color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-400',
  },
} as const;

export const OPERATING_SYSTEMS = {
  linux: {
    id: 'linux',
    label: 'Linux',
    icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8 2 5 5 5 9c0 2 .8 3.8 2 5.1V20h10v-5.9c1.2-1.3 2-3.1 2-5.1 0-4-3-7-7-7zm-1 11H9v-2h2v2zm4 0h-2v-2h2v2z"/></svg>',
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
  },
  windows: {
    id: 'windows',
    label: 'Windows',
    icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
  },
  other: {
    id: 'other',
    label: {
      en: 'Other',
      es: 'Otro',
    },
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8m-4-4v4"/></svg>',
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
