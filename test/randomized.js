/* eslint-disable import/no-unresolved, sort-keys */

import { join } from 'path';

import { test, expect } from 'vitest';
import prettier from 'prettier';

import pkg from './fixtures/fixture.json';
import plugin from '../lib/index.js';

export const shuffle = (arr) => {
  const result = arr.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [result[i], result[rand]] = [result[rand], result[i]];
  }
  return result;
};

test('randomize', async () => {
  const options = {
    filepath: join(import.meta.dirname, 'package.json'),
    parser: 'json-stringify',
    plugins: [plugin],
  };
  const keys = shuffle(Object.keys(pkg));
  const fixture = {};

  for (const key of keys) {
    fixture[key] = pkg[key];
  }

  const input = JSON.stringify(fixture, null, 2);
  const output = await prettier.format(input, options);

  expect(output).toMatchSnapshot();
});
