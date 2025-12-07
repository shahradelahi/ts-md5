/**
 * Determines if the current environment is Node.js.
 * @returns {boolean} True if in Node.js, false otherwise.
 */
export function isNode(): boolean {
  return typeof process !== 'undefined' && process.versions?.node !== undefined;
}

/**
 * Convert a UTF-8 string to a byte array.
 * @param str The string to convert.
 * @returns {Uint8Array} The byte array.
 */
export function utf8ToBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

/**
 * Convert a binary string to a byte array.
 * @param str The string to convert.
 * @returns {Uint8Array} The byte array.
 */
export function binToBytes(str: string): Uint8Array {
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i) & 0xff;
  }
  return bytes;
}

/**
 * Convert a byte array to a binary string.
 * @param bytes The byte array to convert.
 * @returns {string} The binary string.
 */
export function bytesToBin(bytes: Uint8Array): string {
  return new TextDecoder('latin1').decode(bytes);
}

/**
 * Convert a byte array to big-endian 32-bit words.
 * @param bytes The byte array to convert.
 * @returns {number[]} The array of words.
 */
export function bytesToWords(bytes: number[] | Uint8Array): number[] {
  const words: number[] = [];
  for (let i = 0, b = 0; i < bytes.length; i++, b += 8) {
    words[b >>> 5] |= bytes[i] << (24 - (b % 32));
  }
  return words;
}

/**
 * Convert big-endian 32-bit words to a byte array.
 * @param words The array of words to convert.
 * @returns {number[]} The byte array.
 */
export function wordsToBytes(words: number[]): Uint8Array {
  const bytes = new Uint8Array(words.length * 4);
  for (let b = 0; b < words.length * 32; b += 8) {
    bytes[b >>> 3] = (words[b >>> 5] >>> (24 - (b % 32))) & 0xff;
  }
  return bytes;
}

/**
 * Convert a byte array to a hex string.
 * @param bytes The byte array to convert.
 * @returns {string} The hex string.
 */
export function bytesToHex(bytes: number[]): string {
  const hex: string[] = [];
  for (const byte of bytes) {
    hex.push((byte >>> 4).toString(16));
    hex.push((byte & 0x0f).toString(16));
  }
  return hex.join('');
}
