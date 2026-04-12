/**
 * Configuración centralizada de categorías CTF
 * Single source of truth para todas las categorías de CTF
 */

export interface CTFCategory {
  id: 'web' | 'pwn' | 'crypto' | 'reversing' | 'forensics' | 'osint' | 'misc';
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

export const CTF_CATEGORIES: CTFCategory[] = [
  {
    id: 'web',
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></svg>',
    gradient: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    borderColor: 'border-green-200 dark:border-green-900',
    textColor: 'text-green-700 dark:text-green-300',
    name: {
      es: 'Web Exploitation',
      en: 'Web Exploitation'
    },
    description: {
      es: 'Vulnerabilidades web, inyecciones SQL, XSS, CSRF y más',
      en: 'Web vulnerabilities, SQL injection, XSS, CSRF and more'
    }
  },
  {
    id: 'pwn',
    icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    gradient: 'from-red-500 to-pink-600',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
    borderColor: 'border-red-200 dark:border-red-900',
    textColor: 'text-red-700 dark:text-red-300',
    name: {
      es: 'Binary Exploitation',
      en: 'Binary Exploitation'
    },
    description: {
      es: 'Buffer overflow, ROP chains, explotación de binarios',
      en: 'Buffer overflow, ROP chains, binary exploitation'
    }
  },
  {
    id: 'crypto',
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>',
    gradient: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    borderColor: 'border-purple-200 dark:border-purple-900',
    textColor: 'text-purple-700 dark:text-purple-300',
    name: {
      es: 'Criptografía',
      en: 'Cryptography'
    },
    description: {
      es: 'Cifrados, hashes, RSA, AES y criptoanálisis',
      en: 'Ciphers, hashes, RSA, AES and cryptanalysis'
    }
  },
  {
    id: 'reversing',
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/></svg>',
    gradient: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    borderColor: 'border-blue-200 dark:border-blue-900',
    textColor: 'text-blue-700 dark:text-blue-300',
    name: {
      es: 'Ingeniería Inversa',
      en: 'Reverse Engineering'
    },
    description: {
      es: 'Análisis de binarios, decompilación, patching',
      en: 'Binary analysis, decompilation, patching'
    }
  },
  {
    id: 'forensics',
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>',
    gradient: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    borderColor: 'border-amber-200 dark:border-amber-900',
    textColor: 'text-amber-700 dark:text-amber-300',
    name: {
      es: 'Forense Digital',
      en: 'Digital Forensics'
    },
    description: {
      es: 'Análisis de memoria, discos, recuperación de datos',
      en: 'Memory analysis, disk analysis, data recovery'
    }
  },
  {
    id: 'osint',
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>',
    gradient: 'from-teal-500 to-cyan-600',
    bgColor: 'bg-teal-50 dark:bg-teal-950/20',
    borderColor: 'border-teal-200 dark:border-teal-900',
    textColor: 'text-teal-700 dark:text-teal-300',
    name: {
      es: 'OSINT',
      en: 'OSINT'
    },
    description: {
      es: 'Inteligencia de fuentes abiertas, investigación online',
      en: 'Open Source Intelligence, online investigation'
    }
  },
  {
    id: 'misc',
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401v0c.333 0 .599-.277.58-.61a48.153 48.153 0 0 0-.63-5.427 48.159 48.159 0 0 0-4.716-.582.532.532 0 0 0-.571.533v0Z"/></svg>',
    gradient: 'from-gray-500 to-slate-600',
    bgColor: 'bg-gray-50 dark:bg-gray-950/20',
    borderColor: 'border-gray-200 dark:border-gray-900',
    textColor: 'text-gray-700 dark:text-gray-300',
    name: {
      es: 'Misceláneos',
      en: 'Miscellaneous'
    },
    description: {
      es: 'Retos variados que no encajan en otras categorías',
      en: 'Various challenges that don\'t fit other categories'
    }
  }
];

/**
 * Helpers para trabajar con categorías CTF
 */

export function getCTFCategoryById(id: string): CTFCategory | undefined {
  return CTF_CATEGORIES.find(cat => cat.id === id);
}

export function getCTFCategoryName(id: string, lang: 'es' | 'en'): string {
  const category = getCTFCategoryById(id);
  return category?.name[lang] || id;
}

export function getCTFCategoryDescription(id: string, lang: 'es' | 'en'): string {
  const category = getCTFCategoryById(id);
  return category?.description[lang] || '';
}

export function isValidCTFCategory(id: string): boolean {
  return CTF_CATEGORIES.some(cat => cat.id === id);
}

export function getAllCTFCategoryIds(): string[] {
  return CTF_CATEGORIES.map(cat => cat.id);
}
