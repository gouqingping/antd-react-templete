import { describe, it, expect } from 'vitest';
import { testFun } from '../src/utils';

describe('testFun', () => {
  it('should execute the function', () => {
    expect(testFun(5, 6)).toEqual(11);
  });
});
