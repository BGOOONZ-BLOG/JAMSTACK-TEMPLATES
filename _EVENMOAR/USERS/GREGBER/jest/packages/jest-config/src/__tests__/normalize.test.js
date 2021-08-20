/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {escapeStrForRegex} from 'jest-regex-util';
import normalize from '../normalize';

jest.mock('jest-resolve');

jest.mock('path', () => require.requireActual('path').posix);

const crypto = require('crypto');
const path = require('path');
const DEFAULT_JS_PATTERN = require('../constants').DEFAULT_JS_PATTERN;
const DEFAULT_CSS_PATTERN = '^.+\\.(css)$';

let root;
let expectedPathFooBar;
let expectedPathFooQux;
let expectedPathAbs;
let expectedPathAbsAnother;

const findNodeModule = jest.fn(name => {
  if (name.indexOf('jest-jasmine2') !== -1) {
    return name;
  }
  return null;
});

// Windows uses backslashes for path separators, which need to be escaped in
// regular expressions. This little helper function helps us generate the
// expected strings for checking path patterns.
function joinForPattern() {
  return Array.prototype.join.call(arguments, escapeStrForRegex(path.sep));
}

beforeEach(() => {
  root = path.resolve('/');
  expectedPathFooBar = path.join(root, 'root', 'path', 'foo', 'bar', 'baz');
  expectedPathFooQux = path.join(root, 'root', 'path', 'foo', 'qux', 'quux');
  expectedPathAbs = path.join(root, 'an', 'abs', 'path');
  expectedPathAbsAnother = path.join(root, 'another', 'abs', 'path');

  require('jest-resolve').findNodeModule = findNodeModule;
});

it('picks a name based on the rootDir', () => {
  const rootDir = '/root/path/foo';
  const expected = crypto
    .createHash('md5')
    .update('/root/path/foo')
    .digest('hex');
  expect(
    normalize(
      {
        rootDir,
      },
      {},
    ).options.name,
  ).toBe(expected);
});

it('keeps custom names based on the rootDir', () => {
  expect(
    normalize(
      {
        name: 'custom-name',
        rootDir: '/root/path/foo',
      },
      {},
    ).options.name,
  ).toBe('custom-name');
});

it('sets coverageReporters correctly when argv.json is set', () => {
  expect(
    normalize(
      {
        rootDir: '/root/path/foo',
      },
      {
        json: true,
      },
    ).options.coverageReporters,
  ).toEqual(['json', 'lcov', 'clover']);
});

describe('rootDir', () => {
  it('throws if the options is missing a rootDir property', () => {
    expect(() => {
      normalize({}, {});
    }).toThrowErrorMatchingSnapshot();
  });
});

describe('automock', () => {
  it('falsy automock is not overwritten', () => {
    const consoleWarn = console.warn;
    console.warn = jest.fn();
    const {options} = normalize(
      {
        automock: false,
        rootDir: '/root/path/foo',
      },
      {},
    );

    expect(options.automock).toBe(false);

    console.warn = consoleWarn;
  });
});

describe('browser', () => {
  it('falsy browser is not overwritten', () => {
    const {options} = normalize(
      {
        browser: true,
        rootDir: '/root/path/foo',
      },
      {},
    );

    expect(options.browser).toBe(true);
  });
});

