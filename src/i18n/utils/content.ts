/**
 * Utilidades para manejo de contenido (posts, writeups, etc.)
 */

/**
 * Agrupa items por una propiedad
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (result, item) => {
      const group = String(item[key]);
      if (!result[group]) {
        result[group] = [];
      }
      result[group].push(item);
      return result;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Ordena posts por fecha (más reciente primero)
 */
export function sortByDate<T extends { data: any }>(posts: T[]): T[] {
  return posts.sort((a, b) => {
    const dateA = a.data.pubDate?.valueOf() || 0;
    const dateB = b.data.pubDate?.valueOf() || 0;
    return dateB - dateA;
  });
}

/**
 * Filtra posts por idioma
 * Soporta tanto 'lang' como 'language' para compatibilidad
 */
export function filterByLang<T extends { data: any }>(
  posts: T[],
  lang: string
): T[] {
  return posts.filter((post) => {
    // Soportar tanto 'language' (nuevo) como 'lang' (antiguo)
    const postLang = post.data.language || post.data.lang;
    return postLang === lang;
  });
}

/**
 * Obtiene entradas únicas por id (para evitar duplicados entre idiomas)
 */
export function getUniqueBySlug<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const id = item.id;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}
