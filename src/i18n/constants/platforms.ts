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
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    logo: '/images/platforms/htb.png',
    categories: ['machines', 'fortresses', 'endgames', 'prolabs', 'challenges'],
    categoryIcons: {
      machines: '/images/platforms/htb/machines.png',
      fortresses: '/images/platforms/htb/fortresses.png',
      endgames: '/images/platforms/htb/endgames.png',
    },
    description:
      'Plataforma de pentesting con máquinas virtuales y laboratorios',
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
    icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>',
    logo: '/images/platforms/tryhackme.jpg',
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
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>',
    logo: '/images/platforms/vulnhub.png',
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
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8m-4-4v4"/></svg>',
    logo: '/images/platforms/hackmyvm.png',
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
    icon: '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    logo: '/images/platforms/portswigger.png',
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
