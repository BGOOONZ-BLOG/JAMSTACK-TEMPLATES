/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const SkipOnWindows = require('../../../../../scripts/SkipOnWindows');

jest.mock('child_process', () => ({
  spawn: jest.fn((cmd, args) => {
    let closeCallback;
    return {
      stdout: {
        on: jest.fn().mockImplementation((event, callback) => {
          if (event === 'data') {
            setTimeout(() => {
              callback(mockResponse);
              setTimeout(closeCallback, 0);
            }, 0);
          } else if (event === 'close') {
            closeCallback = callback;
          }
        }),
        setEncoding: jest.fn(),
      },
    };
  }),
}));

jest.mock('fs', () => {
  let mtime = 32;
  const stat = (path, callback) => {
    setTimeout(
      () =>
        callback(null, {
          isDirectory() {
            return path.endsWith('/directory');
          },
          isSymbolicLink() {
            return false;
          },
          mtime: {
            getTime() {
              return mtime++;
            },
          },
        }),
      0,
    );
  };
  return {
    lstat: jest.fn(stat),
    readdir: jest.fn((dir, callback) => {
      if (dir === '/fruits') {
        setTimeout(() => callback(null, ['directory', 'tomato.js']), 0);
      } else if (dir === '/fruits/directory') {
        setTimeout(() => callback(null, ['strawberry.js']), 0);
      }
    }),
    stat: jest.fn(stat),
  };
});

const pearMatcher = path => /pear/.test(path);

let mockResponse;
let nodeCrawl;
let childProcess;

describe('node crawler', () => {
  SkipOnWindows.suite();

  beforeEach(() => {
    jest.resetModules();

    // Remove the "process.platform" property descriptor so it can be writable.
    delete process.platform;

    mockResponse = [
      '/fruits/pear.js',
      '/fruits/strawberry.js',
      '/fruits/tomato.js',
    ].join('\n');
  });

  it('crawls for files based on patterns', () => {
    process.platform = 'linux';

    childProcess = require('child_process');
    nodeCrawl = require('../node');

    mockResponse = [
      '/fruits/pear.js',
      '/fruits/strawberry.js',
      '/fruits/tomato.js',
      '/vegetables/melon.json',
    ].join('\n');

    const promise = nodeCrawl({
      data: {
        files: Object.create(null),
      },
      extensions: ['js', 'json'],
      ignore: pearMatcher,
      roots: ['/fruits', '/vegtables'],
    }).then(data => {
      expect(childProcess.spawn).lastCalledWith('find', [
        '/fruits',
        '/vegtables',
        '-type',
        'f',
        '(',
        '-iname',
        '*.js',
        '-o',
        '-iname',
        '*.json',
        ')',
      ]);

      expect(data.files).not.toBe(null);

      expect(data.files).toEqual({
        '/fruits/strawberry.js': ['', 32, 0, []],
        '/fruits/tomato.js': ['', 33, 0, []],
        '/vegetables/melon.json': ['', 34, 0, []],
      });
    });

    return promise;
  });

  it('updates only changed files', () => {
    process.platform = 'linux';

    nodeCrawl = require('../node');

    const files = Object.create(null);

    // In this test sample, strawberry is changed and tomato is unchanged
    const tomato = ['', 33, 1, []];
    files['/fruits/strawberry.js'] = ['', 30, 1, []];
    files['/fruits/tomato.js'] = tomato;

    return nodeCrawl({
      data: {files},
      extensions: ['js'],
      ignore: pearMatcher,
      roots: ['/fruits'],
    }).then(data => {
      expect(data.files).toEqual({
        '/fruits/strawberry.js': ['', 32, 0, []],
        '/fruits/tomato.js': tomato,
      });

      // Make sure it is the *same* unchanged object.
      expect(data.files['/fruits/tomato.js']).toBe(tomato);
    });
  });

  it('uses node fs APIs on windows', () => {
    process.platform = 'win32';

    nodeCrawl = require('../node');

    const files = Object.create(null);
    return nodeCrawl({
      data: {files},
      extensions: ['js'],
      ignore: pearMatcher,
      roots: ['/fruits'],
    }).then(data => {
      expect(data.files).toEqual({
        '/fruits/directory/strawberry.js': ['', 33, 0, []],
        '/fruits/tomato.js': ['', 32, 0, []],
      });
    });
  });

  it('uses node fs APIs if "forceNodeFilesystemAPI" is set to true, regardless of platform', () => {
    process.platform = 'linux';

    nodeCrawl = require('../node');

    const files = Object.create(null);
    return nodeCrawl({
      data: {files},
      extensions: ['js'],
      forceNodeFilesystemAPI: true,
      ignore: pearMatcher,
      roots: ['/fruits'],
    }).then(data => {
      expect(data.files).toEqual({
        '/fruits/directory/strawberry.js': ['', 33, 0, []],
        '/fruits/tomato.js': ['', 32, 0, []],
      });
    });
  });

  it('completes with empty roots', () => {
    process.platform = 'win32';

    nodeCrawl = require('../node');

    const files = Object.create(null);
    return nodeCrawl({
      data: {files},
      extensions: ['js'],
      forceNodeFilesystemAPI: true,
      ignore: pearMatcher,
      roots: [],
    }).then(data => {
      expect(data.files).toEqual({});
    });
  });
});
