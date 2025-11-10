#!/usr/bin/env node

/**
 * Script para generar imágenes placeholder para writeups
 * Copia los logos de las plataformas como placeholders para writeups sin imágenes
 */

import { readdirSync, existsSync, mkdirSync, copyFileSync, statSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de rutas
const ROOT = join(__dirname, '..');
const WRITEUPS_CONTENT = join(ROOT, 'src', 'content', 'writeups');
const PLATFORMS_IMAGES = join(ROOT, 'public', 'images', 'platforms');
const WRITEUPS_IMAGES = join(ROOT, 'public', 'images', 'writeups');

// Mapeo de plataformas a sus logos
const PLATFORM_LOGOS = {
  hackthebox: 'htb.png',
  htb: 'htb.png',
  tryhackme: 'tryhackme.jpg',
  thm: 'tryhackme.jpg',
  hackmyvm: 'hackmyvm.png',
  hmvm: 'hackmyvm.png',
  vulnhub: 'vulnhub.png',
  vh: 'vulnhub.png',
};

/**
 * Extrae las rutas de imágenes del frontmatter de un writeup
 * @param {string} filePath - Ruta del archivo markdown
 * @returns {{logo: string|null, heroImage: string|null}}
 */
function extractImagePaths(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const logoMatch = content.match(/logo:\s*["']([^"']+)["']/);
    const heroMatch = content.match(/heroImage:\s*["']([^"']+)["']/);
    
    return {
      logo: logoMatch ? logoMatch[1] : null,
      heroImage: heroMatch ? heroMatch[1] : null
    };
  } catch (error) {
    return { logo: null, heroImage: null };
  }
}

/**
 * Obtiene todos los writeups del proyecto con sus imágenes
 * @returns {Array<{platform: string, slug: string, mdPath: string}>}
 */
function getAllWriteups() {
  const writeups = new Set();

  try {
    const languages = readdirSync(WRITEUPS_CONTENT);

    for (const lang of languages) {
      const langPath = join(WRITEUPS_CONTENT, lang);
      
      if (!statSync(langPath).isDirectory()) continue;

      const platforms = readdirSync(langPath);
      
      for (const platform of platforms) {
        const platformPath = join(langPath, platform);
        
        if (!statSync(platformPath).isDirectory()) continue;

        const files = readdirSync(platformPath).filter(file => file.endsWith('.md'));
        
        for (const file of files) {
          const slug = file.replace('.md', '');
          const mdPath = join(platformPath, file);
          // Usar Set para evitar duplicados
          writeups.add(JSON.stringify({ platform, slug, mdPath }));
        }
      }
    }
  } catch (error) {
    console.error('❌ Error al leer writeups:', error.message);
    process.exit(1);
  }

  return Array.from(writeups).map(item => JSON.parse(item));
}

/**
 * Crea una imagen placeholder si no existe
 * @param {string} sourcePath - Ruta de origen
 * @param {string} destPath - Ruta de destino
 * @returns {boolean} - true si se creó la imagen
 */
function createImageIfNotExists(sourcePath, destPath) {
  if (existsSync(destPath)) return false;
  
  try {
    copyFileSync(sourcePath, destPath);
    return true;
  } catch (error) {
    console.error(`❌ Error al copiar ${destPath}:`, error.message);
    return false;
  }
}

/**
 * Genera imágenes placeholder para todos los writeups
 */
function createPlaceholderImages() {
  const writeups = getAllWriteups();
  const stats = { created: 0, skipped: 0, errors: 0 };

  console.log(`🔍 Encontrados ${writeups.length} writeups únicos`);
  console.log('📝 Generando imágenes placeholder...\n');

  for (const { platform, slug, mdPath } of writeups) {
    const logoFilename = PLATFORM_LOGOS[platform.toLowerCase()];
    
    if (!logoFilename) {
      console.log(`⚠️  Plataforma no soportada: ${platform}`);
      stats.skipped++;
      continue;
    }

    const platformLogo = join(PLATFORMS_IMAGES, logoFilename);
    
    if (!existsSync(platformLogo)) {
      console.log(`⚠️  Logo no encontrado: ${logoFilename}`);
      stats.errors++;
      continue;
    }

    // Extraer rutas de imágenes del markdown
    const imagePaths = extractImagePaths(mdPath);
    const createdFiles = [];

    // Crear imagen para logo si está definida
    if (imagePaths.logo) {
      const logoPath = join(ROOT, 'public', imagePaths.logo);
      const logoDir = dirname(logoPath);
      
      if (!existsSync(logoDir)) {
        mkdirSync(logoDir, { recursive: true });
      }
      
      if (createImageIfNotExists(platformLogo, logoPath)) {
        createdFiles.push(`logo (${imagePaths.logo.split('/').pop()})`);
        stats.created++;
      }
    }

    // Crear imagen para heroImage si está definida
    if (imagePaths.heroImage) {
      const heroPath = join(ROOT, 'public', imagePaths.heroImage);
      const heroDir = dirname(heroPath);
      
      if (!existsSync(heroDir)) {
        mkdirSync(heroDir, { recursive: true });
      }
      
      if (createImageIfNotExists(platformLogo, heroPath)) {
        createdFiles.push(`heroImage (${imagePaths.heroImage.split('/').pop()})`);
        stats.created++;
      }
    }

    if (createdFiles.length > 0) {
      console.log(`✅ ${platform}/${slug}: ${createdFiles.join(', ')}`);
    }
  }

  console.log(`\n📊 Resumen:`);
  console.log(`   ✅ Imágenes creadas: ${stats.created}`);
  console.log(`   ⏭️  Omitidas (ya existían): ${stats.skipped}`);
  
  if (stats.errors > 0) {
    console.log(`   ❌ Errores: ${stats.errors}`);
  }
  
  console.log(`\n✨ Proceso completado exitosamente`);
}

// Ejecutar script
createPlaceholderImages();
