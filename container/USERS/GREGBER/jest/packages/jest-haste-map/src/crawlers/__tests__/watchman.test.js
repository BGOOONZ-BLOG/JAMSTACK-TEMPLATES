/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const path = require('path');

jest.mock('fb-watchman', () => {
  const normalizePathSep = require('../../lib/normalize_path_sep').default;
  const Client = jest.fn();
  Client.prototype.command = jest.fn((args, callback) =>
    setImmediate(() => {
      const response = mockResponse[args[0]][normalizePathSep(args[1])];
      callback(null, response.next ? response.next().value : response);
    }),
  );
  Client.prototype.on = jest.fn();
  Client.prototype.end = jest.fn();
  return {Client};
});

const forcePOSIXPaths = path => path.replace(/\\/g, '/');
const pearMatcher = path => /pear/.test(path);

let watchman;
let watchmanCrawl;
let mockResponse;
let mockFiles;

const ROOT_MOCK = path.sep === '/' ? '/root-mock' : 'M:\\root-mock';
const FRUITS = `${ROOT_MOCK}${path.sep}fruits`;
const VEGETABLES = `${ROOT_MOCK}${path.sep}vegetables`;
const ROOTS = [FRUITS, VEGETABLES];
const BANANA = path.join(FRUITS, 'banana.js');
const STRAWBERRY = path.join(FRUITS, 'strawberry.js');
const KIWI = path.join(FRUITS, 'kiwi.js');
const TOMATO = path.join(FRUITS, 'tomato.js');
const MELON = path.join(VEGETABLES, 'melon.json');
const WATCH_PROJECT_MOCK = {
  [FRUITS]: {
    relative_path: 'fruits',
    watch: forcePOSIXPaths(ROOT_MOCK),
  },
  [VEGETABLES]: {
    relative_path: 'vegetables',
    watch: forcePOSIXPaths(ROOT_MOCK),
  },
};

