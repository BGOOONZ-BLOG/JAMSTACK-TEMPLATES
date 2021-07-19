/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const moduleNameMapper = {
  '\\.css$': '<rootDir>/__mocks__/ManuallyMocked',
  '^[./a-zA-Z0-9$_-]+.png$': 'RelativeImageStub',
  '^image![a-zA-Z0-9$_-]+$': 'global_image_stub',
  mappedToDirectory: '<rootDir>/MyDirectoryModule',
  mappedToModule: '<rootDir>/TestModuleNameMapperResolution',
  mappedToPath: '<rootDir>/global_image_stub.js',
  'module/name/(.*)': '<rootDir>/mapped_module_$1.js',
};

let createRuntime;

beforeEach(() => {
  createRuntime = require('createRuntime');
});

it('mocks modules by default when using automocking', () =>
  createRuntime(__filename, {
    automock: true,
    moduleNameMapper,
  }).then(runtime => {
    const exports = runtime.requireModuleOrMock(
      runtime.__mockRootPath,
      'RegularModule',
    );
    expect(exports.setModuleStateValue._isMockFunction).toBe(true);
  }));

it(`doesn't mock modules when explicitly unmocked when using automocking`, () =>
  createRuntime(__filename, {
    automock: true,
    moduleNameMapper,
  }).then(runtime => {
    const root = runtime.requireModule(runtime.__mockRootPath);
    root.jest.unmock('RegularModule');
    const exports = runtime.requireModuleOrMock(
      runtime.__mockRootPath,
      'RegularModule',
    );
    expect(exports.isRealModule).toBe(true);
  }));

it(`doesn't mock modules when explicitly unmocked via a different name`, () =>
  createRuntime(__filename, {
    automock: true,
    moduleNameMapper,
  }).then(runtime => {
    const root = runtime.requireModule(runtime.__mockRootPath);
    root.jest.unmock('./RegularModule');
    const exports = runtime.requireModuleOrMock(
      runtime.__mockRootPath,
      'RegularModule',
    );
    expect(exports.isRealModule).toBe(true);
  }));

it(`doesn't mock modules when disableAutomock() has been called`, () =>
  createRuntime(__filename, {moduleNameMapper}).then(runtime => {
    const root = runtime.requireModule(runtime.__mockRootPath);
    root.jest.disableAutomock();
    const exports = runtime.requireModuleOrMock(
      runtime.__mockRootPath,
      'RegularModule',
    );
    expect(exports.isRealModule).toBe(true);
  }));

it('uses manual mock when automocking on and mock is available', () =>
  createRuntime(__filename, {
    automock: true,
    moduleNameMapper,
  }).then(runtime => {
    const exports = runtime.requireModuleOrMock(
      runtime.__mockRootPath,
      'ManuallyMocked',
    );
    expect(exports.isManualMockModule).toBe(true);
  }));

it('does not use manual mock when automocking is off and a real module is available', () =>
  createRuntime(__filename, {moduleNameMapper}).then(runtime => {
    const root = runtime.requireModule(runtime.__mockRootPath);
    root.jest.disableAutomock();
    const exports = runtime.requireModuleOrMock(
      runtime.__mockRootPath,
      'ManuallyMocked',
    );
    expect(exports.isManualMockModule).toBe(false);
  }));

it('resolves mapped module names and unmocks them by default', () =>
  createRuntime(__filename, {
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper,
  }).then(runtime => {
    let exports = runtime.requireModuleOrMock(
      runtime.__mockRootPath,
      'image!not_really_a_module',
    );
    expect(exports.isGlobalImageStub).toBe(true);

    exports = runtime.requireModuleOrMock(
      runtime.__mockRootPath,
      'mappedToPath',
    );
    expect(exports.isGlobalImageStub).toBe(true);

    exports = runtime.requireModuleOrMock(
      runtime.__mockRootPath,
      'mappedToModule',
    );
    expect(exports.moduleNameMapperResolutionWorks).toBe(true);

    exports = runtime.requireModuleOrMock(
      runtime.__mockRootPath,
      'mappedToDirectory',
    );
    expect(exports.isIndex).toBe(true);

    exports = runtime.requireModuleOrMock(runtime.__mockRootPath, 'cat.png');
    expect(exports.isRelativeImageStub).toBe(true);

    exports = runtime.requireModuleOrMock(
      runtime.__mockRootPath,
      '../photos/dog.png',
    );
    expect(exports.isRelativeImageStub).toBe(true);

    exports = runtime.requireModuleOrMock(
      runtime.__mockRootPath,
      'module/name/test',
    );
    expect(exports).toBe('mapped_module');

    exports = runtime.requireModuleOrMock(
      runtime.__mockRootPath,
      'subdir1/style.css',
    );
    expect(exports.isManualMockModule).toBe(true);
  }));

it('automocking is disabled by default', () =>
  createRuntime(__filename, {
    moduleNameMapper,
  }).then(runtime => {
    const exports = runtime.requireModuleOrMock(
      runtime.__mockRootPath,
      'RegularModule',
    );
    expect(exports.setModuleStateValue._isMockFunction).toBe(undefined);
  }));

it('unmocks modules in config.unmockedModulePathPatterns for tests with automock enabled when automock is false', () =>
  createRuntime(__filename, {
    automock: false,
    moduleNameMapper,
    unmockedModulePathPatterns: ['npm3-main-dep'],
  }).then(runtime => {
    const root = runtime.requireModule(runtime.__mockRootPath);
    root.jest.enableAutomock();
    const nodeModule = runtime.requireModuleOrMock(
      runtime.__mockRootPath,
      'npm3-main-dep',
    );
    const moduleData = nodeModule();
    expect(moduleData.isUnmocked()).toBe(true);
  }));