describe('collectCoverageOnlyFrom', () => {
  it('normalizes all paths relative to rootDir', () => {
    const {options} = normalize(
      {
        collectCoverageOnlyFrom: {
          'bar/baz': true,
          'qux/quux/': true,
        },
        rootDir: '/root/path/foo/',
      },
      {},
    );

    const expected = {};
    expected[expectedPathFooBar] = true;
    expected[expectedPathFooQux] = true;

    expect(options.collectCoverageOnlyFrom).toEqual(expected);
  });

  it('does not change absolute paths', () => {
    const {options} = normalize(
      {
        collectCoverageOnlyFrom: {
          '/an/abs/path': true,
          '/another/abs/path': true,
        },
        rootDir: '/root/path/foo',
      },
      {},
    );

    const expected = {};
    expected[expectedPathAbs] = true;
    expected[expectedPathAbsAnother] = true;

    expect(options.collectCoverageOnlyFrom).toEqual(expected);
  });

  it('substitutes <rootDir> tokens', () => {
    const {options} = normalize(
      {
        collectCoverageOnlyFrom: {
          '<rootDir>/bar/baz': true,
        },
        rootDir: '/root/path/foo',
      },
      {},
    );

    const expected = {};
    expected[expectedPathFooBar] = true;

    expect(options.collectCoverageOnlyFrom).toEqual(expected);
  });
});

describe('collectCoverageFrom', () => {
  it('substitutes <rootDir> tokens', () => {
    const barBaz = 'bar/baz';
    const quxQuux = 'qux/quux/';
    const notQuxQuux = `!${quxQuux}`;

    const {options} = normalize(
      {
        collectCoverageFrom: [
          barBaz,
          notQuxQuux,
          `<rootDir>/${barBaz}`,
          `!<rootDir>/${quxQuux}`,
        ],
        rootDir: '/root/path/foo/',
      },
      {},
    );

    const expected = [barBaz, notQuxQuux, barBaz, notQuxQuux];

    expect(options.collectCoverageFrom).toEqual(expected);
  });
});

function testPathArray(key) {
  it('normalizes all paths relative to rootDir', () => {
    const {options} = normalize(
      {
        [key]: ['bar/baz', 'qux/quux/'],
        rootDir: '/root/path/foo',
      },
      {},
    );

    expect(options[key]).toEqual([expectedPathFooBar, expectedPathFooQux]);
  });

  it('does not change absolute paths', () => {
    const {options} = normalize(
      {
        [key]: ['/an/abs/path', '/another/abs/path'],
        rootDir: '/root/path/foo',
      },
      {},
    );

    expect(options[key]).toEqual([expectedPathAbs, expectedPathAbsAnother]);
  });

  it('substitutes <rootDir> tokens', () => {
    const {options} = normalize(
      {
        [key]: ['<rootDir>/bar/baz'],
        rootDir: '/root/path/foo',
      },
      {},
    );

    expect(options[key]).toEqual([expectedPathFooBar]);
  });
}

describe('roots', () => {
  testPathArray('roots');
});

describe('transform', () => {
  let Resolver;
  beforeEach(() => {
    Resolver = require('jest-resolve');
    Resolver.findNodeModule = jest.fn(name => name);
  });

  it('normalizes the path', () => {
    const {options} = normalize(
      {
        rootDir: '/root/',
        transform: {
          [DEFAULT_CSS_PATTERN]: '<rootDir>/node_modules/jest-regex-util',
          [DEFAULT_JS_PATTERN]: 'babel-jest',
          'abs-path': '/qux/quux',
        },
      },
      {},
    );

    expect(options.transform).toEqual([
      [DEFAULT_CSS_PATTERN, '/root/node_modules/jest-regex-util'],
      [DEFAULT_JS_PATTERN, 'babel-jest'],
      ['abs-path', '/qux/quux'],
    ]);
  });
});

describe('haste', () => {
  let Resolver;
  beforeEach(() => {
    Resolver = require('jest-resolve');
    Resolver.findNodeModule = jest.fn(name => name);
  });

  it('normalizes the path for hasteImplModulePath', () => {
    const {options} = normalize(
      {
        haste: {
          hasteImplModulePath: '<rootDir>/haste_impl.js',
        },
        rootDir: '/root/',
      },
      {},
    );

    expect(options.haste).toEqual({
      hasteImplModulePath: '/root/haste_impl.js',
    });
  });
});

