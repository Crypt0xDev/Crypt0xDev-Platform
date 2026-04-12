import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const GET: APIRoute = () => {
  const svg = readFileSync(join(process.cwd(), 'public', 'favicons', 'favicon.svg'));
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
};
