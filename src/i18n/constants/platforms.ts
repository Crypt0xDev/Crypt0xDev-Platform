/**
 * Configuración de plataformas de hacking
 * Centraliza toda la información de HTB, THM, VulnHub, HackMyVM
 */

export const PLATFORMS = {
  htb: {
    id: 'htb',
    name: 'HackTheBox',
    fullName: 'HackTheBox',
    slug: 'hackthebox',
    url: 'https://www.hackthebox.com',
    color: {
      primary: '#9FEF00',
      secondary: '#2563eb',
      gradient: 'from-blue-500 to-blue-700',
    },
    icon: '🎯',
    categories: ['machines', 'fortresses', 'endgames', 'prolabs', 'challenges'],
    description: 'Plataforma de pentesting con máquinas virtuales y laboratorios',
  },
  tryhackme: {
    id: 'tryhackme',
    name: 'TryHackMe',
    fullName: 'TryHackMe',
    slug: 'tryhackme',
    url: 'https://tryhackme.com',
    color: {
      primary: '#C51F5D',
      secondary: '#7c3aed',
      gradient: 'from-purple-500 to-purple-700',
    },
    icon: '🏴‍☠️',
    categories: ['rooms', 'paths', 'challenges'],
    description: 'Aprende ciberseguridad con salas interactivas y guiadas',
  },
  vulnhub: {
    id: 'vulnhub',
    name: 'VulnHub',
    fullName: 'VulnHub',
    slug: 'vulnhub',
    url: 'https://www.vulnhub.com',
    color: {
      primary: '#059669',
      secondary: '#047857',
      gradient: 'from-green-500 to-green-700',
    },
    icon: '🛡️',
    categories: ['machines'],
    description: 'Máquinas virtuales vulnerables para practicar pentesting',
  },
  hackmyvm: {
    id: 'hackmyvm',
    name: 'HackMyVM',
    fullName: 'HackMyVM',
    slug: 'hackmyvm',
    url: 'https://hackmyvm.eu',
    color: {
      primary: '#f97316',
      secondary: '#ea580c',
      gradient: 'from-orange-500 to-orange-700',
    },
    icon: '💻',
    categories: ['machines'],
    description: 'Plataforma española de máquinas virtuales vulnerables',
  },
  portswigger: {
    id: 'portswigger',
    name: 'PortSwigger',
    fullName: 'PortSwigger Web Security Academy',
    slug: 'portswigger',
    url: 'https://portswigger.net/web-security',
    color: {
      primary: '#ff6633',
      secondary: '#e65c2e',
      gradient: 'from-orange-600 to-red-600',
    },
    icon: '🔐',
    categories: ['labs'],
    description: 'Academia de seguridad web con labs interactivos',
  },
} as const;

export type PlatformId = keyof typeof PLATFORMS;

/**
 * Obtiene la configuración de una plataforma por su ID
 */
export function getPlatform(id: PlatformId) {
  return PLATFORMS[id];
}

/**
 * Obtiene todas las plataformas como array
 */
export function getAllPlatforms() {
  return Object.values(PLATFORMS);
}

/**
 * Obtiene el nombre completo de una plataforma
 */
export function getPlatformName(id: PlatformId): string {
  return PLATFORMS[id]?.name || id;
}

/**
 * Obtiene el color principal de una plataforma
 */
export function getPlatformColor(id: PlatformId): string {
  return PLATFORMS[id]?.color.primary || '#6b7280';
}

/**
 * Obtiene el slug URL de una plataforma
 */
export function getPlatformSlug(id: PlatformId): string {
  return PLATFORMS[id]?.slug || id;
}
