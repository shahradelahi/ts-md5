import jsMd5 from './md5';
import type { Md5, Message, Options } from './typings';

/**
 * Calculates the MD5 hash of a message using a pure JavaScript implementation.
 *
 * @param message The message to hash.
 * @param options Encoding options.
 * @returns The MD5 hash as a Uint8Array.
 */
export const md5: Md5 = (message: Message, options?: Options) => {
  if (message === undefined || message === null) {
    throw new Error(`Illegal argument ${message}`);
  }
  return jsMd5(message, options);
};

export default md5;
