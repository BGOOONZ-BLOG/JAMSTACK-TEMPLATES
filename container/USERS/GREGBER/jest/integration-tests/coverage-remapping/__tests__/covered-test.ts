// Copyright 2004-present Facebook. All Rights Reserved.
const difference = require('../covered.ts');

it('subtracts correctly', () => {
  expect(difference(3, 2)).toBe(1);
});
