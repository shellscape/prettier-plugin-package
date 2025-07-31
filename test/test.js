/* eslint-disable import/no-unresolved, sort-keys */

import { readFileSync } from 'fs';
import { join } from 'path';

import { test, expect } from 'vitest';
import prettier from 'prettier';

import plugin from '../lib/index.js';

test('not package.json', async () => {
  const options = {
    filepath: 'batman.json',
    parser: 'json-stringify',
    plugins: [plugin],
  };
  const fixture = { version: 'batman', name: 'joker' };
  const input = JSON.stringify(fixture, null, 2);
  const output = await prettier.format(input, options);

  expect(output.trim()).toBe(input.trim());
});

test('broken json', async () => {
  const options = {
    filepath: 'broken.json',
    parser: 'json-stringify',
    plugins: [plugin],
  };

  const broken = readFileSync(
    join(__dirname, './fixtures/broken.json'),
    'utf-8',
  );

  await expect(prettier.format(broken, options)).rejects.toThrow();
});