describe('setupTestFrameworkScriptFile', () => {
  let Resolver;
  beforeEach(() => {
    Resolver = require('jest-resolve');
    Resolver.findNodeModule = jest.fn(
      name =>
        name.startsWith('/') ? name : '/root/path/foo' + path.sep + name,
    );
  });

  it('normalizes the path according to rootDir', () => {
    const {options} = normalize(
      {
        rootDir: '/root/path/foo',
        setupTestFrameworkScriptFile: 'bar/baz',
      },
      {},
    );

    expect(options.setupTestFrameworkScriptFile).toEqual(expectedPathFooBar);
  });

  it('does not change absolute paths', () => {
    const {options} = normalize(
      {
        rootDir: '/root/path/foo',
        setupTestFrameworkScriptFile: '/an/abs/path',
      },
      {},
    );

    expect(options.setupTestFrameworkScriptFile).toEqual(expectedPathAbs);
  });

  it('substitutes <rootDir> tokens', () => {
    const {options} = normalize(
      {
        rootDir: '/root/path/foo',
        setupTestFrameworkScriptFile: '<rootDir>/bar/baz',
      },
      {},
    );

    expect(options.setupTestFrameworkScriptFile).toEqual(expectedPathFooBar);
  });
});

describe('coveragePathIgnorePatterns', () => {
  it('does not normalize paths relative to rootDir', () => {
    // This is a list of patterns, so we can't assume any of them are
    // directories
    const {options} = normalize(
      {
        coveragePathIgnorePatterns: ['bar/baz', 'qux/quux'],
        rootDir: '/root/path/foo',
      },
      {},
    );

    expect(options.coveragePathIgnorePatterns).toEqual([
      joinForPattern('bar', 'baz'),
      joinForPattern('qux', 'quux'),
    ]);
  });

  it('does not normalize trailing slashes', () => {
    // This is a list of patterns, so we can't assume any of them are
    // directories
    const {options} = normalize(
      {
        coveragePathIgnorePatterns: ['bar/baz', 'qux/quux/'],
        rootDir: '/root/path/foo',
      },
      {},
    );

    expect(options.coveragePathIgnorePatterns).toEqual([
      joinForPattern('bar', 'baz'),
      joinForPattern('qux', 'quux', ''),
    ]);
  });

  it('substitutes <rootDir> tokens', () => {
    const {options} = normalize(
      {
        coveragePathIgnorePatterns: ['hasNoToken', '<rootDir>/hasAToken'],
        rootDir: '/root/path/foo',
      },
      {},
    );

    expect(options.coveragePathIgnorePatterns).toEqual([
      'hasNoToken',
      joinForPattern('', 'root', 'path', 'foo', 'hasAToken'),
    ]);
  });
});

describe('watchPathIgnorePatterns', () => {
  it('does not normalize paths relative to rootDir', () => {
    // This is a list of patterns, so we can't assume any of them are
    // directories
    const {options} = normalize(
      {
        rootDir: '/root/path/foo',
        watchPathIgnorePatterns: ['bar/baz', 'qux/quux'],
      },
      {},
    );

    expect(options.watchPathIgnorePatterns).toEqual([
      joinForPattern('bar', 'baz'),
      joinForPattern('qux', 'quux'),
    ]);
  });

  it('does not normalize trailing slashes', () => {
    // This is a list of patterns, so we can't assume any of them are
    // directories
    const {options} = normalize(
      {
        rootDir: '/root/path/foo',
        watchPathIgnorePatterns: ['bar/baz', 'qux/quux/'],
      },
      {},
    );

    expect(options.watchPathIgnorePatterns).toEqual([
      joinForPattern('bar', 'baz'),
      joinForPattern('qux', 'quux', ''),
    ]);
  });

  it('substitutes <rootDir> tokens', () => {
    const {options} = normalize(
      {
        rootDir: '/root/path/foo',
        watchPathIgnorePatterns: ['hasNoToken', '<rootDir>/hasAToken'],
      },
      {},
    );

    expect(options.watchPathIgnorePatterns).toEqual([
      'hasNoToken',
      joinForPattern('', 'root', 'path', 'foo', 'hasAToken'),
    ]);
  });
});

