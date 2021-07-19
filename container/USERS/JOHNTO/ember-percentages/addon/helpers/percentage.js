import Ember from 'ember';

export function percentage(pct, opts) {
  opts = opts || {};

  let value = (pct || 0)*100;
  let numDecimals = opts.decimals || 0;

  return `${value.toFixed(value % 1 === 0 ? 0 : numDecimals)}%`;
}

export default Ember.Helper.helper(percentage);
