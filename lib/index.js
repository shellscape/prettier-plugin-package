/*
  Copyright © 2019 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { parsers } = require('prettier/parser-babylon');

const { custom } = require('./rules/custom');
const { engines } = require('./rules/engines');
const { files } = require('./rules/files');
const { scripts } = require('./rules/scripts');
const { sort: sortProps } = require('./rules/props');

const { 'json-stringify': parser } = parsers;
const { parse } = parser;
const rePkg = /package\.json$/;

const safe = (json) => {
  try {
    return JSON.parse(json);
  } catch (_) {
    return null;
  }
};

const format = (properties, options) => {
  let props = sortProps(properties);
  props = engines(props);
  props = files(props);
  props = scripts(props);

  if (options) {
    const { sort } = safe(options);
    if (sort) {
      props = custom(props, sort);
    }
  }

  return props;
};

module.exports = {
  name: 'prettier-plugin-package',
  options: {
    pluginPackage: {
      type: 'path',
      category: 'Plugins',
      default: '',
      description: 'Specify options for the package plugin'
    }
  },
  parsers: {
    'json-stringify': {
      ...parser,
      parse(...args) {
        const [, , options] = args;
        const { filepath, pluginPackage } = options;
        const ast = parse(...args);

        if (rePkg.test(filepath)) {
          const { properties } = ast;
          ast.properties = format(properties, pluginPackage);
        }

        return ast;
      }
    }
  }
};