describe('testPathIgnorePatterns', () => {
  it('does not normalize paths relative to rootDir', () => {
    // This is a list of patterns, so we can't assume any of them are
    // directories
    const {options} = normalize(
      {
        rootDir: '/root/path/foo',
        testPathIgnorePatterns: ['bar/baz', 'qux/quux'],
      },
      {},
    );

    expect(options.testPathIgnorePatterns).toEqual([
      joinForPattern('bar', 'baz'),
      joinForPattern('qux', 'quux'),
    ]);
  });

  it('does not normalize trailing slashes', () => {
    // This is a list of patterns, so we can't assume any of them are
    // directories
    const {options} = normalize(
      {
        rootDir: '/root/path/foo',
        testPathIgnorePatterns: ['bar/baz', 'qux/quux/'],
      },
      {},
    );

    expect(options.testPathIgnorePatterns).toEqual([
      joinForPattern('bar', 'baz'),
      joinForPattern('qux', 'quux', ''),
    ]);
  });

  it('substitutes <rootDir> tokens', () => {
    const {options} = normalize(
      {
        rootDir: '/root/path/foo',
        testPathIgnorePatterns: ['hasNoToken', '<rootDir>/hasAToken'],
      },
      {},
    );

    expect(options.testPathIgnorePatterns).toEqual([
      'hasNoToken',
      joinForPattern('', 'root', 'path', 'foo', 'hasAToken'),
    ]);
  });
});

describe('modulePathIgnorePatterns', () => {
  it('does not normalize paths relative to rootDir', () => {
    // This is a list of patterns, so we can't assume any of them are
    // directories
    const {options} = normalize(
      {
        modulePathIgnorePatterns: ['bar/baz', 'qux/quux'],
        rootDir: '/root/path/foo',
      },
      {},
    );

    expect(options.modulePathIgnorePatterns).toEqual([
      joinForPattern('bar', 'baz'),
      joinForPattern('qux', 'quux'),
    ]);
  });

  it('does not normalize trailing slashes', () => {
    // This is a list of patterns, so we can't assume any of them are
    // directories
    const {options} = normalize(
      {
        modulePathIgnorePatterns: ['bar/baz', 'qux/quux/'],
        rootDir: '/root/path/foo',
      },
      {},
    );

    expect(options.modulePathIgnorePatterns).toEqual([
      joinForPattern('bar', 'baz'),
      joinForPattern('qux', 'quux', ''),
    ]);
  });

  it('substitutes <rootDir> tokens', () => {
    const {options} = normalize(
      {
        modulePathIgnorePatterns: ['hasNoToken', '<rootDir>/hasAToken'],
        rootDir: '/root/path/foo',
      },
      {},
    );

    expect(options.modulePathIgnorePatterns).toEqual([
      'hasNoToken',
      joinForPattern('', 'root', 'path', 'foo', 'hasAToken'),
    ]);
  });
});

describe('testRunner', () => {
  it('defaults to Jasmine 2', () => {
    const {options} = normalize(
      {
        rootDir: '/root/path/foo',
      },
      {},
    );

    expect(options.testRunner).toMatch('jasmine2');
  });

  it('is overwritten by argv', () => {
    const Resolver = require('jest-resolve');
    Resolver.findNodeModule = jest.fn(name => name);
    const {options} = normalize(
      {
        rootDir: '/root/path/foo',
      },
      {
        testRunner: 'jasmine1',
      },
    );

    expect(options.testRunner).toBe('jasmine1');
  });
});

describe('coverageDirectory', () => {
  it('defaults to <rootDir>/coverage', () => {
    const {options} = normalize(
      {
        rootDir: '/root/path/foo',
      },
      {},
    );

    expect(options.coverageDirectory).toBe('/root/path/foo/coverage');
  });
});

