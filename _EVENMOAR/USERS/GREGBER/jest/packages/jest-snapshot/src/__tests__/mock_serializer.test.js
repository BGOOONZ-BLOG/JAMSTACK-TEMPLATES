/**
 * Copyright (c) 2016-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
'use strict';

import prettyFormat from 'pretty-format';

import plugin from '../mock_serializer';

test('mock with 0 calls and default name', () => {
  const fn = jest.fn();
  expect(fn).toMatchSnapshot();
});

test('mock with 0 calls and default name in React element', () => {
  const fn = jest.fn();
  const val = {
    $$typeof: Symbol.for('react.test.json'),
    children: ['Mock me!'],
    props: {
      onClick: fn,
    },
    type: 'button',
  };
  expect(val).toMatchSnapshot();
});

test('mock with 0 calls and non-default name', () => {
  const fn = jest.fn();
  fn.mockName('MyConstructor');
  expect(fn).toMatchSnapshot();
});

test('mock with 1 calls and non-default name via new in object', () => {
  const fn = jest.fn();
  fn.mockName('MyConstructor');
  // eslint-disable-next-line no-new
  new fn({name: 'some fine name'});
  const val = {
    fn,
  };
  expect(val).toMatchSnapshot();
});

test('mock with 1 calls in React element', () => {
  const fn = jest.fn();
  fn('Mocking you!');
  const val = {
    $$typeof: Symbol.for('react.test.json'),
    children: ['Mock me!'],
    props: {
      onClick: fn,
    },
    type: 'button',
  };
  expect(val).toMatchSnapshot();
});

test('mock with 2 calls', () => {
  const fn = jest.fn();
  fn();
  fn({foo: 'bar'}, 42);
  expect(fn).toMatchSnapshot();
});

test('indent option', () => {
  const fn = jest.fn();
  fn({key: 'value'});
  const expected = [
    '[MockFunction] {',
    '"calls": Array [',
    'Array [',
    'Object {',
    '"key": "value",',
    '},',
    '],',
    '],',
    '}',
  ].join('\n');
  expect(prettyFormat(fn, {indent: 0, plugins: [plugin]})).toBe(expected);
});

test('min option', () => {
  const fn = jest.fn();
  fn({key: 'value'});
  const expected = '[MockFunction] {"calls": [[{"key": "value"}]]}';
  expect(prettyFormat(fn, {min: true, plugins: [plugin]})).toBe(expected);
});

test('maxDepth option', () => {
  const fn1 = jest.fn();
  fn1.mockName('atDepth1');
  fn1('primitive', {key: 'value'});
  const fn2 = jest.fn();
  fn2.mockName('atDepth2');
  fn2('primitive', {key: 'value'});
  const fn3 = jest.fn();
  fn3.mockName('atDepth3');
  fn3('primitive', {key: 'value'});
  const val = {
    fn1,
    greaterThan1: {
      fn2,
      greaterThan2: {
        fn3,
      },
    },
  };
  const expected = [
    'Object {', // ++depth === 1
    '  "fn1": [MockFunction atDepth1] {',
    '    "calls": Array [', // ++depth === 2
    '      Array [', // ++depth === 3
    '        "primitive",',
    '        [Object],', // ++depth === 4
    '      ],',
    '    ],',
    '  },',
    '  "greaterThan1": Object {', // ++depth === 2
    '    "fn2": [MockFunction atDepth2] {',
    '      "calls": Array [', // ++depth === 3
    '        [Array],', // ++depth === 4
    '      ],',
    '    },',
    '    "greaterThan2": Object {', // ++depth === 3
    '      "fn3": [MockFunction atDepth3] {',
    '        "calls": [Array],', // ++depth === 4
    '      },',
    '    },',
    '  },',
    '}',
  ].join('\n');
  expect(prettyFormat(val, {maxDepth: 3, plugins: [plugin]})).toBe(expected);
});
