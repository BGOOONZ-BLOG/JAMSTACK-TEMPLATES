/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {GlobalConfig, ProjectConfig} from 'types/Config';

const SNAPSHOT_EXTENSION = 'snap';

export default function isValidPath(
  globalConfig: GlobalConfig,
  config: ProjectConfig,
  filePath: string,
) {
  return (
    !filePath.includes(globalConfig.coverageDirectory) &&
    !config.watchPathIgnorePatterns.some(pattern => filePath.match(pattern)) &&
    !filePath.endsWith(`.${SNAPSHOT_EXTENSION}`)
  );
}