describe('testEnvironment', () => {
  let Resolver;
  beforeEach(() => {
    Resolver = require('jest-resolve');
    Resolver.findNodeModule = jest.fn(name => {
      if (name === 'jsdom') {
        return 'node_modules/jsdom';
      }
      if (name === 'jest-environment-jsdom') {
        return 'node_modules/jest-environment-jsdom';
      }
      if (name.startsWith('/root')) {
        return name;
      }
      return findNodeModule(name);
    });
  });

  it('resolves to an environment and prefers jest-environment-`name`', () => {
    const {options} = normalize(
      {
        rootDir: '/root',
        testEnvironment: 'jsdom',
      },
      {},
    );

    expect(options.testEnvironment).toEqual(
      'node_modules/jest-environment-jsdom',
    );
  });

  it('throws on invalid environment names', () => {
    expect(() =>
      normalize(
        {
          rootDir: '/root',
          testEnvironment: 'phantom',
        },
        {},
      ),
    ).toThrowErrorMatchingSnapshot();
  });

  it('works with rootDir', () => {
    const {options} = normalize(
      {
        rootDir: '/root',
        testEnvironment: '<rootDir>/testEnvironment.js',
      },
      {},
    );

    expect(options.testEnvironment).toEqual('/root/testEnvironment.js');
  });
});

describe('babel-jest', () => {
  let Resolver;
  beforeEach(() => {
    Resolver = require('jest-resolve');
    Resolver.findNodeModule = jest.fn(
      name => path.sep + 'node_modules' + path.sep + name,
    );
  });

  it('correctly identifies and uses babel-jest', () => {
    const {options} = normalize(
      {
        rootDir: '/root',
      },
      {},
    );

    expect(options.transform[0][0]).toBe(DEFAULT_JS_PATTERN);
    expect(options.transform[0][1]).toEqual(
      path.sep + 'node_modules' + path.sep + 'babel-jest',
    );
    expect(options.setupFiles).toEqual([
      path.sep +
        'node_modules' +
        path.sep +
        'regenerator-runtime' +
        path.sep +
        'runtime',
    ]);
  });

  it('uses babel-jest if babel-jest is explicitly specified in a custom transform options', () => {
    const customJSPattern = '^.+\\.js$';
    const {options} = normalize(
      {
        rootDir: '/root',
        transform: {
          [customJSPattern]: 'babel-jest',
        },
      },
      {},
    );

    expect(options.transform[0][0]).toBe(customJSPattern);
    expect(options.transform[0][1]).toEqual('/node_modules/babel-jest');
    expect(options.setupFiles).toEqual([
      path.sep +
        'node_modules' +
        path.sep +
        'regenerator-runtime' +
        path.sep +
        'runtime',
    ]);
  });

  it(`doesn't use babel-jest if its not available`, () => {
    Resolver.findNodeModule = findNodeModule;

    const {options} = normalize(
      {
        rootDir: '/root',
      },
      {},
    );

    expect(options.transform).toEqual(undefined);
    expect(options.setupFiles).toEqual([]);
  });

  it('uses regenerator if babel-jest is explicitly specified', () => {
    const ROOT_DIR = '<rootDir>' + path.sep;

    const {options} = normalize(
      {
        rootDir: '/root',
        transform: {
          [DEFAULT_JS_PATTERN]:
            ROOT_DIR + Resolver.findNodeModule('babel-jest'),
        },
      },
      {},
    );

    expect(options.setupFiles).toEqual([
      path.sep +
        'node_modules' +
        path.sep +
        'regenerator-runtime' +
        path.sep +
        'runtime',
    ]);
  });
});

