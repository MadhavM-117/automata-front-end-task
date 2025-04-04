import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getComputerChoice } from './evilComputer';
import { TurnOption } from '../models';

describe('evilComputer', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random');
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  describe('getComputerChoice', () => {
    it('should return a valid turn option', () => {
      const validOptions: TurnOption[] = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
      const result = getComputerChoice();
      
      expect(validOptions).toContain(result);
    });

    it('should produce random choices with fair distribution', () => {
      const options: TurnOption[] = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
      
      for (let i = 0; i < options.length; i++) {
        vi.mocked(Math.random).mockReturnValue(i / options.length);
        const result = getComputerChoice();
        expect(result).toBe(options[i]);
      }
    });

    it('should handle edge cases of Math.random', () => {
      // Test for Math.random() = 0 (first element)
      vi.mocked(Math.random).mockReturnValue(0);
      expect(getComputerChoice()).toBe('rock');
      
      // Test for Math.random() = 0.999... (last element)
      vi.mocked(Math.random).mockReturnValue(0.9999999);
      expect(getComputerChoice()).toBe('spock');
    });
  });
});