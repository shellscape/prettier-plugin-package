import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['test/**/*.js'],
    exclude: ['**/node_modules/**', '**/fixtures/**'],
    resolveSnapshotPath: (testPath, snapExtension) => {
      return testPath.replace('/test/', '/test/snapshots/') + snapExtension;
    },
    coverage: {
      reporter: ['text', 'lcov'],
      include: ['lib/*.js'],
      exclude: ['test/**']
    }
  }
});