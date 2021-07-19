/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const {stringify} = require('jest-matcher-utils');
const {getObjectSubset, getPath} = require('../utils');

describe('getPath()', () => {
  test('property exists', () => {
    expect(getPath({a: {b: {c: 5}}}, 'a.b.c')).toEqual({
      hasEndProp: true,
      lastTraversedObject: {c: 5},
      traversedPath: ['a', 'b', 'c'],
      value: 5,
    });

    expect(getPath({a: {b: {c: {d: 1}}}}, 'a.b.c.d')).toEqual({
      hasEndProp: true,
      lastTraversedObject: {d: 1},
      traversedPath: ['a', 'b', 'c', 'd'],
      value: 1,
    });
  });

  test('property doesnt exist', () => {
    expect(getPath({a: {b: {}}}, 'a.b.c')).toEqual({
      hasEndProp: false,
      lastTraversedObject: {},
      traversedPath: ['a', 'b'],
      value: undefined,
    });
  });

  test('property exist but undefined', () => {
    expect(getPath({a: {b: {c: undefined}}}, 'a.b.c')).toEqual({
      hasEndProp: true,
      lastTraversedObject: {c: undefined},
      traversedPath: ['a', 'b', 'c'],
      value: undefined,
    });
  });

  test('property is a getter on class instance', () => {
    class A {
      get a() {
        return 'a';
      }
      get b() {
        return {c: 'c'};
      }
    }

    expect(getPath(new A(), 'a')).toEqual({
      hasEndProp: true,
      lastTraversedObject: new A(),
      traversedPath: ['a'],
      value: 'a',
    });
    expect(getPath(new A(), 'b.c')).toEqual({
      hasEndProp: true,
      lastTraversedObject: {c: 'c'},
      traversedPath: ['b', 'c'],
      value: 'c',
    });
  });

  test('path breaks', () => {
    expect(getPath({a: {}}, 'a.b.c')).toEqual({
      hasEndProp: false,
      lastTraversedObject: {},
      traversedPath: ['a'],
      value: undefined,
    });
  });

  test('empty object at the end', () => {
    expect(getPath({a: {b: {c: {}}}}, 'a.b.c.d')).toEqual({
      hasEndProp: false,
      lastTraversedObject: {},
      traversedPath: ['a', 'b', 'c'],
      value: undefined,
    });
  });
});

describe('getObjectSubset()', () => {
  [
    [{a: 'b', c: 'd'}, {a: 'd'}, {a: 'b'}],
    [{a: [1, 2], b: 'b'}, {a: [3, 4]}, {a: [1, 2]}],
    [[{a: 'b', c: 'd'}], [{a: 'z'}], [{a: 'b'}]],
    [[1, 2], [1, 2, 3], [1, 2]],
    [{a: [1]}, {a: [1, 2]}, {a: [1]}],
    [new Date('2015-11-30'), new Date('2016-12-30'), new Date('2015-11-30')],
  ].forEach(([object, subset, expected]) => {
    test(
      `expect(getObjectSubset(${stringify(object)}, ${stringify(subset)}))` +
        `.toEqual(${stringify(expected)})`,
      () => {
        expect(getObjectSubset(object, subset)).toEqual(expected);
      },
    );
  });
});
