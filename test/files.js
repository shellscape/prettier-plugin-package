/* eslint-disable import/no-unresolved, sort-keys */

import { test, expect } from 'vitest';
import prettier from 'prettier';

import plugin from '../lib/index.js';

test('default', async () => {
  const options = {
    filepath: 'package.json',
    parser: 'json-stringify',
    plugins: [plugin]
  };
  const fixture = {
    files: ['README.md', 'LICENSE', 'lib/']
  };

  const input = JSON.stringify(fixture, null, 2);
  const output = await prettier.format(input, options);

  expect(output).toMatchSnapshot();
});

test('negations', async () => {
  const options = {
    filepath: 'package.json',
    parser: 'json-stringify',
    plugins: [plugin]
  };
  const fixture = {
    files: [
      '/lit-html.js',
      '/lit-html.js.map',
      '/lit-html.d.ts',
      '/lit-html.d.ts.map',
      '/directives/',
      '/parts.js',
      '/parts.js.map',
      '/parts.d.ts',
      '/parts.d.ts.map',
      '/src/',
      '!/src/test/',
      '/development/',
      '!/development/test/'
    ]
  };

  const input = JSON.stringify(fixture, null, 2);
  const output = await prettier.format(input, options);

  expect(output).toMatchSnapshot();
});
