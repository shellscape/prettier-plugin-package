/* eslint-disable import/no-unresolved, sort-keys */

import { readFileSync } from 'fs';
import { join }  from 'path';

import { test, expect } from 'vitest';
import prettier from 'prettier';

import pkg  from './fixtures/fixture.json';
import plugin from '../lib/index.js';
//
const shuffle = (arr) => {
  const result = arr.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [result[i], result[rand]] = [result[rand], result[i]];
  }
  return result;
};

test('randomize', async () => {
  const options = {
    filepath: join(__dirname, 'package.json'),
    parser: 'json-stringify',
    plugins: [plugin]
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

test('preprocess', async () => {
  const options = {
    filepath: join('package.json'),
    parser: 'json-stringify',
    plugins: [plugin],
    preprocess: (input) => {
      const { version, repository } = JSON.parse(input);
      const result = { repository, version };
      return result;
    }
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

test('not package.json', async () => {
  const options = {
    filepath: 'batman.json',
    parser: 'json-stringify',
    plugins: [plugin]
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
    plugins: [plugin]
  };

  const broken = readFileSync(join(__dirname, './fixtures/broken.json'), 'utf-8');
  
  await expect(prettier.format(broken, options)).rejects.toThrow();
});
