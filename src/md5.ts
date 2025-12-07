import type { Md5, Message, Options } from './typings';
import { binToBytes, bytesToWords, utf8ToBytes, wordsToBytes } from './utils';

const ff = (
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number
): number => {
  const n = a + ((b & c) | (~b & d)) + (x >>> 0) + t;
  return ((n << s) | (n >>> (32 - s))) + b;
};

const gg = (
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number
): number => {
  const n = a + ((b & d) | (c & ~d)) + (x >>> 0) + t;
  return ((n << s) | (n >>> (32 - s))) + b;
};

const hh = (
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number
): number => {
  const n = a + (b ^ c ^ d) + (x >>> 0) + t;
  return ((n << s) | (n >>> (32 - s))) + b;
};

const ii = (
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number
): number => {
  const n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
  return ((n << s) | (n >>> (32 - s))) + b;
};

const coreMd5 = (message: Uint8Array): Uint8Array => {
  const m = bytesToWords(message);
  const l = message.length * 8;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  // Swap endian
  for (let i = 0; i < m.length; i++) {
    const x = m[i];
    m[i] = (((x << 8) | (x >>> 24)) & 0x00ff00ff) | (((x << 24) | (x >>> 8)) & 0xff00ff00);
  }

  // Padding
  m[l >>> 5] |= 0x80 << (l % 32);
  m[(((l + 64) >>> 9) << 4) + 14] = l;

  for (let i = 0; i < m.length; i += 16) {
    const aa = a;
    const bb = b;
    const cc = c;
    const dd = d;

    a = ff(a, b, c, d, m[i], 7, -680876936);
    d = ff(d, a, b, c, m[i + 1], 12, -389564586);
    c = ff(c, d, a, b, m[i + 2], 17, 606105819);
    b = ff(b, c, d, a, m[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, m[i + 4], 7, -176418897);
    d = ff(d, a, b, c, m[i + 5], 12, 1200080426);
    c = ff(c, d, a, b, m[i + 6], 17, -1473231341);
    b = ff(b, c, d, a, m[i + 7], 22, -45705983);
    a = ff(a, b, c, d, m[i + 8], 7, 1770035416);
    d = ff(d, a, b, c, m[i + 9], 12, -1958414417);
    c = ff(c, d, a, b, m[i + 10], 17, -42063);
    b = ff(b, c, d, a, m[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, m[i + 12], 7, 1804603682);
    d = ff(d, a, b, c, m[i + 13], 12, -40341101);
    c = ff(c, d, a, b, m[i + 14], 17, -1502002290);
    b = ff(b, c, d, a, m[i + 15], 22, 1236535329);

    a = gg(a, b, c, d, m[i + 1], 5, -165796510);
    d = gg(d, a, b, c, m[i + 6], 9, -1069501632);
    c = gg(c, d, a, b, m[i + 11], 14, 643717713);
    b = gg(b, c, d, a, m[i], 20, -373897302);
    a = gg(a, b, c, d, m[i + 5], 5, -701558691);
    d = gg(d, a, b, c, m[i + 10], 9, 38016083);
    c = gg(c, d, a, b, m[i + 15], 14, -660478335);
    b = gg(b, c, d, a, m[i + 4], 20, -405537848);
    a = gg(a, b, c, d, m[i + 9], 5, 568446438);
    d = gg(d, a, b, c, m[i + 14], 9, -1019803690);
    c = gg(c, d, a, b, m[i + 3], 14, -187363961);
    b = gg(b, c, d, a, m[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, m[i + 13], 5, -1444681467);
    d = gg(d, a, b, c, m[i + 2], 9, -51403784);
    c = gg(c, d, a, b, m[i + 7], 14, 1735328473);
    b = gg(b, c, d, a, m[i + 12], 20, -1926607734);

    a = hh(a, b, c, d, m[i + 5], 4, -378558);
    d = hh(d, a, b, c, m[i + 8], 11, -2022574463);
    c = hh(c, d, a, b, m[i + 11], 16, 1839030562);
    b = hh(b, c, d, a, m[i + 14], 23, -35309556);
    a = hh(a, b, c, d, m[i + 1], 4, -1530992060);
    d = hh(d, a, b, c, m[i + 4], 11, 1272893353);
    c = hh(c, d, a, b, m[i + 7], 16, -155497632);
    b = hh(b, c, d, a, m[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, m[i + 13], 4, 681279174);
    d = hh(d, a, b, c, m[i], 11, -358537222);
    c = hh(c, d, a, b, m[i + 3], 16, -722521979);
    b = hh(b, c, d, a, m[i + 6], 23, 76029189);
    a = hh(a, b, c, d, m[i + 9], 4, -640364487);
    d = hh(d, a, b, c, m[i + 12], 11, -421815835);
    c = hh(c, d, a, b, m[i + 15], 16, 530742520);
    b = hh(b, c, d, a, m[i + 2], 23, -995338651);

    a = ii(a, b, c, d, m[i], 6, -198630844);
    d = ii(d, a, b, c, m[i + 7], 10, 1126891415);
    c = ii(c, d, a, b, m[i + 14], 15, -1416354905);
    b = ii(b, c, d, a, m[i + 5], 21, -57434055);
    a = ii(a, b, c, d, m[i + 12], 6, 1700485571);
    d = ii(d, a, b, c, m[i + 3], 10, -1894986606);
    c = ii(c, d, a, b, m[i + 10], 15, -1051523);
    b = ii(b, c, d, a, m[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, m[i + 8], 6, 1873313359);
    d = ii(d, a, b, c, m[i + 15], 10, -30611744);
    c = ii(c, d, a, b, m[i + 6], 15, -1560198380);
    b = ii(b, c, d, a, m[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, m[i + 4], 6, -145523070);
    d = ii(d, a, b, c, m[i + 11], 10, -1120210379);
    c = ii(c, d, a, b, m[i + 2], 15, 718787259);
    b = ii(b, c, d, a, m[i + 9], 21, -343485551);

    a = (a + aa) >>> 0;
    b = (b + bb) >>> 0;
    c = (c + cc) >>> 0;
    d = (d + dd) >>> 0;
  }

  a = (((a << 8) | (a >>> 24)) & 0x00ff00ff) | (((a << 24) | (a >>> 8)) & 0xff00ff00);
  b = (((b << 8) | (b >>> 24)) & 0x00ff00ff) | (((b << 24) | (b >>> 8)) & 0xff00ff00);
  c = (((c << 8) | (c >>> 24)) & 0x00ff00ff) | (((c << 24) | (c >>> 8)) & 0xff00ff00);
  d = (((d << 8) | (d >>> 24)) & 0x00ff00ff) | (((d << 24) | (d >>> 8)) & 0xff00ff00);

  return wordsToBytes([a, b, c, d]);
};

/**
 * Calculates the MD5 hash using a pure JavaScript implementation.
 *
 * @param message The message to hash.
 * @param options Encoding options.
 * @returns The MD5 hash as a Uint8Array.
 */
const md5: Md5 = (message: Message, options: Options = {}) => {
  if (message === undefined || message === null) {
    throw new TypeError(`Illegal argument ${message}`);
  }

  let messageAsBytes: Uint8Array;
  if (typeof message === 'string') {
    messageAsBytes = options.encoding === 'binary' ? binToBytes(message) : utf8ToBytes(message);
  } else {
    messageAsBytes = new Uint8Array(message as Iterable<number>);
  }

  return coreMd5(messageAsBytes);
};

export default md5;
