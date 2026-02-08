# @se-oss/md5

## 1.1.1

### Patch Changes

- a4d03ae: Updated dependencies

## 1.1.0

### Minor Changes

- 180d74b: Updated `package.json` with conditional exports for optimized environment targeting.

### Patch Changes

- 180d74b: Fixed `node:crypto` loading issues by decoupling environment-specific logic.
- 9303be8: Moved `src/index.bench.ts` to a new `bench/` directory, added its own `package.json` and `tsconfig.json`, and updated references.
- 9303be8: Added `./node` and `./browser` subpaths and updated the root export to use `default` instead of `require` for CJS.
