/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Console} from 'console';
import type {Argv} from 'types/Argv';
import type {Glob, Path, ProjectConfig} from 'types/Config';
import type {Environment} from 'types/Environment';
import type {Context} from 'types/Context';
import type {Jest, LocalModuleRequire} from 'types/Jest';
import type {ModuleMap} from 'jest-haste-map';
import type {MockFunctionMetadata, ModuleMocker} from 'types/Mock';
import type {SourceMapRegistry} from 'types/SourceMaps';

import path from 'path';
import HasteMap from 'jest-haste-map';
import Resolver from 'jest-resolve';
import {createDirectory, deepCyclicCopy} from 'jest-util';
import {escapePathForRegex} from 'jest-regex-util';
import fs from 'graceful-fs';
import stripBOM from 'strip-bom';
import ScriptTransformer from './script_transformer';
import shouldInstrument from './should_instrument';
import {run as cilRun} from './cli';
import {options as cliOptions} from './cli/args';

type Module = {|
  children: Array<Module>,
  exports: any,
  filename: string,
  id: string,
  loaded: boolean,
  parent?: Module,
  paths?: Array<Path>,
  require?: (id: string) => any,
|};

type HasteMapOptions = {|
  console?: Console,
  maxWorkers: number,
  resetCache: boolean,
  watch?: boolean,
  watchman: boolean,
|};

type InternalModuleOptions = {|
  isInternalModule: boolean,
|};

type CoverageOptions = {
  collectCoverage: boolean,
  collectCoverageFrom: Array<Glob>,
  collectCoverageOnlyFrom: ?{[key: string]: boolean, __proto__: null},
};

type ModuleRegistry = {[key: string]: Module, __proto__: null};

type BooleanObject = {[key: string]: boolean, __proto__: null};
type CacheFS = {[path: Path]: string, __proto__: null};

const NODE_MODULES = path.sep + 'node_modules' + path.sep;
const SNAPSHOT_EXTENSION = 'snap';

const getModuleNameMapper = (config: ProjectConfig) => {
  if (
    Array.isArray(config.moduleNameMapper) &&
    config.moduleNameMapper.length
  ) {
    return config.moduleNameMapper.map(([regex, moduleName]) => {
      return {moduleName, regex: new RegExp(regex)};
    });
  }
  return null;
};

const unmockRegExpCache = new WeakMap();

class Runtime {
  static ScriptTransformer: Class<ScriptTransformer>;

  _cacheFS: CacheFS;
  _config: ProjectConfig;
  _coverageOptions: CoverageOptions;
  _currentlyExecutingModulePath: string;
  _environment: Environment;
  _explicitShouldMock: BooleanObject;
  _internalModuleRegistry: ModuleRegistry;
  _isCurrentlyExecutingManualMock: ?string;
  _mockFactories: {[key: string]: () => any, __proto__: null};
  _mockMetaDataCache: {[key: string]: MockFunctionMetadata, __proto__: null};
  _mockRegistry: {[key: string]: any, __proto__: null};
  _moduleMocker: ModuleMocker;
  _moduleRegistry: ModuleRegistry;
  _needsCoverageMapped: Set<string>;
  _resolver: Resolver;
  _shouldAutoMock: boolean;
  _shouldMockModuleCache: BooleanObject;
  _shouldUnmockTransitiveDependenciesCache: BooleanObject;
  _sourceMapRegistry: SourceMapRegistry;
  _scriptTransformer: ScriptTransformer;
  _transitiveShouldMock: BooleanObject;
  _unmockList: ?RegExp;
  _virtualMocks: BooleanObject;

