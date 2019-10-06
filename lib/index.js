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

const format = (properties, { sort = null }) => {
  let props = sortProps(properties);
  props = engines(props);
  props = files(props);
  props = scripts(props);

  if (sort) {
    props = custom(props, sort);
  }

  return props;
};

module.exports = {
  name: 'prettier-plugin-package',
  options: {
    sort: {
      type: 'object',
      category: 'prettier-plugin-package',
      default: null,
      description: 'Specify custom sorting for one or more package properties'
    }
  },
  parsers: {
    'json-stringify': {
      ...parser,
      parse(...args) {
        const [, , options] = args;
        const { filepath } = options;
        const ast = parse(...args);

        console.log(options);

        if (rePkg.test(filepath)) {
          const { properties } = ast;
          ast.properties = format(properties, options);
        }

        return ast;
      }
    }
  }
};
