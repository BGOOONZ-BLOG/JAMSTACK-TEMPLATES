// Copyright 2004-present Facebook. All Rights Reserved.

it('adds 1 + 2 to equal 3 in TScript', ()=> {
  const sum = require('../covered.ts');
  expect(sum(1, 2)).toBe(3);
});
