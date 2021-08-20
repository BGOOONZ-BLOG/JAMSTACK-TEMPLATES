/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Argv} from 'types/Argv';

import chalk from 'chalk';
import {deprecationEntries} from 'jest-config';
import {createDidYouMeanMessage, format, ValidationError} from './utils';
import {deprecationWarning} from './deprecated';
import defaultConfig from './default_config';

const BULLET: string = chalk.bold('\u25cf');
export const DOCUMENTATION_NOTE = `  ${chalk.bold('CLI Options Documentation:')}
  https://facebook.github.io/jest/docs/en/cli.html
`;

const createCLIValidationError = (
  unrecognizedOptions: Array<string>,
  allowedOptions: Set<string>,
) => {
  let title = `${BULLET} Unrecognized CLI Parameter`;
  let message;
  const comment =
    `  ${chalk.bold('CLI Options Documentation')}:\n` +
    `  https://facebook.github.io/jest/docs/en/cli.html\n`;

  if (unrecognizedOptions.length === 1) {
    const unrecognized = unrecognizedOptions[0];
    const didYouMeanMessage = createDidYouMeanMessage(
      unrecognized,
      Array.from(allowedOptions),
    );
    message =
      `  Unrecognized option ${chalk.bold(format(unrecognized))}.` +
      (didYouMeanMessage ? ` ${didYouMeanMessage}` : '');
  } else {
    title += 's';
    message =
      `  Following options were not recognized:\n` +
      `  ${chalk.bold(format(unrecognizedOptions))}`;
  }

  return new ValidationError(title, message, comment);
};

const logDeprecatedOptions = (
  deprecatedOptions: Array<string>,
  deprecationEntries: Object,
  argv: Argv,
) => {
  deprecatedOptions.forEach(opt => {
    deprecationWarning(
      argv,
      opt,
      deprecationEntries,
      Object.assign({}, defaultConfig, {
        comment: DOCUMENTATION_NOTE,
      }),
    );
  });
};

export default function validateCLIOptions(argv: Argv, options: Object) {
  const yargsSpecialOptions = ['$0', '_', 'help', 'h'];
  const allowedOptions = Object.keys(options).reduce(
    (acc, option) => acc.add(option).add(options[option].alias || option),
    new Set(yargsSpecialOptions),
  );
  const unrecognizedOptions = Object.keys(argv).filter(
    arg => !allowedOptions.has(arg),
  );

  if (unrecognizedOptions.length) {
    throw createCLIValidationError(unrecognizedOptions, allowedOptions);
  }

  const CLIDeprecations = Object.keys(deprecationEntries).reduce(
    (acc, entry) => {
      if (options[entry]) {
        acc[entry] = deprecationEntries[entry];
        if (options[entry].alias) {
          acc[options[entry].alias] = deprecationEntries[entry];
        }
      }
      return acc;
    },
    {},
  );
  const deprecations = new Set(Object.keys(CLIDeprecations));
  const deprecatedOptions = Object.keys(argv).filter(
    arg => deprecations.has(arg) && argv[arg] != null,
  );

  if (deprecatedOptions.length) {
    logDeprecatedOptions(deprecatedOptions, CLIDeprecations, argv);
  }

  return true;
}