describe('Upgrade help', () => {
  let consoleWarn;

  beforeEach(() => {
    consoleWarn = console.warn;
    console.warn = jest.fn();

    const Resolver = require('jest-resolve');
    Resolver.findNodeModule = jest.fn(name => {
      if (name == 'bar/baz') {
        return '/node_modules/bar/baz';
      }
      return findNodeModule(name);
    });
  });

  afterEach(() => {
    console.warn = consoleWarn;
  });

  it('logs a warning when `scriptPreprocessor` and/or `preprocessorIgnorePatterns` are used', () => {
    const {options: options, hasDeprecationWarnings} = normalize(
      {
        preprocessorIgnorePatterns: ['bar/baz', 'qux/quux'],
        rootDir: '/root/path/foo',
        scriptPreprocessor: 'bar/baz',
      },
      {},
    );

    expect(options.transform).toEqual([['.*', '/node_modules/bar/baz']]);
    expect(options.transformIgnorePatterns).toEqual([
      joinForPattern('bar', 'baz'),
      joinForPattern('qux', 'quux'),
    ]);

    expect(options.scriptPreprocessor).toBe(undefined);
    expect(options.preprocessorIgnorePatterns).toBe(undefined);
    expect(hasDeprecationWarnings).toBeTruthy();

    expect(console.warn.mock.calls[0][0]).toMatchSnapshot();
  });
});

describe('testMatch', () => {
  it('testMatch default not applied if testRegex is set', () => {
    const {options} = normalize(
      {
        rootDir: '/root',
        testRegex: '.*',
      },
      {},
    );

    expect(options.testMatch.length).toBe(0);
  });

  it('testRegex default not applied if testMatch is set', () => {
    const {options} = normalize(
      {
        rootDir: '/root',
        testMatch: ['**/*.js'],
      },
      {},
    );

    expect(options.testRegex).toBe('');
  });

  it('throws if testRegex and testMatch are both specified', () => {
    expect(() => {
      normalize(
        {
          rootDir: '/root',
          testMatch: ['**/*.js'],
          testRegex: '.*',
        },
        {},
      );
    }).toThrowErrorMatchingSnapshot();
  });

  it('normalizes testMatch', () => {
    const {options} = normalize(
      {
        rootDir: '/root',
        testMatch: ['<rootDir>/**/*.js'],
      },
      {},
    );

    expect(options.testMatch).toEqual(['/root/**/*.js']);
  });
});

describe('moduleDirectories', () => {
  it('defaults to node_modules', () => {
    const {options} = normalize({rootDir: '/root'}, {});

    expect(options.moduleDirectories).toEqual(['node_modules']);
  });

  it('normalizes moduleDirectories', () => {
    const {options} = normalize(
      {
        moduleDirectories: ['<rootDir>/src', '<rootDir>/node_modules'],
        rootDir: '/root',
      },
      {},
    );

    expect(options.moduleDirectories).toEqual([
      '/root/src',
      '/root/node_modules',
    ]);
  });
});

