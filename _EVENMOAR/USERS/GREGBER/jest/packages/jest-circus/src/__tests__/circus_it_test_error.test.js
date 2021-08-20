/**
 * Copyright (c) 2015-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

let circusIt;
let circusTest;

//using jest-jasmine2's 'it' to test jest-circus's 'it'. Had to differentiate
//the two with this aliaser.

const aliasCircusIt = () => {
  const {it, test} = require('../index.js');
  circusIt = it;
  circusTest = test;
};

aliasCircusIt();

//A few of these tests require incorrect types to throw errors and thus pass
//the test. The typechecks on jest-circus would prevent that, so
//this file has been listed in the .flowconfig ignore section.

describe('test/it error throwing', () => {
  it(`it doesn't throw an error with valid arguments`, () => {
    expect(() => {
      circusIt('test1', () => {});
    }).not.toThrowError();
  });
  it(`it throws error with missing callback function`, () => {
    expect(() => {
      // $FlowFixMe: Easy, we're testing runitme errors here
      circusIt('test2');
    }).toThrowError('Missing second argument. It must be a callback function.');
  });
  it(`it throws an error when first argument isn't a string`, () => {
    expect(() => {
      // $FlowFixMe: Easy, we're testing runitme errors here
      circusIt(() => {});
    }).toThrowError(`Invalid first argument, () => {}. It must be a string.`);
  });
  it('it throws an error when callback function is not a function', () => {
    expect(() => {
      // $FlowFixMe: Easy, we're testing runitme errors here
      circusIt('test4', 'test4b');
    }).toThrowError(
      `Invalid second argument, test4b. It must be a callback function.`,
    );
  });
  it(`test doesn't throw an error with valid arguments`, () => {
    expect(() => {
      circusTest('test5', () => {});
    }).not.toThrowError();
  });
  it(`test throws error with missing callback function`, () => {
    expect(() => {
      // $FlowFixMe: Easy, we're testing runitme errors here
      circusTest('test6');
    }).toThrowError('Missing second argument. It must be a callback function.');
  });
  it(`test throws an error when first argument isn't a string`, () => {
    expect(() => {
      // $FlowFixMe: Easy, we're testing runitme errors here
      circusTest(() => {});
    }).toThrowError(`Invalid first argument, () => {}. It must be a string.`);
  });
  it('test throws an error when callback function is not a function', () => {
    expect(() => {
      // $FlowFixMe: Easy, we're testing runitme errors here
      circusTest('test8', 'test8b');
    }).toThrowError(
      `Invalid second argument, test8b. It must be a callback function.`,
    );
  });
});
