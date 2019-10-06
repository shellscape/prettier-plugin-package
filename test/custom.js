const test = require('ava');
const prettier = require('prettier');

test('default', (t) => {
  const options = {
    filepath: 'package.json',
    parser: 'json-stringify',
    plugins: ['.'],
    sort: {
      alpha: ['dependencies']
    }
  };
  const fixture = {
    dependencies: {
      nyc: '^14.1.0',
      'eslint-config-shellscape': '^2.0.2',
      ava: '^2.2.0',
      execa: '^2.0.3'
    }
  };

  const input = JSON.stringify(fixture, null, 2);
  const output = prettier.format(input, options);

  t.snapshot(output);
});
