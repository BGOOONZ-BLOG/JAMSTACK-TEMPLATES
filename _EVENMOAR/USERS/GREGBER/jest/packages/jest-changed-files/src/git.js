/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Path} from 'types/Config';
import type {Options, SCMAdapter} from 'types/ChangedFiles';

import path from 'path';
import childProcess from 'child_process';

const findChangedFilesUsingCommand = async (
  args: Array<string>,
  cwd: Path,
): Promise<Array<Path>> => {
  return new Promise((resolve, reject) => {
    const child = childProcess.spawn('git', args, {cwd});
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', data => (stdout += data));
    child.stderr.on('data', data => (stderr += data));
    child.on('error', e => reject(e));
    child.on('close', code => {
      if (code === 0) {
        stdout = stdout.trim();
        if (stdout === '') {
          resolve([]);
        } else {
          resolve(
            stdout
              .split('\n')
              .filter(s => s !== '')
              .map(changedPath => path.resolve(cwd, changedPath)),
          );
        }
      } else {
        reject(code + ': ' + stderr);
      }
    });
  });
};

const adapter: SCMAdapter = {
  findChangedFiles: async (
    cwd: string,
    options?: Options,
  ): Promise<Array<Path>> => {
    const changedSince: ?string =
      options && (options.withAncestor ? 'HEAD^' : options.changedSince);

    if (options && options.lastCommit) {
      return await findChangedFilesUsingCommand(
        ['show', '--name-only', '--pretty=%b', 'HEAD'],
        cwd,
      );
    } else if (changedSince) {
      const committed = await findChangedFilesUsingCommand(
        ['log', '--name-only', '--pretty=%b', 'HEAD', `^${changedSince}`],
        cwd,
      );
      const staged = await findChangedFilesUsingCommand(
        ['diff', '--cached', '--name-only'],
        cwd,
      );
      const unstaged = await findChangedFilesUsingCommand(
        ['ls-files', '--other', '--modified', '--exclude-standard'],
        cwd,
      );
      return [...committed, ...staged, ...unstaged];
    } else {
      return await findChangedFilesUsingCommand(
        ['ls-files', '--other', '--modified', '--exclude-standard'],
        cwd,
      );
    }
  },

  getRoot: async (cwd: string): Promise<?string> => {
    return new Promise(resolve => {
      try {
        let stdout = '';
        const options = ['rev-parse', '--show-toplevel'];
        const child = childProcess.spawn('git', options, {cwd});
        child.stdout.on('data', data => (stdout += data));
        child.on('error', () => resolve(null));
        child.on('close', code => resolve(code === 0 ? stdout.trim() : null));
      } catch (e) {
        resolve(null);
      }
    });
  },
};

export default adapter;
