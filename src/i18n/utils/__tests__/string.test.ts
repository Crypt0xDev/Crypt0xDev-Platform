import { describe, it, expect } from 'vitest';
import { slugify, truncate, capitalize } from '../string';

describe('string utilities', () => {
  describe('slugify', () => {
    it('should convert strings to slugs', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('My Blog Post')).toBe('my-blog-post');
    });

    it('should handle special characters', () => {
      expect(slugify('Hello@World!')).toBe('helloworld');
      expect(slugify('Test#123$456')).toBe('test123456');
    });

    it('should handle accented characters', () => {
      expect(slugify('Configuración')).toBe('configuracion');
      expect(slugify('Ñoño Español')).toBe('nono-espanol');
    });

    it('should handle multiple spaces and dashes', () => {
      expect(slugify('Multiple   Spaces')).toBe('multiple-spaces');
      expect(slugify('dash---dash')).toBe('dash-dash');
    });

    it('should handle uppercase', () => {
      expect(slugify('UPPERCASE TEXT')).toBe('uppercase-text');
      expect(slugify('MixedCase Text')).toBe('mixedcase-text');
    });

    it('should handle edge cases', () => {
      expect(slugify('   spaces   ')).toBe('spaces');
      expect(slugify('---dashes---')).toBe('dashes');
    });
  });

  describe('truncate', () => {
    it('should truncate long strings with default length', () => {
      const longText = 'This is a very long text that needs to be truncated because it exceeds the maximum length allowed by the truncate function which defaults to 150 characters in total length to test this properly';
      const result = truncate(longText);
      expect(result.length).toBeLessThanOrEqual(153); // 150 + '...'
      expect(result).toContain('...');
    });

    it('should truncate with custom length', () => {
      const text = 'This is a text that will be truncated';
      const result = truncate(text, 20);
      expect(result.length).toBeLessThanOrEqual(23); // 20 + '...'
      expect(result).toContain('...');
    });

    it('should not truncate short strings', () => {
      const shortText = 'Short';
      expect(truncate(shortText, 20)).toBe('Short');
      expect(truncate(shortText)).toBe('Short');
    });

    it('should handle exact length', () => {
      const text = '12345';
      expect(truncate(text, 5)).toBe('12345');
      expect(truncate(text, 4)).toContain('...');
    });

    it('should handle empty strings', () => {
      expect(truncate('', 10)).toBe('');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    it('should handle already capitalized strings', () => {
      expect(capitalize('Hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('WORLD');
    });

    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single characters', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('Z')).toBe('Z');
    });

    it('should preserve rest of string', () => {
      expect(capitalize('hELLO')).toBe('HELLO');
      expect(capitalize('mIxEd CaSe')).toBe('MIxEd CaSe');
    });
  });
});
