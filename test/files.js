/* eslint-disable import/no-unresolved, sort-keys */

const test = require('ava');
const prettier = require('prettier');

test('default', (t) => {
  const options = {
    filepath: 'package.json',
    parser: 'json-stringify',
    plugins: ['.']
  };
  const fixture = {
    files: ['README.md', 'LICENSE', 'lib/']
  };

  const input = JSON.stringify(fixture, null, 2);
  const output = prettier.format(input, options);

  t.snapshot(output);
});

test('negations', (t) => {
  const options = {
    filepath: 'package.json',
    parser: 'json-stringify',
    plugins: ['.']
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
  const output = prettier.format(input, options);

  t.snapshot(output);
});
