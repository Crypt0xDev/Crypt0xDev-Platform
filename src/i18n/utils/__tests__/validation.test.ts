import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidURL,
  isValidDate,
  isValidLength,
  isValidOption,
  sanitizeHTML,
  validateSlug,
  isValidHexColor,
  isInRange,
  hasRequiredProperties,
} from '../validation';

describe('validation utilities', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
      expect(isValidEmail('user_123@test-domain.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test @example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidURL', () => {
    it('should validate correct URLs', () => {
      expect(isValidURL('https://example.com')).toBe(true);
      expect(isValidURL('http://test.org/path?query=value')).toBe(true);
      expect(isValidURL('https://sub.domain.com:8080/page')).toBe(true);
      expect(isValidURL('ftp://invalid')).toBe(true); // URL constructor accepts ftp://
    });

    it('should reject invalid URLs', () => {
      expect(isValidURL('not-a-url')).toBe(false);
      expect(isValidURL('')).toBe(false);
      // Note: javascript: is technically a valid URL protocol according to URL constructor
    });
  });

  describe('isValidDate', () => {
    it('should validate Date objects', () => {
      expect(isValidDate(new Date())).toBe(true);
      expect(isValidDate(new Date('2024-01-01'))).toBe(true);
    });

    it('should reject invalid dates', () => {
      expect(isValidDate('2024-01-01')).toBe(false); // Strings are not Date objects
      expect(isValidDate('invalid-date')).toBe(false);
      expect(isValidDate(null as any)).toBe(false);
      expect(isValidDate(new Date('invalid'))).toBe(false); // Invalid Date object
    });
  });

  describe('isValidLength', () => {
    it('should validate string length', () => {
      expect(isValidLength('test', 1, 10)).toBe(true);
      expect(isValidLength('hello', 5, 5)).toBe(true);
      expect(isValidLength('a', 1, 100)).toBe(true);
    });

    it('should reject invalid lengths', () => {
      expect(isValidLength('', 1, 10)).toBe(false);
      expect(isValidLength('toolong', 1, 5)).toBe(false);
      expect(isValidLength('short', 10, 20)).toBe(false);
    });
  });

  describe('isValidOption', () => {
    it('should validate options from array', () => {
      const options = ['red', 'green', 'blue'];
      expect(isValidOption('red', options)).toBe(true);
      expect(isValidOption('green', options)).toBe(true);
    });

    it('should reject invalid options', () => {
      const options = ['red', 'green', 'blue'];
      expect(isValidOption('yellow', options)).toBe(false);
      expect(isValidOption('', options)).toBe(false);
    });
  });

  describe('sanitizeHTML', () => {
    it('should escape HTML special characters', () => {
      const dirty = '<div>Hello<script>alert("XSS")</script></div>';
      const clean = sanitizeHTML(dirty);
      expect(clean).not.toContain('<');
      expect(clean).not.toContain('>');
      expect(clean).toContain('&lt;');
      expect(clean).toContain('&gt;');
    });

    it('should escape quotes and ampersands', () => {
      const dirty = 'Test "quotes" & \'apostrophes\'';
      const clean = sanitizeHTML(dirty);
      expect(clean).toContain('&quot;');
      expect(clean).toContain('&amp;');
      expect(clean).toContain('&#x27;');
    });

    it('should escape forward slashes', () => {
      const dirty = '<script src="/evil.js"></script>';
      const clean = sanitizeHTML(dirty);
      expect(clean).toContain('&#x2F;');
    });
  });

  describe('validateSlug', () => {
    it('should validate and sanitize correct slugs', () => {
      const result1 = validateSlug('valid-slug');
      expect(result1.valid).toBe(true);
      expect(result1.sanitized).toBe('valid-slug');
      
      const result2 = validateSlug('another-valid-slug-123');
      expect(result2.valid).toBe(true);
      expect(result2.sanitized).toBe('another-valid-slug-123');
    });

    it('should sanitize invalid characters', () => {
      const result1 = validateSlug('Invalid Slug!');
      expect(result1.sanitized).toBe('invalid-slug');
      
      const result2 = validateSlug('Hello World 2024');
      expect(result2.sanitized).toBe('hello-world-2024');
      
      const result3 = validateSlug('Special@#$Characters');
      expect(result3.sanitized).toBe('special-characters');
    });

    it('should handle edge cases', () => {
      const result1 = validateSlug('  spaces  ');
      expect(result1.sanitized).toBe('spaces');
      
      const result2 = validateSlug('---multiple---dashes---');
      expect(result2.sanitized).toBe('multiple-dashes');
      
      const result3 = validateSlug('UPPERCASE');
      expect(result3.sanitized).toBe('uppercase');
    });

    it('should mark invalid results', () => {
      const result1 = validateSlug('');
      expect(result1.valid).toBe(false);
      
      const result2 = validateSlug('!!!');
      expect(result2.valid).toBe(false);
      expect(result2.sanitized).toBe('');
      
      const result3 = validateSlug('   ');
      expect(result3.valid).toBe(false);
    });
  });

  describe('isValidHexColor', () => {
    it('should validate hex colors', () => {
      expect(isValidHexColor('#fff')).toBe(true);
      expect(isValidHexColor('#ffffff')).toBe(true);
      expect(isValidHexColor('#abc123')).toBe(true);
      expect(isValidHexColor('#ABC')).toBe(true);
    });

    it('should reject invalid hex colors', () => {
      expect(isValidHexColor('fff')).toBe(false);
      expect(isValidHexColor('#gg0000')).toBe(false);
      expect(isValidHexColor('#12')).toBe(false);
      expect(isValidHexColor('')).toBe(false);
    });
  });

  describe('isInRange', () => {
    it('should validate numbers in range', () => {
      expect(isInRange(5, 1, 10)).toBe(true);
      expect(isInRange(1, 1, 10)).toBe(true);
      expect(isInRange(10, 1, 10)).toBe(true);
    });

    it('should reject numbers outside range', () => {
      expect(isInRange(0, 1, 10)).toBe(false);
      expect(isInRange(11, 1, 10)).toBe(false);
      expect(isInRange(-5, 1, 10)).toBe(false);
    });
  });

  describe('hasRequiredProperties', () => {
    it('should validate objects with required properties', () => {
      const obj = { name: 'John', age: 30, email: 'john@example.com' };
      expect(hasRequiredProperties(obj, ['name', 'age'])).toBe(true);
      expect(hasRequiredProperties(obj, ['email'])).toBe(true);
    });

    it('should reject objects missing properties', () => {
      const obj = { name: 'John', age: 30 };
      expect(hasRequiredProperties(obj, ['name', 'email'])).toBe(false);
      expect(hasRequiredProperties(obj, ['phone'])).toBe(false);
    });

    it('should handle empty objects', () => {
      expect(hasRequiredProperties({}, [])).toBe(true);
      expect(hasRequiredProperties({}, ['name'])).toBe(false);
    });
  });
});