describe('preset', () => {
  beforeEach(() => {
    const Resolver = require('jest-resolve');
    Resolver.findNodeModule = jest.fn(name => {
      if (name === 'react-native/jest-preset.json') {
        return '/node_modules/react-native/jest-preset.json';
      }
      return '/node_modules/' + name;
    });
    jest.doMock(
      '/node_modules/react-native/jest-preset.json',
      () => ({
        moduleNameMapper: {b: 'b'},
        modulePathIgnorePatterns: ['b'],
        setupFiles: ['b'],
        transform: {b: 'b'},
      }),
      {virtual: true},
    );
  });

  afterEach(() => {
    jest.dontMock('/node_modules/react-native/jest-preset.json');
  });

  test('throws when preset not found', () => {
    expect(() => {
      normalize(
        {
          preset: 'doesnt-exist',
          rootDir: '/root/path/foo',
        },
        {},
      );
    }).toThrowErrorMatchingSnapshot();
  });

  test('throws when preset is invalid', () => {
    jest.doMock('/node_modules/react-native/jest-preset.json', () =>
      require.requireActual('./jest-preset.json'),
    );

    expect(() => {
      normalize(
        {
          preset: 'react-native',
          rootDir: '/root/path/foo',
        },
        {},
      );
    }).toThrowErrorMatchingSnapshot();
  });

  test('works with "react-native"', () => {
    expect(() => {
      normalize(
        {
          preset: 'react-native',
          rootDir: '/root/path/foo',
        },
        {},
      );
    }).not.toThrow();
  });

  test('merges with options', () => {
    const {options} = normalize(
      {
        moduleNameMapper: {a: 'a'},
        modulePathIgnorePatterns: ['a'],
        preset: 'react-native',
        rootDir: '/root/path/foo',
        setupFiles: ['a'],
        transform: {a: 'a'},
      },
      {},
    );

    expect(options.moduleNameMapper).toEqual([['a', 'a'], ['b', 'b']]);
    expect(options.modulePathIgnorePatterns).toEqual(['b', 'a']);
    expect(options.setupFiles.sort()).toEqual([
      '/node_modules/a',
      '/node_modules/b',
    ]);
    expect(options.transform).toEqual([
      ['a', '/node_modules/a'],
      ['b', '/node_modules/b'],
    ]);
  });

  test('merges with options and moduleNameMapper preset is overridden by options', () => {
    // Object initializer not used for properties as a workaround for
    //  sort-keys eslint rule while specifying properties in
    //  non-alphabetical order for a better test
    const moduleNameMapper = {};
    moduleNameMapper.e = 'ee';
    moduleNameMapper.b = 'bb';
    moduleNameMapper.c = 'cc';
    moduleNameMapper.a = 'aa';
    const {options} = normalize(
      {
        moduleNameMapper,
        preset: 'react-native',
        rootDir: '/root/path/foo',
      },
      {},
    );

    expect(options.moduleNameMapper).toEqual([
      ['e', 'ee'],
      ['b', 'bb'],
      ['c', 'cc'],
      ['a', 'aa'],
    ]);
  });

  test('merges with options and transform preset is overridden by options', () => {
    /* eslint-disable sort-keys */
    const transform = {
      e: 'ee',
      b: 'bb',
      c: 'cc',
      a: 'aa',
    };
    /* eslint-disable sort-keys */
    const {options} = normalize(
      {
        preset: 'react-native',
        rootDir: '/root/path/foo',
        transform,
      },
      {},
    );

    expect(options.transform).toEqual([
      ['e', '/node_modules/ee'],
      ['b', '/node_modules/bb'],
      ['c', '/node_modules/cc'],
      ['a', '/node_modules/aa'],
    ]);
  });
});

describe('preset without setupFiles', () => {
  let Resolver;
  beforeEach(() => {
    Resolver = require('jest-resolve');
    Resolver.findNodeModule = jest.fn(
      name => path.sep + 'node_modules' + path.sep + name,
    );
  });

  beforeAll(() => {
    jest.doMock(
      '/node_modules/react-foo/jest-preset.json',
      () => {
        return {
          moduleNameMapper: {b: 'b'},
          modulePathIgnorePatterns: ['b'],
        };
      },
      {virtual: true},
    );
  });

  afterAll(() => {
    jest.dontMock('/node_modules/react-foo/jest-preset.json');
  });

  it('should normalize setupFiles correctly', () => {
    const {options} = normalize(
      {
        preset: 'react-foo',
        rootDir: '/root/path/foo',
        setupFiles: ['a'],
      },
      {},
    );

    expect(options).toEqual(
      expect.objectContaining({
        setupFiles: [
          '/node_modules/regenerator-runtime/runtime',
          '/node_modules/a',
        ],
      }),
    );
  });
});

