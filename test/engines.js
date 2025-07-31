/* eslint-disable import/no-unresolved, sort-keys */

import { test, expect } from 'vitest';
import prettier  from 'prettier';

import plugin from '../lib/index.js';

test('default', async () => {
  const options = {
    filepath: 'package.json',
    parser: 'json-stringify',
    plugins: [plugin]
  };
  const fixture = {
    engines: {
      npm: 'joker',
      node: 'batman'
    }
  };

  const input = JSON.stringify(fixture, null, 2);
  const output = await prettier.format(input, options);

  expect(output).toMatchSnapshot();
});
