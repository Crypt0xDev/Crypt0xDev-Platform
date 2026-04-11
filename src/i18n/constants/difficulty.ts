/**
 * Configuración de niveles de dificultad
 * Centraliza colores, íconos y traducciones
 */

export const DIFFICULTIES = {
  easy: {
    id: 'easy',
    label: {
      en: 'Easy',
      es: 'Fácil',
    },
    color: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-800 dark:text-green-400',
      border: 'border-green-500',
      hex: '#10b981',
    },
    icon: '🟢',
    order: 1,
  },
  medium: {
    id: 'medium',
    label: {
      en: 'Medium',
      es: 'Medio',
    },
    color: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-800 dark:text-yellow-400',
      border: 'border-yellow-500',
      hex: '#f59e0b',
    },
    icon: '🟡',
    order: 2,
  },
  hard: {
    id: 'hard',
    label: {
      en: 'Hard',
      es: 'Difícil',
    },
    color: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-800 dark:text-red-400',
      border: 'border-red-500',
      hex: '#ef4444',
    },
    icon: '🔴',
    order: 3,
  },
  insane: {
    id: 'insane',
    label: {
      en: 'Insane',
      es: 'Insano',
    },
    color: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-800 dark:text-purple-400',
      border: 'border-purple-500',
      hex: '#a855f7',
    },
    icon: '🟣',
    order: 4,
  },
} as const;

export type DifficultyLevel = keyof typeof DIFFICULTIES;

/**
 * Obtiene la configuración de una dificultad
 */
export function getDifficulty(level: DifficultyLevel) {
  return DIFFICULTIES[level];
}

/**
 * Obtiene el label traducido de una dificultad
 */
export function getDifficultyLabel(level: DifficultyLevel, lang: 'es' | 'en' = 'es'): string {
  return DIFFICULTIES[level]?.label[lang] || level;
}

/**
 * Obtiene el color hex de una dificultad
 */
export function getDifficultyColor(level: DifficultyLevel): string {
  return DIFFICULTIES[level]?.color.hex || '#6b7280';
}

/**
 * Obtiene todas las dificultades ordenadas
 */
export function getAllDifficulties() {
  return Object.values(DIFFICULTIES).sort((a, b) => a.order - b.order);
}

/**
 * Obtiene clases CSS para badge de dificultad
 */
export function getDifficultyBadgeClasses(level: DifficultyLevel): string {
  const diff = DIFFICULTIES[level];
  if (!diff) return '';
  return `${diff.color.bg} ${diff.color.text}`;
}
