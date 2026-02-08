import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    node: 'src/node.ts',
    browser: 'src/browser.ts',
  },
  format: ['cjs', 'esm'],
  target: 'esnext',
  outDir: 'dist',
});