  constructor(
    config: ProjectConfig,
    environment: Environment,
    resolver: Resolver,
    cacheFS?: CacheFS,
    coverageOptions?: CoverageOptions,
  ) {
    this._cacheFS = cacheFS || Object.create(null);
    this._config = config;
    this._coverageOptions = coverageOptions || {
      collectCoverage: false,
      collectCoverageFrom: [],
      collectCoverageOnlyFrom: null,
    };
    this._currentlyExecutingModulePath = '';
    this._environment = environment;
    this._explicitShouldMock = Object.create(null);
    this._internalModuleRegistry = Object.create(null);
    this._isCurrentlyExecutingManualMock = null;
    this._mockFactories = Object.create(null);
    this._mockRegistry = Object.create(null);
    this._moduleMocker = this._environment.moduleMocker;
    this._moduleRegistry = Object.create(null);
    this._needsCoverageMapped = new Set();
    this._resolver = resolver;
    this._scriptTransformer = new ScriptTransformer(config);
    this._shouldAutoMock = config.automock;
    this._sourceMapRegistry = Object.create(null);
    this._virtualMocks = Object.create(null);

    this._mockMetaDataCache = Object.create(null);
    this._shouldMockModuleCache = Object.create(null);
    this._shouldUnmockTransitiveDependenciesCache = Object.create(null);
    this._transitiveShouldMock = Object.create(null);

    this._unmockList = unmockRegExpCache.get(config);
    if (!this._unmockList && config.unmockedModulePathPatterns) {
      this._unmockList = new RegExp(
        config.unmockedModulePathPatterns.join('|'),
      );
      unmockRegExpCache.set(config, this._unmockList);
    }

    if (config.automock) {
      config.setupFiles.forEach(filePath => {
        if (filePath && filePath.includes(NODE_MODULES)) {
          const moduleID = this._resolver.getModuleID(
            this._virtualMocks,
            filePath,
          );
          this._transitiveShouldMock[moduleID] = false;
        }
      });
    }

    this.resetModules();

    if (config.setupFiles.length) {
      for (let i = 0; i < config.setupFiles.length; i++) {
        this.requireModule(config.setupFiles[i]);
      }
    }
  }

  static shouldInstrument(
    filename: Path,
    options: CoverageOptions,
    config: ProjectConfig,
  ) {
    return shouldInstrument(
      filename,
      {
        collectCoverage: options.collectCoverage,
        collectCoverageFrom: options.collectCoverageFrom,
        collectCoverageOnlyFrom: options.collectCoverageOnlyFrom,
      },
      config,
    );
  }

  static createContext(
    config: ProjectConfig,
    options: {
      console?: Console,
      maxWorkers: number,
      watch?: boolean,
      watchman: boolean,
    },
  ): Promise<Context> {
    createDirectory(config.cacheDirectory);
    const instance = Runtime.createHasteMap(config, {
      console: options.console,
      maxWorkers: options.maxWorkers,
      resetCache: !config.cache,
      watch: options.watch,
      watchman: options.watchman,
    });
    return instance.build().then(
      hasteMap => ({
        config,
        hasteFS: hasteMap.hasteFS,
        moduleMap: hasteMap.moduleMap,
        resolver: Runtime.createResolver(config, hasteMap.moduleMap),
      }),
      error => {
        throw error;
      },
    );
  }

  static createHasteMap(
    config: ProjectConfig,
    options?: HasteMapOptions,
  ): HasteMap {
    const ignorePattern = new RegExp(
      [config.cacheDirectory].concat(config.modulePathIgnorePatterns).join('|'),
    );

    return new HasteMap({
      cacheDirectory: config.cacheDirectory,
      console: options && options.console,
      extensions: [SNAPSHOT_EXTENSION].concat(config.moduleFileExtensions),
      hasteImplModulePath: config.haste.hasteImplModulePath,
      ignorePattern,
      maxWorkers: (options && options.maxWorkers) || 1,
      mocksPattern: escapePathForRegex(path.sep + '__mocks__' + path.sep),
      name: config.name,
      platforms: config.haste.platforms || ['ios', 'android'],
      providesModuleNodeModules: config.haste.providesModuleNodeModules,
      resetCache: options && options.resetCache,
      retainAllFiles: false,
      roots: config.roots,
      useWatchman: options && options.watchman,
      watch: options && options.watch,
    });
  }

  static createResolver(config: ProjectConfig, moduleMap: ModuleMap): Resolver {
    return new Resolver(moduleMap, {
      browser: config.browser,
      defaultPlatform: config.haste.defaultPlatform,
      extensions: config.moduleFileExtensions.map(extension => '.' + extension),
      hasCoreModules: true,
      moduleDirectories: config.moduleDirectories,
      moduleNameMapper: getModuleNameMapper(config),
      modulePaths: config.modulePaths,
      platforms: config.haste.platforms,
      resolver: config.resolver,
      rootDir: config.rootDir,
    });
  }

  static runCLI(args?: Argv, info?: Array<string>) {
    return cilRun(args, info);
  }

  static getCLIOptions() {
    return cliOptions;
  }

