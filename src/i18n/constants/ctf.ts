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
    icon: '🌐',
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
    icon: '💥',
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
    icon: '🔐',
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
    icon: '🔄',
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
    icon: '🔍',
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
    icon: '🕵️',
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
    icon: '🎲',
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
