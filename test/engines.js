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
    engines: {
      npm: 'joker',
      node: 'batman'
    }
  };

  const input = JSON.stringify(fixture, null, 2);
  const output = prettier.format(input, options);

  t.snapshot(output);
});
