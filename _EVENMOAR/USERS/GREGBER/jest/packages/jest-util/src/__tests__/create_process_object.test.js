/**
 * Copyright (c) 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import EventEmitter from 'events';
import createProcessObject from '../create_process_object';

it('creates a process object that looks like the original one', () => {
  const fakeProcess = createProcessObject();

  // "process" inherits from EventEmitter through the prototype chain.
  expect(fakeProcess instanceof EventEmitter).toBe(true);

  // They look the same, but they are NOT the same (deep copied object). The
  // "_events" property is checked to ensure event emitter properties are
  // properly copied.
  ['argv', 'env', '_events'].forEach(key => {
    expect(fakeProcess[key]).toEqual(process[key]);
    expect(fakeProcess[key]).not.toBe(process[key]);
  });

  // Check that process.stdout/stderr are the same.
  expect(process.stdout).toBe(fakeProcess.stdout);
  expect(process.stderr).toBe(fakeProcess.stderr);
});

it('fakes require("process") so it is equal to "global.process"', () => {
  expect(require('process') === process).toBe(true);
});

it('checks that process.env works as expected on Linux platforms', () => {
  Object.defineProperty(process, 'platform', {get: () => 'linux'});

  // Existing properties inside process.env are copied to the fake environment.
  process.env.PROP_STRING = 'foo';
  process.env.PROP_NUMBER = 3;
  process.env.PROP_UNDEFINED = undefined;

  const fake = createProcessObject().env;

  // All values converted to strings.
  expect(fake.PROP_STRING).toBe('foo');
  expect(fake.PROP_NUMBER).toBe('3');
  expect(fake.PROP_UNDEFINED).toBe('undefined');

  // Mac and Linux are case sensitive.
  expect(fake.PROP_string).toBe(undefined);

  // Added properties to the fake object are not added to the real one.
  fake.PROP_ADDED = 'new!';

  expect(fake.PROP_ADDED).toBe('new!');
  expect(process.env.PROP_ADDED).toBe(undefined);

  // You can delete properties, but they are case sensitive!
  fake.prop = 'foo';
  fake.PROP = 'bar';

  expect(fake.prop).toBe('foo');
  expect(fake.PROP).toBe('bar');

  delete fake.PROP;

  expect(fake.prop).toBe('foo');
  expect(fake.PROP).toBe(undefined);
});

it('checks that process.env works as expected in Windows platforms', () => {
  Object.defineProperty(process, 'platform', {get: () => 'win32'});

  // Windows is not case sensitive when it comes to property names.
  process.env.PROP_STRING = 'foo';

  const fake = createProcessObject().env;

  expect(fake.PROP_STRING).toBe('foo');
  expect(fake.PROP_string).toBe('foo');

  // Inherited methods, however, are not affected by case insensitiveness.
  expect(typeof fake.toString).toBe('function');
  expect(typeof fake.valueOf).toBe('function');

  expect(typeof fake.tostring).toBe('undefined');
  expect(typeof fake.valueof).toBe('undefined');

  // You can delete through case-insensitiveness too.
  delete fake.prop_string;

  expect(fake.hasOwnProperty('PROP_STRING')).toBe(false);
  expect(fake.hasOwnProperty('PROP_string')).toBe(false);
});
