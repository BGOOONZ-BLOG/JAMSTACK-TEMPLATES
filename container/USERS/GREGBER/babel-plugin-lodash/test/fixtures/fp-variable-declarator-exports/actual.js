import fp, { camelCase } from 'lodash/fp';
import { snakeCase } from 'string';

export const case1 = camelCase;
export const case2 = fp.kebabCase;
export const case3 = snakeCase;
