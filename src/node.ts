import nativeMd5 from './native';
import type { Md5, Message, Options } from './typings';

/**
 * Calculates the MD5 hash of a message using Node.js's native `crypto` module.
 *
 * @param message The message to hash.
 * @param options Encoding options.
 * @returns The MD5 hash as a Uint8Array.
 */
export const md5: Md5 = (message: Message, options?: Options) => {
  if (message === undefined || message === null) {
    throw new Error(`Illegal argument ${message}`);
  }
  return nativeMd5(message, options);
};

export default md5;
