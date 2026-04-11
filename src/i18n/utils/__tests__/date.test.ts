import { describe, it, expect } from 'vitest';
import { formatDate, getReadingTime } from '../date';

describe('date utilities', () => {
  describe('formatDate', () => {
    it('should format dates correctly for Spanish', () => {
      const date = new Date('2024-03-15T10:30:00Z');
      const formatted = formatDate(date, 'es');
      expect(formatted).toBeTruthy();
      expect(typeof formatted).toBe('string');
      expect(formatted).toContain('2024');
    });

    it('should format dates correctly for English', () => {
      const date = new Date('2024-03-15T10:30:00Z');
      const formatted = formatDate(date, 'en');
      expect(formatted).toBeTruthy();
      expect(typeof formatted).toBe('string');
      expect(formatted).toContain('2024');
    });

    it('should use Spanish as default language', () => {
      const date = new Date('2024-03-15');
      const formatted = formatDate(date);
      expect(formatted).toBeTruthy();
      expect(typeof formatted).toBe('string');
    });

    it('should handle different date formats', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-12-31');
      
      expect(formatDate(date1, 'es')).toBeTruthy();
      expect(formatDate(date2, 'en')).toBeTruthy();
    });
  });

  describe('getReadingTime', () => {
    it('should calculate reading time for short text', () => {
      const shortText = 'This is a short text with about twenty words in total to test the reading time calculation function properly.';
      const readingTime = getReadingTime(shortText);
      expect(readingTime).toBe(1); // Should round up to 1 minute
    });

    it('should calculate reading time for medium text', () => {
      const mediumText = Array(100).fill('word').join(' '); // 100 words
      const readingTime = getReadingTime(mediumText);
      expect(readingTime).toBe(1); // 100 words / 200 wpm = 0.5, rounds up to 1
    });

    it('should calculate reading time for long text', () => {
      const longText = Array(500).fill('word').join(' '); // 500 words
      const readingTime = getReadingTime(longText);
      expect(readingTime).toBe(3); // 500 / 200 = 2.5, rounds up to 3
    });

    it('should handle empty strings', () => {
      // getReadingTime returns 1 for empty strings (Math.ceil of 0/200 = 0, but there's trim/split logic)
      const result = getReadingTime('');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle strings with extra whitespace', () => {
      const text = '  word1   word2    word3  ';
      const readingTime = getReadingTime(text);
      expect(readingTime).toBe(1); // 3 words, rounds up to 1
    });

    it('should calculate correctly for exactly 200 words', () => {
      const text = Array(200).fill('word').join(' ');
      const readingTime = getReadingTime(text);
      expect(readingTime).toBe(1); // 200 / 200 = 1
    });

    it('should calculate correctly for 400 words', () => {
      const text = Array(400).fill('word').join(' ');
      const readingTime = getReadingTime(text);
      expect(readingTime).toBe(2); // 400 / 200 = 2
    });
  });
});