  requireModule(
    from: Path,
    moduleName?: string,
    options: ?InternalModuleOptions,
  ) {
    const moduleID = this._resolver.getModuleID(
      this._virtualMocks,
      from,
      moduleName,
    );
    let modulePath;

    const moduleRegistry =
      !options || !options.isInternalModule
        ? this._moduleRegistry
        : this._internalModuleRegistry;

    // Some old tests rely on this mocking behavior. Ideally we'll change this
    // to be more explicit.
    const moduleResource = moduleName && this._resolver.getModule(moduleName);
    const manualMock =
      moduleName && this._resolver.getMockModule(from, moduleName);
    if (
      (!options || !options.isInternalModule) &&
      !moduleResource &&
      manualMock &&
      manualMock !== this._isCurrentlyExecutingManualMock &&
      this._explicitShouldMock[moduleID] !== false
    ) {
      modulePath = manualMock;
    }

    if (moduleName && this._resolver.isCoreModule(moduleName)) {
      return this._requireCoreModule(moduleName);
    }

    if (!modulePath) {
      modulePath = this._resolveModule(from, moduleName);
    }

    if (!moduleRegistry[modulePath]) {
      // We must register the pre-allocated module object first so that any
      // circular dependencies that may arise while evaluating the module can
      // be satisfied.
      const localModule: Module = {
        children: [],
        exports: {},
        filename: modulePath,
        id: modulePath,
        loaded: false,
      };
      moduleRegistry[modulePath] = localModule;
      if (path.extname(modulePath) === '.json') {
        localModule.exports = this._environment.global.JSON.parse(
          stripBOM(fs.readFileSync(modulePath, 'utf8')),
        );
      } else if (path.extname(modulePath) === '.node') {
        // $FlowFixMe
        localModule.exports = require(modulePath);
      } else {
        this._execModule(localModule, options, moduleRegistry, from);
      }

      localModule.loaded = true;
    }
    return moduleRegistry[modulePath].exports;
  }

  requireInternalModule(from: Path, to?: string) {
    return this.requireModule(from, to, {isInternalModule: true});
  }

  requireMock(from: Path, moduleName: string) {
    const moduleID = this._resolver.getModuleID(
      this._virtualMocks,
      from,
      moduleName,
    );

    if (this._mockRegistry[moduleID]) {
      return this._mockRegistry[moduleID];
    }

    if (moduleID in this._mockFactories) {
      return (this._mockRegistry[moduleID] = this._mockFactories[moduleID]());
    }

    let manualMock = this._resolver.getMockModule(from, moduleName);
    let modulePath;
    if (manualMock) {
      modulePath = this._resolveModule(from, manualMock);
    } else {
      modulePath = this._resolveModule(from, moduleName);
    }
    // If the actual module file has a __mocks__ dir sitting immediately next
    // to it, look to see if there is a manual mock for this file.
    //
    // subDir1/my_module.js
    // subDir1/__mocks__/my_module.js
    // subDir2/my_module.js
    // subDir2/__mocks__/my_module.js
    //
    // Where some other module does a relative require into each of the
    // respective subDir{1,2} directories and expects a manual mock
    // corresponding to that particular my_module.js file.
    const moduleDir = path.dirname(modulePath);
    const moduleFileName = path.basename(modulePath);
    const potentialManualMock = path.join(
      moduleDir,
      '__mocks__',
      moduleFileName,
    );
    if (fs.existsSync(potentialManualMock)) {
      manualMock = true;
      modulePath = potentialManualMock;
    }

    if (manualMock) {
      const localModule: Module = {
        children: [],
        exports: {},
        filename: modulePath,
        id: modulePath,
        loaded: false,
      };
      this._execModule(localModule, undefined, this._mockRegistry, from);
      this._mockRegistry[moduleID] = localModule.exports;
      localModule.loaded = true;
    } else {
      // Look for a real module to generate an automock from
      this._mockRegistry[moduleID] = this._generateMock(from, moduleName);
    }

    return this._mockRegistry[moduleID];
  }

  requireModuleOrMock(from: Path, moduleName: string) {
    if (this._shouldMock(from, moduleName)) {
      return this.requireMock(from, moduleName);
    } else {
      return this.requireModule(from, moduleName);
    }
  }

