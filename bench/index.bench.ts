import nativeMd5 from '@se-oss/md5/node';
import ourMd5 from '@se-oss/md5/browser';
import theirMd5 from 'md5';
import { bench, describe } from 'vitest';

describe('md5', () => {
  const shortString = 'hello world';
  const longString = 'a'.repeat(1024 * 1024); // 1MB string
  const shortBuffer = new TextEncoder().encode(shortString);
  const longBuffer = new TextEncoder().encode(longString);

  describe('short string', () => {
    bench('@se-oss/md5', () => {
      ourMd5(shortString);
    });

    bench('@se-oss/md5 (Native)', () => {
      nativeMd5(shortString);
    });

    bench('md5', () => {
      theirMd5(shortString);
    });
  });

  describe('long string (1MB)', () => {
    bench('@se-oss/md5', () => {
      ourMd5(longString);
    });

    bench('@se-oss/md5 (Native)', () => {
      nativeMd5(longString);
    });

    bench('md5', () => {
      theirMd5(longString);
    });
  });

  describe('short buffer', () => {
    bench('@se-oss/md5', () => {
      ourMd5(shortBuffer);
    });

    bench('@se-oss/md5 (Native)', () => {
      nativeMd5(shortBuffer);
    });

    bench('md5', () => {
      theirMd5(shortBuffer);
    });
  });

  describe('long buffer (1MB)', () => {
    bench('@se-oss/md5', () => {
      ourMd5(longBuffer);
    });

    bench('@se-oss/md5 (Native)', () => {
      nativeMd5(longBuffer);
    });

    bench('md5', () => {
      theirMd5(longBuffer);
    });
  });
});
