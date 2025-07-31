/*
  Copyright © 2019 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
import babelParsers from 'prettier/plugins/babel';

import { dependencies } from './rules/dependencies.js';
import { engines } from './rules/engines.js';
import { files } from './rules/files.js';
import { scripts } from './rules/scripts.js';
import { sort } from './rules/sort.js';

const { parsers } = babelParsers;
const { 'json-stringify': parser } = parsers;
const { parse } = parser;
const rePkg = /package\.json$/;

const format = (properties) => {
  let props = sort(properties);
  props = engines(props);
  props = files(props);
  props = scripts(props);
  props = dependencies(props);

  return props;
};

const plugin = {
  name: 'prettier-plugin-package',
  parsers: {
    'json-stringify': {
      ...parser,
      async parse(text, options) {
        const { filepath } = options;
        const ast = parse(text, options);

        if (rePkg.test(filepath)) {
          const { properties, node } = ast;
          const affectNode = !properties && !!node?.properties;
          const formatResult = format(properties || node.properties);

          if (affectNode) ast.node.properties = formatResult;
          else ast.properties = formatResult;
        }

        return ast;
      },
      astFormat: 'estree-json',
    },
  },
};

export default plugin;