  resetModules() {
    this._mockRegistry = Object.create(null);
    this._moduleRegistry = Object.create(null);

    if (this._environment && this._environment.global) {
      const envGlobal = this._environment.global;
      Object.keys(envGlobal).forEach(key => {
        const globalMock = envGlobal[key];
        if (
          (typeof globalMock === 'object' && globalMock !== null) ||
          typeof globalMock === 'function'
        ) {
          globalMock._isMockFunction && globalMock.mockClear();
        }
      });

      if (envGlobal.mockClearTimers) {
        envGlobal.mockClearTimers();
      }
    }
  }

  getAllCoverageInfoCopy() {
    return deepCyclicCopy(this._environment.global.__coverage__);
  }

  getSourceMapInfo(coveredFiles: Set<string>) {
    return Object.keys(this._sourceMapRegistry).reduce((result, sourcePath) => {
      if (
        coveredFiles.has(sourcePath) &&
        this._needsCoverageMapped.has(sourcePath) &&
        fs.existsSync(this._sourceMapRegistry[sourcePath])
      ) {
        result[sourcePath] = this._sourceMapRegistry[sourcePath];
      }
      return result;
    }, {});
  }

  getSourceMaps(): SourceMapRegistry {
    return this._sourceMapRegistry;
  }

  setMock(
    from: string,
    moduleName: string,
    mockFactory: () => any,
    options?: {virtual: boolean},
  ) {
    if (options && options.virtual) {
      const mockPath = this._resolver.getModulePath(from, moduleName);
      this._virtualMocks[mockPath] = true;
    }
    const moduleID = this._resolver.getModuleID(
      this._virtualMocks,
      from,
      moduleName,
    );
    this._explicitShouldMock[moduleID] = true;
    this._mockFactories[moduleID] = mockFactory;
  }

  restoreAllMocks() {
    this._moduleMocker.restoreAllMocks();
  }

  resetAllMocks() {
    this._moduleMocker.resetAllMocks();
  }

  clearAllMocks() {
    this._moduleMocker.clearAllMocks();
  }

  _resolveModule(from: Path, to?: ?string) {
    return to ? this._resolver.resolveModule(from, to) : from;
  }

  _execModule(
    localModule: Module,
    options: ?InternalModuleOptions,
    moduleRegistry: ModuleRegistry,
    from: Path,
  ) {
    // If the environment was disposed, prevent this module from being executed.
    if (!this._environment.global) {
      return;
    }

    const isInternalModule = !!(options && options.isInternalModule);
    const filename = localModule.filename;
    const lastExecutingModulePath = this._currentlyExecutingModulePath;
    this._currentlyExecutingModulePath = filename;
    const origCurrExecutingManualMock = this._isCurrentlyExecutingManualMock;
    this._isCurrentlyExecutingManualMock = filename;

    const dirname = path.dirname(filename);
    localModule.children = [];

    Object.defineProperty(
      localModule,
      'parent',
      // https://github.com/facebook/flow/issues/285#issuecomment-270810619
      ({
        enumerable: true,
        get() {
          return moduleRegistry[from] || null;
        },
      }: Object),
    );

    localModule.paths = this._resolver.getModulePaths(dirname);
    Object.defineProperty(localModule, 'require', {
      value: this._createRequireImplementation(localModule, options),
    });

    const transformedFile = this._scriptTransformer.transform(
      filename,
      {
        collectCoverage: this._coverageOptions.collectCoverage,
        collectCoverageFrom: this._coverageOptions.collectCoverageFrom,
        collectCoverageOnlyFrom: this._coverageOptions.collectCoverageOnlyFrom,
        isInternalModule,
      },
      this._cacheFS[filename],
    );

    if (transformedFile.sourceMapPath) {
      this._sourceMapRegistry[filename] = transformedFile.sourceMapPath;
      if (transformedFile.mapCoverage) {
        this._needsCoverageMapped.add(filename);
      }
    }

    const wrapper = this._environment.runScript(transformedFile.script)[
      ScriptTransformer.EVAL_RESULT_VARIABLE
    ];
    wrapper.call(
      localModule.exports, // module context
      localModule, // module object
      localModule.exports, // module exports
      localModule.require, // require implementation
      dirname, // __dirname
      filename, // __filename
      this._environment.global, // global object
      this._createJestObjectFor(
        filename,
        // $FlowFixMe
        (localModule.require: LocalModuleRequire),
      ), // jest object
    );

    this._isCurrentlyExecutingManualMock = origCurrExecutingManualMock;
    this._currentlyExecutingModulePath = lastExecutingModulePath;
  }

