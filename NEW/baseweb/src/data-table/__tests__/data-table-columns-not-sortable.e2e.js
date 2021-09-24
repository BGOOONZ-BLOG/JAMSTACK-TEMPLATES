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
  sortColumnAtIndex,
  matchArrayElements,
} = require('./utilities.js');

const COLUMN_COUNT = 5;

describe('data table non-sortable columns', () => {
  it('clicks on column header does not sort', async () => {
    const index = 0;
    await mount(page, 'data-table-columns-not-sortable');
    await page.waitForSelector(TABLE_ROOT);
    const before = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(before, ['T', 'F', 'T', 'F'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const after = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(after, ['T', 'F', 'T', 'F'])).toBe(true);
  });
});
