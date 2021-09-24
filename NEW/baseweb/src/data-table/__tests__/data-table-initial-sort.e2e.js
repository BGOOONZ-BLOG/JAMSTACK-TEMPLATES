/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

const {
  TABLE_ROOT,
  getCellContentsAtColumnIndex,
  matchArrayElements,
} = require('./utilities.js');

const COLUMN_COUNT = 1;

describe('data table initial filters', () => {
  it('mounts with initial sort applied', async () => {
    await mount(page, 'data-table-initial-sort');
    await page.waitForSelector(TABLE_ROOT);
    const data = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, 0);
    expect(matchArrayElements(data, ['d', 'c', 'b', 'a'])).toBe(true);
  });
});
