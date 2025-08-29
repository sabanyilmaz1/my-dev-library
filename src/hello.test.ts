import { describe, it, expect } from 'vitest';

describe('Hello module', () => {
    it('should return hello world', () => {
        expect('hello world').toBe('hello world');
    });
});