describe('watchPlugins', () => {
  let Resolver;
  beforeEach(() => {
    Resolver = require('jest-resolve');
    Resolver.findNodeModule = jest.fn(name => {
      if (name.startsWith(path.sep)) {
        return name;
      }
      return path.sep + 'node_modules' + path.sep + name;
    });
  });

  it('defaults to undefined', () => {
    const {options} = normalize({rootDir: '/root'}, {});

    expect(options.watchPlugins).toEqual(undefined);
  });

  it('normalizes watchPlugins', () => {
    const {options} = normalize(
      {
        rootDir: '/root/',
        watchPlugins: ['my-watch-plugin', '<rootDir>/path/to/plugin'],
      },
      {},
    );

    expect(options.watchPlugins).toEqual([
      '/node_modules/my-watch-plugin',
      '/root/path/to/plugin',
    ]);
  });
});

describe('testPathPattern', () => {
  const initialOptions = {rootDir: '/root'};
  const consoleLog = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = consoleLog;
  });

  it('defaults to empty', () => {
    const {options} = normalize(initialOptions, {});
    expect(options.testPathPattern).toBe('');
  });

  const cliOptions = [
    {name: '--testPathPattern', property: 'testPathPattern'},
    {name: '<regexForTestFiles>', property: '_'},
  ];
  for (const opt of cliOptions) {
    describe(opt.name, () => {
      it('uses ' + opt.name + ' if set', () => {
        const argv = {[opt.property]: ['a/b']};
        const {options} = normalize(initialOptions, argv);

        expect(options.testPathPattern).toBe('a/b');
      });

      it('ignores invalid regular expressions and logs a warning', () => {
        const argv = {[opt.property]: ['a(']};
        const {options} = normalize(initialOptions, argv);

        expect(options.testPathPattern).toBe('');
        expect(console.log.mock.calls[0][0]).toMatchSnapshot();
      });

      it('joins multiple ' + opt.name + ' if set', () => {
        const argv = {testPathPattern: ['a/b', 'c/d']};
        const {options} = normalize(initialOptions, argv);

        expect(options.testPathPattern).toBe('a/b|c/d');
      });

      describe('posix', () => {
        it('should not escape the pattern', () => {
          const argv = {[opt.property]: ['a\\/b', 'a/b', 'a\\b', 'a\\\\b']};
          const {options} = normalize(initialOptions, argv);

          expect(options.testPathPattern).toBe('a\\/b|a/b|a\\b|a\\\\b');
        });
      });

      describe('win32', () => {
        beforeEach(() => {
          jest.mock('path', () => require.requireActual('path').win32);
          require('jest-resolve').findNodeModule = findNodeModule;
        });

        afterEach(() => {
          jest.resetModules();
        });

        it('preserves any use of "\\"', () => {
          const argv = {[opt.property]: ['a\\b', 'c\\\\d']};
          const {options} = require('../normalize').default(
            initialOptions,
            argv,
          );

          expect(options.testPathPattern).toBe('a\\b|c\\\\d');
        });

        it('replaces POSIX path separators', () => {
          const argv = {[opt.property]: ['a/b']};
          const {options} = require('../normalize').default(
            initialOptions,
            argv,
          );

          expect(options.testPathPattern).toBe('a\\\\b');
        });

        it('replaces POSIX paths in multiple args', () => {
          const argv = {[opt.property]: ['a/b', 'c/d']};
          const {options} = require('../normalize').default(
            initialOptions,
            argv,
          );

          expect(options.testPathPattern).toBe('a\\\\b|c\\\\d');
        });
      });
    });
  }

  it('joins multiple --testPathPatterns and <regexForTestFiles>', () => {
    const {options} = normalize(initialOptions, {
      _: ['a', 'b'],
      testPathPattern: ['c', 'd'],
    });
    expect(options.testPathPattern).toBe('a|b|c|d');
  });

  it('gives precedence to --all', () => {
    const {options} = normalize(initialOptions, {
      all: true,
      onlyChanged: true,
    });

    expect(options.onlyChanged).toBe(false);
  });
});
