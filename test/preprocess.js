/* eslint-disable import/no-unresolved, sort-keys */

import { join } from 'path';

import { test, expect } from 'vitest';
import prettier from 'prettier';

import pkg from './fixtures/fixture.json';
import { shuffle } from './randomized.js';
import plugin from '../lib/index.js';

test('preprocess', async () => {
  const options = {
    filepath: join('package.json'),
    parser: 'json-stringify',
    plugins: [plugin],
    preprocess: (input) => {
      const { version, repository } = JSON.parse(input);
      const result = { repository, version };
      return result;
    },
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
