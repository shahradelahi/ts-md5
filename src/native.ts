import { createHash } from 'node:crypto';

import type { Md5, Message, Options } from './typings';

/**
 * Calculates the MD5 hash using Node.js's native `crypto` module.
 *
 * @param message The message to hash.
 * @param _options Encoding options (ignored in native implementation).
 * @returns The MD5 hash as a Uint8Array.
 */
const nativeMd5: Md5 = (message: Message, _options: Options = {}): Uint8Array => {
  if (message === undefined || message === null) {
    throw new TypeError(`Illegal argument ${message}`);
  }

  const hash = createHash('md5');
  if (typeof message === 'string') {
    hash.update(message, 'utf8');
  } else {
    hash.update(new Uint8Array(message as Iterable<number>));
  }

  return hash.digest();
};

export default nativeMd5;
