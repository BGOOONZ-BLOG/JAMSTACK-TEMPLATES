/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Glob, Path, ProjectConfig} from 'types/Config';
import type {
  Transformer,
  TransformedSource,
  TransformResult,
} from 'types/Transform';

import crypto from 'crypto';
import path from 'path';
import vm from 'vm';
import {createDirectory} from 'jest-util';
import fs from 'graceful-fs';
import {transform as babelTransform} from 'babel-core';
import babelPluginIstanbul from 'babel-plugin-istanbul';
import convertSourceMap from 'convert-source-map';
import HasteMap from 'jest-haste-map';
import stableStringify from 'json-stable-stringify';
import slash from 'slash';
import {version as VERSION} from '../package.json';
import shouldInstrument from './should_instrument';
import writeFileAtomic from 'write-file-atomic';
import {sync as realpath} from 'realpath-native';

export type Options = {|
  collectCoverage: boolean,
  collectCoverageFrom: Array<Glob>,
  collectCoverageOnlyFrom: ?{[key: string]: boolean, __proto__: null},
  isCoreModule?: boolean,
  isInternalModule?: boolean,
|};

const cache: Map<string, TransformResult> = new Map();
const configToJsonMap = new Map();
// Cache regular expressions to test whether the file needs to be preprocessed
const ignoreCache: WeakMap<ProjectConfig, ?RegExp> = new WeakMap();

// To reset the cache for specific changesets (rather than package version).
const CACHE_VERSION = '1';

export default class ScriptTransformer {
  static EVAL_RESULT_VARIABLE: string;
  _config: ProjectConfig;
  _transformCache: Map<Path, ?Transformer>;

  constructor(config: ProjectConfig) {
    this._config = config;
    this._transformCache = new Map();
  }

  _getCacheKey(fileData: string, filename: Path, instrument: boolean): string {
    if (!configToJsonMap.has(this._config)) {
      // We only need this set of config options that can likely influence
      // cached output instead of all config options.
      configToJsonMap.set(this._config, stableStringify(this._config));
    }
    const configString = configToJsonMap.get(this._config) || '';
    const transformer = this._getTransformer(filename);

    if (transformer && typeof transformer.getCacheKey === 'function') {
      return crypto
        .createHash('md5')
        .update(
          transformer.getCacheKey(fileData, filename, configString, {
            instrument,
            rootDir: this._config.rootDir,
          }),
        )
        .update(CACHE_VERSION)
        .digest('hex');
    } else {
      return crypto
        .createHash('md5')
        .update(fileData)
        .update(configString)
        .update(instrument ? 'instrument' : '')
        .update(CACHE_VERSION)
        .digest('hex');
    }
  }

  _getFileCachePath(
    filename: Path,
    content: string,
    instrument: boolean,
  ): Path {
    const baseCacheDir = HasteMap.getCacheFilePath(
      this._config.cacheDirectory,
      'jest-transform-cache-' + this._config.name,
      VERSION,
    );
    const cacheKey = this._getCacheKey(content, filename, instrument);
    // Create sub folders based on the cacheKey to avoid creating one
    // directory with many files.
    const cacheDir = path.join(baseCacheDir, cacheKey[0] + cacheKey[1]);
    const cachePath = slash(
      path.join(
        cacheDir,
        path.basename(filename, path.extname(filename)) + '_' + cacheKey,
      ),
    );
    createDirectory(cacheDir);

    return cachePath;
  }

  _getTransformPath(filename: Path) {
    for (let i = 0; i < this._config.transform.length; i++) {
      if (new RegExp(this._config.transform[i][0]).test(filename)) {
        return this._config.transform[i][1];
      }
    }
    return null;
  }

  _getTransformer(filename: Path) {
    let transform: ?Transformer;
    if (!this._config.transform || !this._config.transform.length) {
      return null;
    }

    const transformPath = this._getTransformPath(filename);
    if (transformPath) {
      const transformer = this._transformCache.get(transformPath);
      if (transformer != null) {
        return transformer;
      }

      // $FlowFixMe
      transform = (require(transformPath): Transformer);
      if (typeof transform.process !== 'function') {
        throw new TypeError(
          'Jest: a transform must export a `process` function.',
        );
      }
      if (typeof transform.createTransformer === 'function') {
        transform = transform.createTransformer();
      }
      this._transformCache.set(transformPath, transform);
    }
    return transform;
  }

  _instrumentFile(filename: Path, content: string): string {
    return babelTransform(content, {
      auxiliaryCommentBefore: ' istanbul ignore next ',
      babelrc: false,
      filename,
      plugins: [
        [
          babelPluginIstanbul,
          {
            compact: false,
            // files outside `cwd` will not be instrumented
            cwd: this._config.rootDir,
            exclude: [],
            useInlineSourceMaps: false,
          },
        ],
      ],
    }).code;
  }

