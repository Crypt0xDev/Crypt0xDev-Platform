/**
 * Tipos para plataformas de hacking
 */

import { PLATFORMS } from '../constants/platforms';
import { DIFFICULTIES } from '../constants/difficulty';
import { OPERATING_SYSTEMS } from '../constants/categories';

export type Platform = keyof typeof PLATFORMS;
export type Difficulty = keyof typeof DIFFICULTIES;
export type OS = keyof typeof OPERATING_SYSTEMS;

/**
 * Configuración de una plataforma
 */
export interface PlatformConfig {
  id: Platform;
  name: string;
  fullName: string;
  slug: string;
  url: string;
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  icon: string;
  categories: string[];
  description: string;
}

/**
 * Estadísticas de una plataforma
 */
export interface PlatformStats {
  platform: Platform;
  total: number;
  byDifficulty: {
    easy: number;
    medium: number;
    hard: number;
    insane: number;
  };
  byOS?: {
    linux: number;
    windows: number;
    other: number;
  };
}
