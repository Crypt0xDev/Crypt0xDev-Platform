/**
 * Barrel file - Re-exporta todas las constantes
 */

export * from './platforms';
export * from './difficulty';
export * from './categories';
export * from './resources';
// CTF categories exportadas explícitamente para evitar conflictos
export {
  type CTFCategory as DynamicCTFCategory,
  CTF_CATEGORIES as DYNAMIC_CTF_CATEGORIES,
  getCTFCategoryById,
  getCTFCategoryName,
  getCTFCategoryDescription,
  isValidCTFCategory,
  getAllCTFCategoryIds
} from './ctf';