  _getRealPath(filepath: Path): Path {
    try {
      return realpath(filepath) || filepath;
    } catch (err) {
      return filepath;
    }
  }

  transformSource(filepath: Path, content: string, instrument: boolean) {
    const filename = this._getRealPath(filepath);
    const transform = this._getTransformer(filename);
    const cacheFilePath = this._getFileCachePath(filename, content, instrument);
    let sourceMapPath = cacheFilePath + '.map';
    // Ignore cache if `config.cache` is set (--no-cache)
    let code = this._config.cache ? readCodeCacheFile(cacheFilePath) : null;

    const shouldCallTransform =
      transform && shouldTransform(filename, this._config);

    // That means that the transform has a custom instrumentation
    // logic and will handle it based on `config.collectCoverage` option
    const transformWillInstrument =
      shouldCallTransform && transform && transform.canInstrument;

    // If we handle the coverage instrumentation, we should try to map code
    // coverage against original source with any provided source map
    const mapCoverage = instrument && !transformWillInstrument;

    if (code) {
      // This is broken: we return the code, and a path for the source map
      // directly from the cache. But, nothing ensures the source map actually
      // matches that source code. They could have gotten out-of-sync in case
      // two separate processes write concurrently to the same cache files.
      return {
        code,
        mapCoverage,
        sourceMapPath,
      };
    }

    let transformed: TransformedSource = {
      code: content,
      map: null,
    };

    if (transform && shouldCallTransform) {
      const processed = transform.process(content, filename, this._config, {
        instrument,
        returnSourceString: false,
      });

      if (typeof processed === 'string') {
        transformed.code = processed;
      } else if (processed != null && typeof processed.code === 'string') {
        transformed = processed;
      } else {
        throw new TypeError(
          "Jest: a transform's `process` function must return a string, " +
            'or an object with `code` key containing this string.',
        );
      }
    }

    if (!transformed.map) {
      //Could be a potential freeze here.
      //See: https://github.com/facebook/jest/pull/5177#discussion_r158883570
      const inlineSourceMap = convertSourceMap.fromSource(transformed.code);
      if (inlineSourceMap) {
        transformed.map = inlineSourceMap.toJSON();
      }
    }

    if (!transformWillInstrument && instrument) {
      code = this._instrumentFile(filename, transformed.code);
    } else {
      code = transformed.code;
    }

    if (transformed.map) {
      const sourceMapContent =
        typeof transformed.map === 'string'
          ? transformed.map
          : JSON.stringify(transformed.map);
      writeCacheFile(sourceMapPath, sourceMapContent);
    } else {
      sourceMapPath = null;
    }

    writeCodeCacheFile(cacheFilePath, code);

    return {
      code,
      mapCoverage,
      sourceMapPath,
    };
  }

  _transformAndBuildScript(
    filename: Path,
    options: ?Options,
    instrument: boolean,
    fileSource?: string,
  ): TransformResult {
    const isInternalModule = !!(options && options.isInternalModule);
    const isCoreModule = !!(options && options.isCoreModule);
    const content = stripShebang(
      fileSource || fs.readFileSync(filename, 'utf8'),
    );

    let wrappedCode: string;
    let sourceMapPath: ?string = null;
    let mapCoverage = false;

    const willTransform =
      !isInternalModule &&
      !isCoreModule &&
      (shouldTransform(filename, this._config) || instrument);

    try {
      if (willTransform) {
        const transformedSource = this.transformSource(
          filename,
          content,
          instrument,
        );

        wrappedCode = wrap(transformedSource.code);
        sourceMapPath = transformedSource.sourceMapPath;
        mapCoverage = transformedSource.mapCoverage;
      } else {
        wrappedCode = wrap(content);
      }

      return {
        mapCoverage,
        script: new vm.Script(wrappedCode, {
          displayErrors: true,
          filename: isCoreModule ? 'jest-nodejs-core-' + filename : filename,
        }),
        sourceMapPath,
      };
    } catch (e) {
      if (e.codeFrame) {
        e.stack = e.codeFrame;
      }

      throw e;
    }
  }

  transform(
    filename: Path,
    options: Options,
    fileSource?: string,
  ): TransformResult {
    let scriptCacheKey = null;
    let instrument = false;
    let result = '';

    if (!options.isCoreModule) {
      instrument = shouldInstrument(filename, options, this._config);
      scriptCacheKey = getScriptCacheKey(filename, this._config, instrument);
      result = cache.get(scriptCacheKey);
    }

    if (result) {
      return result;
    }

    result = this._transformAndBuildScript(
      filename,
      options,
      instrument,
      fileSource,
    );

    if (scriptCacheKey) {
      cache.set(scriptCacheKey, result);
    }

    return result;
  }
}

