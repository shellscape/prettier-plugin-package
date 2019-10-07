/*
  Copyright © 2019 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/

const alpha = (a, b) => (a.key.value > b.key.value ? 1 : a.key.value < b.key.value ? -1 : 0);

const methods = { alpha };

const process = (props, sort) => {
  const declaredMethods = Object.keys(sort);
  let result = props;

  for (const methodName of declaredMethods) {
    const method = methods[methodName];
    const propertyNames = sort[methodName];

    if (method) {
      result = result.map((prop) => {
        if (propertyNames.includes(prop.key.value)) {
          prop.value.properties.sort(method);
        }
        return prop;
      });
    }
  }

  return result;
};

module.exports = { custom: process };
