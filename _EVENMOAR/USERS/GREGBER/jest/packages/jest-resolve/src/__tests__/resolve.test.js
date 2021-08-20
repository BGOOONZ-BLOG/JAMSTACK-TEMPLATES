/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

jest.mock('../__mocks__/userResolver');

const fs = require('fs');
const path = require('path');
const ModuleMap = require('jest-haste-map').ModuleMap;
const Resolver = require('../');
const userResolver = require('../__mocks__/userResolver');
const nodeModulesPaths = require('../node_modules_paths').default;

beforeEach(() => {
  userResolver.mockClear();
});

describe('isCoreModule', () => {
  it('returns false if `hasCoreModules` is false.', () => {
    const moduleMap = new ModuleMap();
    const resolver = new Resolver(moduleMap, {
      hasCoreModules: false,
    });
    const isCore = resolver.isCoreModule('assert');
    expect(isCore).toEqual(false);
  });

  it('returns true if `hasCoreModules` is true and `moduleName` is a core module.', () => {
    const moduleMap = new ModuleMap();
    const resolver = new Resolver(moduleMap, {});
    const isCore = resolver.isCoreModule('assert');
    expect(isCore).toEqual(true);
  });

  it('returns false if `hasCoreModules` is true and `moduleName` is not a core module.', () => {
    const moduleMap = new ModuleMap();
    const resolver = new Resolver(moduleMap, {});
    const isCore = resolver.isCoreModule('not-a-core-module');
    expect(isCore).toEqual(false);
  });
});

describe('findNodeModule', () => {
  it('is possible to override the default resolver', () => {
    const cwd = process.cwd();
    const resolvedCwd = fs.realpathSync(cwd) || cwd;
    const nodePaths = process.env.NODE_PATH
      ? process.env.NODE_PATH.split(path.delimiter)
          .filter(Boolean)
          .map(p => path.resolve(resolvedCwd, p))
      : null;

    userResolver.mockImplementation(() => 'module');

    const newPath = Resolver.findNodeModule('test', {
      basedir: '/',
      browser: true,
      extensions: ['js'],
      moduleDirectory: ['node_modules'],
      paths: ['/something'],
      resolver: require.resolve('../__mocks__/userResolver'),
    });

    expect(newPath).toBe('module');
    expect(userResolver.mock.calls[0][0]).toBe('test');
    expect(userResolver.mock.calls[0][1]).toEqual({
      basedir: '/',
      browser: true,
      extensions: ['js'],
      moduleDirectory: ['node_modules'],
      paths: (nodePaths || []).concat(['/something']),
    });
  });
});

describe('resolveModule', () => {
  let moduleMap;
  beforeEach(() => {
    moduleMap = new ModuleMap({
      duplicates: [],
      map: [],
      mocks: [],
    });
  });

  it('is possible to resolve node modules', () => {
    const resolver = new Resolver(moduleMap, {
      extensions: ['.js'],
    });
    const src = require.resolve('../');
    const resolved = resolver.resolveModule(
      src,
      './__mocks__/mockJsDependency',
    );
    expect(resolved).toBe(require.resolve('../__mocks__/mockJsDependency.js'));
  });

  it('is possible to resolve node modules with custom extensions', () => {
    const resolver = new Resolver(moduleMap, {
      extensions: ['.js', '.jsx'],
    });
    const src = require.resolve('../');
    const resolvedJsx = resolver.resolveModule(
      src,
      './__mocks__/mockJsxDependency',
    );
    expect(resolvedJsx).toBe(
      require.resolve('../__mocks__/mockJsxDependency.jsx'),
    );
  });

  it('is possible to resolve node modules with custom extensions and platforms', () => {
    const resolver = new Resolver(moduleMap, {
      extensions: ['.js', '.jsx'],
      platforms: ['native'],
    });
    const src = require.resolve('../');
    const resolvedJsx = resolver.resolveModule(
      src,
      './__mocks__/mockJsxDependency',
    );
    expect(resolvedJsx).toBe(
      require.resolve('../__mocks__/mockJsxDependency.native.jsx'),
    );
  });

  it('is possible to resolve node modules by resolving their realpath', () => {
    const resolver = new Resolver(moduleMap, {
      extensions: ['.js'],
    });
    const src = require.resolve(
      '../../src/__mocks__/bar/node_modules/foo/index.js',
    );
    const resolved = resolver.resolveModule(src, 'dep');
    expect(resolved).toBe(
      require.resolve('../../src/__mocks__/foo/node_modules/dep/index.js'),
    );
  });
});