const removeFile = (path: Path) => {
  try {
    fs.unlinkSync(path);
  } catch (e) {}
};

const stripShebang = content => {
  // If the file data starts with a shebang remove it. Leaves the empty line
  // to keep stack trace line numbers correct.
  if (content.startsWith('#!')) {
    return content.replace(/^#!.*/, '');
  } else {
    return content;
  }
};

/**
 * This is like `writeCacheFile` but with an additional sanity checksum. We
 * cannot use the same technique for source maps because we expose source map
 * cache file paths directly to callsites, with the expectation they can read
 * it right away. This is not a great system, because source map cache file
 * could get corrupted, out-of-sync, etc.
 */
function writeCodeCacheFile(cachePath: Path, code: string) {
  const checksum = crypto
    .createHash('md5')
    .update(code)
    .digest('hex');
  writeCacheFile(cachePath, checksum + '\n' + code);
}

/**
 * Read counterpart of `writeCodeCacheFile`. We verify that the content of the
 * file matches the checksum, in case some kind of corruption happened. This
 * could happen if an older version of `jest-runtime` writes non-atomically to
 * the same cache, for example.
 */
function readCodeCacheFile(cachePath: Path): ?string {
  const content = readCacheFile(cachePath);
  if (content == null) {
    return null;
  }
  const code = content.substr(33);
  const checksum = crypto
    .createHash('md5')
    .update(code)
    .digest('hex');
  if (checksum === content.substr(0, 32)) {
    return code;
  }
  return null;
}

/**
 * Writing to the cache atomically relies on 'rename' being atomic on most
 * file systems. Doing atomic write reduces the risk of corruption by avoiding
 * two processes to write to the same file at the same time. It also reduces
 * the risk of reading a file that's being overwritten at the same time.
 */
const writeCacheFile = (cachePath: Path, fileData: string) => {
  try {
    writeFileAtomic.sync(cachePath, fileData, {encoding: 'utf8'});
  } catch (e) {
    if (cacheWriteErrorSafeToIgnore(e, cachePath)) {
      return;
    }

    e.message =
      'jest: failed to cache transform results in: ' +
      cachePath +
      '\nFailure message: ' +
      e.message;
    removeFile(cachePath);
    throw e;
  }
};

/**
 * On Windows, renames are not atomic, leading to EPERM exceptions when two
 * processes attempt to rename to the same target file at the same time.
 * If the target file exists we can be reasonably sure another process has
 * legitimately won a cache write race and ignore the error.
 */
const cacheWriteErrorSafeToIgnore = (e: Error, cachePath: Path) => {
  return (
    process.platform === 'win32' &&
    e.code === 'EPERM' &&
    fs.existsSync(cachePath)
  );
};

const readCacheFile = (cachePath: Path): ?string => {
  if (!fs.existsSync(cachePath)) {
    return null;
  }

  let fileData;
  try {
    fileData = fs.readFileSync(cachePath, 'utf8');
  } catch (e) {
    e.message =
      'jest: failed to read cache file: ' +
      cachePath +
      '\nFailure message: ' +
      e.message;
    removeFile(cachePath);
    throw e;
  }

  if (fileData == null) {
    // We must have somehow created the file but failed to write to it,
    // let's delete it and retry.
    removeFile(cachePath);
  }
  return fileData;
};

const getScriptCacheKey = (filename, config, instrument: boolean) => {
  const mtime = fs.statSync(filename).mtime;
  return filename + '_' + mtime.getTime() + (instrument ? '_instrumented' : '');
};

const shouldTransform = (filename: Path, config: ProjectConfig): boolean => {
  if (!ignoreCache.has(config)) {
    if (
      !config.transformIgnorePatterns ||
      config.transformIgnorePatterns.length === 0
    ) {
      ignoreCache.set(config, null);
    } else {
      ignoreCache.set(
        config,
        new RegExp(config.transformIgnorePatterns.join('|')),
      );
    }
  }

  const ignoreRegexp = ignoreCache.get(config);
  const isIgnored = ignoreRegexp ? ignoreRegexp.test(filename) : false;
  return !!config.transform && !!config.transform.length && !isIgnored;
};

const wrap = content =>
  '({"' +
  ScriptTransformer.EVAL_RESULT_VARIABLE +
  '":function(module,exports,require,__dirname,__filename,global,jest){' +
  content +
  '\n}});';

ScriptTransformer.EVAL_RESULT_VARIABLE = 'Object.<anonymous>';