  _requireCoreModule(moduleName: string) {
    if (moduleName === 'process') {
      return this._environment.global.process;
    }

    // $FlowFixMe
    return require(moduleName);
  }

  _generateMock(from: Path, moduleName: string) {
    const modulePath = this._resolveModule(from, moduleName);

    if (!(modulePath in this._mockMetaDataCache)) {
      // This allows us to handle circular dependencies while generating an
      // automock
      this._mockMetaDataCache[modulePath] = (this._moduleMocker.getMetadata(
        {},
      ): any);

      // In order to avoid it being possible for automocking to potentially
      // cause side-effects within the module environment, we need to execute
      // the module in isolation. This could cause issues if the module being
      // mocked has calls into side-effectful APIs on another module.
      const origMockRegistry = this._mockRegistry;
      const origModuleRegistry = this._moduleRegistry;
      this._mockRegistry = Object.create(null);
      this._moduleRegistry = Object.create(null);

      const moduleExports = this.requireModule(from, moduleName);

      // Restore the "real" module/mock registries
      this._mockRegistry = origMockRegistry;
      this._moduleRegistry = origModuleRegistry;

      const mockMetadata = this._moduleMocker.getMetadata(moduleExports);
      if (mockMetadata == null) {
        throw new Error(
          `Failed to get mock metadata: ${modulePath}\n\n` +
            `See: http://facebook.github.io/jest/docs/manual-mocks.html#content`,
        );
      }
      this._mockMetaDataCache[modulePath] = mockMetadata;
    }
    return this._moduleMocker.generateFromMetadata(
      this._mockMetaDataCache[modulePath],
    );
  }

  _shouldMock(from: Path, moduleName: string) {
    const mockPath = this._resolver.getModulePath(from, moduleName);
    if (mockPath in this._virtualMocks) {
      return true;
    }

    const explicitShouldMock = this._explicitShouldMock;
    const moduleID = this._resolver.getModuleID(
      this._virtualMocks,
      from,
      moduleName,
    );
    const key = from + path.delimiter + moduleID;

    if (moduleID in explicitShouldMock) {
      return explicitShouldMock[moduleID];
    }

    if (
      !this._shouldAutoMock ||
      this._resolver.isCoreModule(moduleName) ||
      this._shouldUnmockTransitiveDependenciesCache[key]
    ) {
      return false;
    }

    if (moduleID in this._shouldMockModuleCache) {
      return this._shouldMockModuleCache[moduleID];
    }

    let modulePath;
    try {
      modulePath = this._resolveModule(from, moduleName);
    } catch (e) {
      const manualMock = this._resolver.getMockModule(from, moduleName);
      if (manualMock) {
        this._shouldMockModuleCache[moduleID] = true;
        return true;
      }
      throw e;
    }

    if (this._unmockList && this._unmockList.test(modulePath)) {
      this._shouldMockModuleCache[moduleID] = false;
      return false;
    }

    // transitive unmocking for package managers that store flat packages (npm3)
    const currentModuleID = this._resolver.getModuleID(
      this._virtualMocks,
      from,
    );
    if (
      this._transitiveShouldMock[currentModuleID] === false ||
      (from.includes(NODE_MODULES) &&
        modulePath.includes(NODE_MODULES) &&
        ((this._unmockList && this._unmockList.test(from)) ||
          explicitShouldMock[currentModuleID] === false))
    ) {
      this._transitiveShouldMock[moduleID] = false;
      this._shouldUnmockTransitiveDependenciesCache[key] = true;
      return false;
    }

    return (this._shouldMockModuleCache[moduleID] = true);
  }

  _createRequireImplementation(
    from: Module,
    options: ?InternalModuleOptions,
  ): LocalModuleRequire {
    const moduleRequire =
      options && options.isInternalModule
        ? (moduleName: string) =>
            this.requireInternalModule(from.filename, moduleName)
        : this.requireModuleOrMock.bind(this, from.filename);
    moduleRequire.cache = Object.create(null);
    moduleRequire.extensions = Object.create(null);
    moduleRequire.requireActual = this.requireModule.bind(this, from.filename);
    moduleRequire.requireMock = this.requireMock.bind(this, from.filename);
    moduleRequire.resolve = moduleName =>
      this._resolveModule(from.filename, moduleName);
    Object.defineProperty(
      moduleRequire,
      'main',
      ({
        enumerable: true,
        get() {
          let mainModule = from.parent;
          while (
            mainModule &&
            mainModule.parent &&
            mainModule.id !== mainModule.parent.id
          ) {
            mainModule = mainModule.parent;
          }
          return mainModule;
        },
      }: Object),
    );
    return moduleRequire;
  }

