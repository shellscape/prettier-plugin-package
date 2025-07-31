/* eslint-disable import/no-unresolved, sort-keys */

import { test, expect } from 'vitest';
import prettier from 'prettier';

import plugin from '../lib/index.js';

test('props', async () => {
  const options = {
    filepath: 'package.json',
    parser: 'json-stringify',
    plugins: [plugin],
  };
  const fixture = {
    keywords: ['package', 'package.json', 'plugin', 'prettier'],
    version: '0.1.1',
  };

  const input = JSON.stringify(fixture, null, 2);
  const output = await prettier.format(input, options);

  expect(output).toMatchSnapshot();
});
