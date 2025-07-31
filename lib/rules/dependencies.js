/*
  Copyright © 2019 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/

const dependencyNames = [
  // dependencies
  'bundledDependencies',
  'optionalDependencies',
  'peerDependencies',
  'dependencies',
  'devDependencies',
  'resolutions',
];

const process = (props) =>
  props.map((prop) => {
    if (dependencyNames.includes(prop.key.value)) {
      const { elements, properties } = prop.value;

      if (elements) {
        elements.sort((a, b) =>
          a.value > b.value ? 1 : a.value < b.value ? -1 : 0,
        );
      }

      if (properties) {
        properties.sort((a, b) =>
          a.key.value > b.key.value ? 1 : a.key.value < b.key.value ? -1 : 0,
        );
      }
    }
    return prop;
  });

export { process as dependencies };
