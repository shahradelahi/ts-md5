import jsMd5 from './md5';
import nativeMd5 from './native';
import type { Md5, Message, Options } from './typings';
import { isNode } from './utils';

const implementation: Md5 = isNode() ? nativeMd5 : jsMd5;

/**
 * Calculates the MD5 hash of a message.
 *
 * @param message The message to hash.
 * @param options Encoding options.
 * @returns The MD5 hash as a Uint8Array.
 *
 * @example
 * ```typescript
 * import { md5 } from '@se-oss/md5';
 *
 * // Hash a string
 * const hash = md5('message');
 * console.log(hash); // Uint8Array [120, 231, 49, 2, 125, 143, 213, 14, 214, 66, 52, 11, 124, 154, 99, 179]
 *
 * // Hash a Uint8Array
 * const uint8Array = new TextEncoder().encode('hello world');
 * const bufferHash = md5(uint8Array);
 * console.log(bufferHash); // Uint8Array [94, 182, 59, 187, 224, 30, 238, 208, 147, 203, 34, 187, 143, 90, 205, 195]
 * ```
 */
export const md5: Md5 = (message: Message, options?: Options) => {
  if (message === undefined || message === null) {
    throw new Error(`Illegal argument ${message}`);
  }
  return implementation(message, options);
};

export default md5;
