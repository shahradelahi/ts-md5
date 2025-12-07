# @se-oss/md5

[![CI](https://github.com/shahradelahi/ts-md5/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/shahradelahi/ts-md5/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/@se-oss/md5.svg)](https://www.npmjs.com/package/@se-oss/md5)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](/LICENSE)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@se-oss/md5)
[![Install Size](https://packagephobia.com/badge?p=@se-oss/md5)](https://packagephobia.com/result?p=@se-oss/md5)
[![Edge Runtime Compatible](https://img.shields.io/badge/edge--runtime-%E2%9C%94%20compatible-black)](https://vercel.com/docs/functions/runtimes/edge)

_@se-oss/md5_ is a MD5 hashing library for JavaScript that works seamlessly in both Node.js and browser environments. It automatically detects the environment and uses the fastest available implementation—up to **50x faster** than other popular libraries.

- [Installation](#-installation)
- [Usage](#-usage)
- [Environments](#-environments)
- [Documentation](#-documentation)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#license)

## 📦 Installation

```bash
pnpm install @se-oss/md5
```

<details>
<summary>Install using your favorite package manager</summary>

**npm**

```bash
npm install @se-oss/md5
```

**yarn**

```bash
yarn add @se-oss/md5
```

</details>

## 📖 Usage

`@se-oss/md5` provides a simple and flexible API for creating MD5 hashes. It automatically selects the best implementation for your environment.

```typescript
import { md5 } from '@se-oss/md5';

// Hash a string
const hash = md5('message');
console.log(hash); // Uint8Array [120, 231, 49, 2, 125, 143, 213, 14, 214, 66, 52, 11, 124, 154, 99, 179]

// Hash a Uint8Array
const uint8Array = new TextEncoder().encode('hello world');
const bufferHash = md5(uint8Array);
console.log(bufferHash); // Uint8Array [94, 182, 59, 187, 224, 30, 238, 208, 147, 203, 34, 187, 143, 90, 205, 195]
```

## 🌐 Environments

This library is designed to be universal:

- **Node.js:** It automatically uses the built-in `node:crypto` module for optimal performance.
- **Browsers and other environments:** It falls back to a reliable pure JavaScript implementation.

You don't need to configure anything; the library handles the environment detection for you.

## 📚 Documentation

For all configuration options, please see [the API docs](https://www.jsdocs.io/package/@se-oss/md5).

## 🚀 Performance

When running in Node.js, `@se-oss/md5` automatically uses the native `node:crypto` module, making it significantly faster than pure JavaScript implementations.

| Library                  | Short String Hashing | Long String (1MB) | Short Buffer Hashing | Long Buffer (1MB) |
| ------------------------ | -------------------- | ----------------- | -------------------- | ----------------- |
| **@se-oss/md5 (Native)** | _919,060 ops/sec_    | _682 ops/sec_     | 622,662 ops/sec      | _849 ops/sec_     |
| **@se-oss/md5**          | 874,791 ops/sec      | 117 ops/sec       | _685,003 ops/sec_    | 71 ops/sec        |
| md5                      | 747,229 ops/sec      | 56 ops/sec        | 516,042 ops/sec      | 16 ops/sec        |

_These benchmarks were run on a standard development machine. Your results may vary._
_Benchmark script: [`src/index.bench.ts`](src/index.bench.ts)_

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/ts-md5).

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi) and [contributors](https://github.com/shahradelahi/ts-md5/graphs/contributors).
