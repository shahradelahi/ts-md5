import { describe, expect, it } from 'vitest';

import md5 from './md5';

describe('md5', () => {
  it('should return the expected MD5 hash for "message" as Uint8Array', () => {
    const expected = new Uint8Array([
      120, 231, 49, 2, 125, 143, 213, 14, 214, 66, 52, 11, 124, 154, 99, 179,
    ]);
    expect(md5('message')).toEqual(expected);
  });

  it('should throw an error for an undefined value', () => {
    // @ts-expect-error Testing invalid input
    expect(() => md5(undefined)).toThrow('Illegal argument undefined');
  });

  it('should throw an error for null', () => {
    // @ts-expect-error Testing invalid input
    expect(() => md5(null)).toThrow('Illegal argument null');
  });

  it('should allow the hashing of the string "undefined"', () => {
    const expected = new Uint8Array([
      94, 84, 50, 86, 196, 128, 172, 87, 125, 48, 247, 111, 145, 32, 235, 116,
    ]);
    expect(md5('undefined')).toEqual(expected);
  });

  it('should not return the same hash for random numbers twice', () => {
    const msg1 = Math.floor(Math.random() * 100_000 + 1) + new Date().getTime();
    const msg2 = Math.floor(Math.random() * 100_000 + 1) + new Date().getTime();

    if (msg1 !== msg2) {
      expect(md5(String(msg1))).not.toEqual(md5(String(msg2)));
    } else {
      expect(md5(String(msg1))).toEqual(md5(String(msg2)));
    }
  });

  it('should support Uint8Array', () => {
    const message = 'foobarbaz';
    const u8arr = new TextEncoder().encode(message);
    const u8aHash = md5(u8arr);
    expect(u8aHash).toEqual(md5(message));
  });

  it('should support ArrayBuffer', () => {
    const message = 'foobarbaz';
    const buffer = new TextEncoder().encode(message).buffer;
    const bufferHash = md5(buffer);
    expect(bufferHash).toEqual(md5(message));
  });

  it('should support number arrays', () => {
    const message = 'foobarbaz';
    const arr = Array.from(new TextEncoder().encode(message));
    const arrHash = md5(arr);
    expect(arrHash).toEqual(md5(message));
  });
});