  _createJestObjectFor(from: Path, localRequire: LocalModuleRequire): Jest {
    const disableAutomock = () => {
      this._shouldAutoMock = false;
      return jestObject;
    };
    const enableAutomock = () => {
      this._shouldAutoMock = true;
      return jestObject;
    };
    const unmock = (moduleName: string) => {
      const moduleID = this._resolver.getModuleID(
        this._virtualMocks,
        from,
        moduleName,
      );
      this._explicitShouldMock[moduleID] = false;
      return jestObject;
    };
    const deepUnmock = (moduleName: string) => {
      const moduleID = this._resolver.getModuleID(
        this._virtualMocks,
        from,
        moduleName,
      );
      this._explicitShouldMock[moduleID] = false;
      this._transitiveShouldMock[moduleID] = false;
      return jestObject;
    };
    const mock = (
      moduleName: string,
      mockFactory?: Object,
      options?: {virtual: boolean},
    ) => {
      if (mockFactory !== undefined) {
        return setMockFactory(moduleName, mockFactory, options);
      }

      const moduleID = this._resolver.getModuleID(
        this._virtualMocks,
        from,
        moduleName,
      );
      this._explicitShouldMock[moduleID] = true;
      return jestObject;
    };
    const setMockFactory = (moduleName, mockFactory, options) => {
      this.setMock(from, moduleName, mockFactory, options);
      return jestObject;
    };
    const clearAllMocks = () => {
      this.clearAllMocks();
      return jestObject;
    };
    const resetAllMocks = () => {
      this.resetAllMocks();
      return jestObject;
    };
    const restoreAllMocks = () => {
      this.restoreAllMocks();
      return jestObject;
    };
    const useFakeTimers = () => {
      this._environment.fakeTimers.useFakeTimers();
      return jestObject;
    };
    const useRealTimers = () => {
      this._environment.fakeTimers.useRealTimers();
      return jestObject;
    };
    const resetModules = () => {
      this.resetModules();
      return jestObject;
    };
    const fn = this._moduleMocker.fn.bind(this._moduleMocker);
    const spyOn = this._moduleMocker.spyOn.bind(this._moduleMocker);

    const setTimeout = (timeout: number) => {
      this._environment.global.jasmine
        ? (this._environment.global.jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout)
        : (this._environment.global[
            Symbol.for('TEST_TIMEOUT_SYMBOL')
          ] = timeout);
      return jestObject;
    };

    const jestObject = {
      addMatchers: (matchers: Object) =>
        this._environment.global.jasmine.addMatchers(matchers),
      advanceTimersByTime: (msToRun: number) =>
        this._environment.fakeTimers.advanceTimersByTime(msToRun),
      autoMockOff: disableAutomock,
      autoMockOn: enableAutomock,
      clearAllMocks,
      clearAllTimers: () => this._environment.fakeTimers.clearAllTimers(),
      deepUnmock,
      disableAutomock,
      doMock: mock,
      dontMock: unmock,
      enableAutomock,
      fn,
      genMockFn: fn,
      genMockFromModule: (moduleName: string) =>
        this._generateMock(from, moduleName),
      genMockFunction: fn,
      isMockFunction: this._moduleMocker.isMockFunction,
      mock,
      requireActual: localRequire.requireActual,
      requireMock: localRequire.requireMock,
      resetAllMocks,
      resetModuleRegistry: resetModules,
      resetModules,
      restoreAllMocks,
      runAllImmediates: () => this._environment.fakeTimers.runAllImmediates(),
      runAllTicks: () => this._environment.fakeTimers.runAllTicks(),
      runAllTimers: () => this._environment.fakeTimers.runAllTimers(),
      runOnlyPendingTimers: () =>
        this._environment.fakeTimers.runOnlyPendingTimers(),
      runTimersToTime: (msToRun: number) =>
        this._environment.fakeTimers.advanceTimersByTime(msToRun),
      setMock: (moduleName: string, mock: Object) =>
        setMockFactory(moduleName, () => mock),
      setTimeout,
      spyOn,
      unmock,
      useFakeTimers,
      useRealTimers,
    };
    return jestObject;
  }
}

Runtime.ScriptTransformer = ScriptTransformer;
module.exports = Runtime;