describe('watchman watch', () => {
  beforeEach(() => {
    watchmanCrawl = require('../watchman');

    watchman = require('fb-watchman');

    mockResponse = {
      query: {
        [ROOT_MOCK]: {
          clock: 'c:fake-clock:1',
          files: [
            {
              exists: true,
              mtime_ms: {toNumber: () => 30},
              name: 'fruits/strawberry.js',
            },
            {
              exists: true,
              mtime_ms: {toNumber: () => 31},
              name: 'fruits/tomato.js',
            },
            {
              exists: true,
              mtime_ms: {toNumber: () => 32},
              name: 'fruits/pear.js',
            },
            {
              exists: true,
              mtime_ms: {toNumber: () => 33},
              name: 'vegetables/melon.json',
            },
          ],
          is_fresh_instance: true,
          version: '4.5.0',
        },
      },
      'watch-project': WATCH_PROJECT_MOCK,
    };

    mockFiles = Object.assign(Object.create(null), {
      [MELON]: ['', 33, 0, []],
      [STRAWBERRY]: ['', 30, 0, []],
      [TOMATO]: ['', 31, 0, []],
    });
  });

  afterEach(() => {
    watchman.Client.mock.instances[0].command.mockClear();
  });

  test('returns a list of all files when there are no clocks', () => {
    return watchmanCrawl({
      data: {
        clocks: Object.create(null),
        files: Object.create(null),
      },
      extensions: ['js', 'json'],
      ignore: pearMatcher,
      roots: ROOTS,
    }).then(data => {
      const client = watchman.Client.mock.instances[0];
      const calls = client.command.mock.calls;

      expect(client.on).toBeCalled();
      expect(client.on).toBeCalledWith('error', expect.any(Function));

      // Call 0 and 1 are for ['watch-project']
      expect(calls[0][0][0]).toEqual('watch-project');
      expect(calls[1][0][0]).toEqual('watch-project');

      // Call 2 is the query
      const query = calls[2][0];
      expect(query[0]).toEqual('query');

      expect(query[2].expression).toEqual([
        'allof',
        ['type', 'f'],
        ['anyof', ['suffix', 'js'], ['suffix', 'json']],
        ['anyof', ['dirname', 'fruits'], ['dirname', 'vegetables']],
      ]);

      expect(query[2].fields).toEqual(['name', 'exists', 'mtime_ms']);

      expect(query[2].suffix).toEqual(['js', 'json']);

      expect(data.clocks).toEqual({
        [ROOT_MOCK]: 'c:fake-clock:1',
      });

      expect(data.files).toEqual(mockFiles);

      expect(client.end).toBeCalled();
    });
  });

  test('updates the file object when the clock is given', () => {
    mockResponse = {
      query: {
        [ROOT_MOCK]: {
          clock: 'c:fake-clock:2',
          files: [
            {
              exists: true,
              mtime_ms: {toNumber: () => 42},
              name: 'fruits/kiwi.js',
            },
            {
              exists: false,
              mtime_ms: null,
              name: 'fruits/tomato.js',
            },
          ],
          is_fresh_instance: false,
          version: '4.5.0',
        },
      },
      'watch-project': WATCH_PROJECT_MOCK,
    };

    const clocks = Object.assign(Object.create(null), {
      [ROOT_MOCK]: 'c:fake-clock:1',
    });

    return watchmanCrawl({
      data: {
        clocks,
        files: mockFiles,
      },
      extensions: ['js', 'json'],
      ignore: pearMatcher,
      roots: ROOTS,
    }).then(data => {
      // The object was reused.
      expect(data.files).toBe(mockFiles);

      expect(data.clocks).toEqual({
        [ROOT_MOCK]: 'c:fake-clock:2',
      });

      expect(data.files).toEqual({
        [KIWI]: ['', 42, 0, []],
        [MELON]: ['', 33, 0, []],
        [STRAWBERRY]: ['', 30, 0, []],
      });
    });
  });

  test('resets the file object when watchman is restarted', () => {
    mockResponse = {
      query: {
        [ROOT_MOCK]: {
          clock: 'c:fake-clock:3',
          files: [
            {
              exists: true,
              mtime_ms: {toNumber: () => 42},
              name: 'fruits/kiwi.js',
            },
            {
              exists: true,
              mtime_ms: {toNumber: () => 41},
              name: 'fruits/banana.js',
            },
            {
              exists: true,
              mtime_ms: {toNumber: () => 31},
              name: 'fruits/tomato.js',
            },
          ],
          is_fresh_instance: true,
          version: '4.5.0',
        },
      },
      'watch-project': WATCH_PROJECT_MOCK,
    };

    const mockMetadata = ['Banana', 41, 1, ['Raspberry']];
    mockFiles[BANANA] = mockMetadata;

    const clocks = Object.assign(Object.create(null), {
      [ROOT_MOCK]: 'c:fake-clock:1',
    });

    return watchmanCrawl({
      data: {
        clocks,
        files: mockFiles,
      },
      extensions: ['js', 'json'],
      ignore: pearMatcher,
      roots: ROOTS,
    }).then(data => {
      // The file object was *not* reused.
      expect(data.files).not.toBe(mockFiles);

      expect(data.clocks).toEqual({
        [ROOT_MOCK]: 'c:fake-clock:3',
      });

      // /fruits/strawberry.js was removed from the file list.
      expect(data.files).toEqual({
        [BANANA]: mockMetadata,
        [KIWI]: ['', 42, 0, []],
        [TOMATO]: mockFiles[TOMATO],
      });

      // Even though the file list was reset, old file objects are still reused
      // if no changes have been made.
      expect(data.files[BANANA]).toBe(mockMetadata);

      expect(data.files[TOMATO]).toBe(mockFiles[TOMATO]);
    });
  });

  test('properly resets the file map when only one watcher is reset', () => {
    mockResponse = {
      query: {
        [FRUITS]: {
          clock: 'c:fake-clock:3',
          files: [
            {
              exists: true,
              mtime_ms: {toNumber: () => 42},
              name: 'kiwi.js',
            },
          ],
          is_fresh_instance: false,
          version: '4.5.0',
        },
        [VEGETABLES]: {
          clock: 'c:fake-clock:4',
          files: [
            {
              exists: true,
              mtime_ms: {toNumber: () => 33},
              name: 'melon.json',
            },
          ],
          is_fresh_instance: true,
          version: '4.5.0',
        },
      },
      'watch-project': {
        [FRUITS]: {
          watch: forcePOSIXPaths(FRUITS),
        },
        [VEGETABLES]: {
          watch: forcePOSIXPaths(VEGETABLES),
        },
      },
    };

    const clocks = Object.assign(Object.create(null), {
      [FRUITS]: 'c:fake-clock:1',
      [VEGETABLES]: 'c:fake-clock:2',
    });

    return watchmanCrawl({
      data: {
        clocks,
        files: mockFiles,
      },
      extensions: ['js', 'json'],
      ignore: pearMatcher,
      roots: ROOTS,
    }).then(data => {
      expect(data.clocks).toEqual({
        [FRUITS]: 'c:fake-clock:3',
        [VEGETABLES]: 'c:fake-clock:4',
      });

      expect(data.files).toEqual({
        [KIWI]: ['', 42, 0, []],
        [MELON]: ['', 33, 0, []],
      });
    });
  });

  test('does not add directory filters to query when watching a ROOT', () => {
    mockResponse = {
      query: {
        [ROOT_MOCK]: {
          clock: 'c:fake-clock:1',
          files: [],
          is_fresh_instance: false,
          version: '4.5.0',
        },
      },
      'watch-project': {
        [FRUITS]: {
          relative_path: 'fruits',
          watch: forcePOSIXPaths(ROOT_MOCK),
        },
        [ROOT_MOCK]: {
          watch: forcePOSIXPaths(ROOT_MOCK),
        },
        [VEGETABLES]: {
          relative_path: 'vegetables',
          watch: forcePOSIXPaths(ROOT_MOCK),
        },
      },
    };

    return watchmanCrawl({
      data: {
        clocks: Object.create(null),
        files: Object.create(null),
      },
      extensions: ['js', 'json'],
      ignore: pearMatcher,
      roots: [...ROOTS, ROOT_MOCK],
    }).then(data => {
      const client = watchman.Client.mock.instances[0];
      const calls = client.command.mock.calls;

      expect(client.on).toBeCalled();
      expect(client.on).toBeCalledWith('error', expect.any(Function));

      // First 3 calls are for ['watch-project']
      expect(calls[0][0][0]).toEqual('watch-project');
      expect(calls[1][0][0]).toEqual('watch-project');
      expect(calls[2][0][0]).toEqual('watch-project');

      // Call 4 is the query
      const query = calls[3][0];
      expect(query[0]).toEqual('query');

      expect(query[2].expression).toEqual([
        'allof',
        ['type', 'f'],
        ['anyof', ['suffix', 'js'], ['suffix', 'json']],
      ]);

      expect(query[2].fields).toEqual(['name', 'exists', 'mtime_ms']);

      expect(query[2].suffix).toEqual(['js', 'json']);

      expect(data.clocks).toEqual({
        [ROOT_MOCK]: 'c:fake-clock:1',
      });

      expect(data.files).toEqual({});

      expect(client.end).toBeCalled();
    });
  });
});
