import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['test/**/*.js'],
    exclude: ['**/node_modules/**', '**/fixtures/**'],
    coverage: {
      reporter: ['text', 'lcov'],
      include: ['lib/*.js'],
      exclude: ['test/**']
    }
  }
});