describe('getMockModule', () => {
  it('is possible to use custom resolver to resolve deps inside mock modules with moduleNameMapper', () => {
    userResolver.mockImplementation(() => 'module');

    const moduleMap = new ModuleMap({
      duplicates: [],
      map: [],
      mocks: [],
    });
    const resolver = new Resolver(moduleMap, {
      moduleNameMapper: [
        {
          moduleName: '$1',
          regex: /(.*)/,
        },
      ],
      resolver: require.resolve('../__mocks__/userResolver'),
    });
    const src = require.resolve('../');
    resolver.getMockModule(src, 'dependentModule');

    expect(userResolver).toHaveBeenCalled();
    expect(userResolver.mock.calls[0][0]).toBe('dependentModule');
    expect(userResolver.mock.calls[0][1]).toHaveProperty(
      'basedir',
      path.dirname(src),
    );
  });

  it('is possible to use custom resolver to resolve deps inside mock modules without moduleNameMapper', () => {
    userResolver.mockImplementation(() => 'module');

    const moduleMap = new ModuleMap({
      duplicates: [],
      map: [],
      mocks: [],
    });
    const resolver = new Resolver(moduleMap, {
      resolver: require.resolve('../__mocks__/userResolver'),
    });
    const src = require.resolve('../');
    resolver.getMockModule(src, 'dependentModule');

    expect(userResolver).toHaveBeenCalled();
    expect(userResolver.mock.calls[0][0]).toBe('dependentModule');
    expect(userResolver.mock.calls[0][1]).toHaveProperty(
      'basedir',
      path.dirname(src),
    );
  });
});

describe('nodeModulesPaths', () => {
  it('provides custom module paths after node_modules', () => {
    const src = require.resolve('../');
    const result = nodeModulesPaths(src, {paths: ['./customFolder']});
    expect(result[result.length - 1]).toBe('./customFolder');
  });
});

describe('Resolver.getModulePaths() -> nodeModulesPaths()', () => {
  const _path = path;
  let moduleMap;

  beforeEach(() => {
    jest.resetModules();

    moduleMap = new ModuleMap({
      duplicates: [],
      map: [],
      mocks: [],
    });

    // Mocking realpath to function the old way, where it just looks at
    // pathstrings instead of actually trying to access the physical directory.
    // This test suite won't work otherwise, since we cannot make assumptions
    // about the test environment when it comes to absolute paths.
    jest.doMock('realpath-native', () => {
      return {
        sync: dirInput => dirInput,
      };
    });
  });

  afterAll(() => {
    jest.resetModules();
    jest.dontMock('path');
  });

  it('can resolve node modules relative to absolute paths in "moduleDirectories" on Windows platforms', () => {
    jest.doMock('path', () => _path.win32);
    const path = require('path');
    const Resolver = require('../');

    const cwd = 'D:\\temp\\project';
    const src = 'C:\\path\\to\\node_modules';
    const resolver = new Resolver(moduleMap, {
      moduleDirectories: [src, 'node_modules'],
    });
    const dirs_expected = [
      src,
      cwd + '\\node_modules',
      path.dirname(cwd) + '\\node_modules',
      'D:\\node_modules',
    ];
    const dirs_actual = resolver.getModulePaths(cwd);
    expect(dirs_actual).toEqual(expect.arrayContaining(dirs_expected));
  });

  it('can resolve node modules relative to absolute paths in "moduleDirectories" on Posix platforms', () => {
    jest.doMock('path', () => _path.posix);
    const path = require('path');
    const Resolver = require('../');

    const cwd = '/temp/project';
    const src = '/path/to/node_modules';
    const resolver = new Resolver(moduleMap, {
      moduleDirectories: [src, 'node_modules'],
    });
    const dirs_expected = [
      src,
      cwd + '/node_modules',
      path.dirname(cwd) + '/node_modules',
      '/node_modules',
    ];
    const dirs_actual = resolver.getModulePaths(cwd);
    expect(dirs_actual).toEqual(expect.arrayContaining(dirs_expected));
  });
});
