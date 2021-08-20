/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {
  equals,
  isA,
  isImmutableUnorderedKeyed,
  isImmutableUnorderedSet,
} from './jasmine_utils';

type GetPath = {
  hasEndProp?: boolean,
  lastTraversedObject: ?Object,
  traversedPath: Array<string>,
  value?: any,
};

export const hasOwnProperty = (object: Object, value: string) =>
  Object.prototype.hasOwnProperty.call(object, value) ||
  Object.prototype.hasOwnProperty.call(object.constructor.prototype, value);

export const getPath = (
  object: Object,
  propertyPath: string | Array<string>,
): GetPath => {
  if (!Array.isArray(propertyPath)) {
    propertyPath = propertyPath.split('.');
  }

  if (propertyPath.length) {
    const lastProp = propertyPath.length === 1;
    const prop = propertyPath[0];
    const newObject = object[prop];

    if (!lastProp && (newObject === null || newObject === undefined)) {
      // This is not the last prop in the chain. If we keep recursing it will
      // hit a `can't access property X of undefined | null`. At this point we
      // know that the chain has broken and we can return right away.
      return {
        hasEndProp: false,
        lastTraversedObject: object,
        traversedPath: [],
      };
    }

    const result = getPath(newObject, propertyPath.slice(1));

    if (result.lastTraversedObject === null) {
      result.lastTraversedObject = object;
    }

    result.traversedPath.unshift(prop);

    if (lastProp) {
      result.hasEndProp = hasOwnProperty(object, prop);
      if (!result.hasEndProp) {
        result.traversedPath.shift();
      }
    }

    return result;
  }

  return {
    lastTraversedObject: null,
    traversedPath: [],
    value: object,
  };
};

// Strip properties from object that are not present in the subset. Useful for
// printing the diff for toMatchObject() without adding unrelated noise.
export const getObjectSubset = (object: Object, subset: Object) => {
  if (Array.isArray(object)) {
    if (Array.isArray(subset) && subset.length === object.length) {
      return subset.map((sub, i) => getObjectSubset(object[i], sub));
    }
  } else if (object instanceof Date) {
    return object;
  } else if (
    typeof object === 'object' &&
    object !== null &&
    typeof subset === 'object' &&
    subset !== null
  ) {
    const trimmed = {};
    Object.keys(subset)
      .filter(key => hasOwnProperty(object, key))
      .forEach(
        key => (trimmed[key] = getObjectSubset(object[key], subset[key])),
      );

    if (Object.keys(trimmed).length > 0) {
      return trimmed;
    }
  }
  return object;
};

const IteratorSymbol = Symbol.iterator;

const hasIterator = object => !!(object != null && object[IteratorSymbol]);
export const iterableEquality = (a: any, b: any) => {
  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    Array.isArray(a) ||
    Array.isArray(b) ||
    !hasIterator(a) ||
    !hasIterator(b)
  ) {
    return undefined;
  }
  if (a.constructor !== b.constructor) {
    return false;
  }

  if (a.size !== undefined) {
    if (a.size !== b.size) {
      return false;
    } else if (isA('Set', a) || isImmutableUnorderedSet(a)) {
      let allFound = true;
      for (const aValue of a) {
        if (!b.has(aValue)) {
          allFound = false;
          break;
        }
      }
      if (allFound) {
        return true;
      }
    } else if (isA('Map', a) || isImmutableUnorderedKeyed(a)) {
      let allFound = true;
      for (const aEntry of a) {
        if (
          !b.has(aEntry[0]) ||
          !equals(aEntry[1], b.get(aEntry[0]), [iterableEquality])
        ) {
          allFound = false;
          break;
        }
      }
      if (allFound) {
        return true;
      }
    }
  }

  const bIterator = b[IteratorSymbol]();

  for (const aValue of a) {
    const nextB = bIterator.next();
    if (nextB.done || !equals(aValue, nextB.value, [iterableEquality])) {
      return false;
    }
  }
  if (!bIterator.next().done) {
    return false;
  }
  return true;
};

const isObjectWithKeys = a =>
  a !== null &&
  typeof a === 'object' &&
  !(a instanceof Error) &&
  !(a instanceof Array) &&
  !(a instanceof Date);

export const subsetEquality = (object: Object, subset: Object) => {
  if (!isObjectWithKeys(subset)) {
    return undefined;
  }

  return Object.keys(subset).every(
    key =>
      hasOwnProperty(object, key) &&
      equals(object[key], subset[key], [iterableEquality, subsetEquality]),
  );
};

export const partition = <T>(
  items: Array<T>,
  predicate: T => boolean,
): [Array<T>, Array<T>] => {
  const result = [[], []];

  items.forEach(item => result[predicate(item) ? 0 : 1].push(item));

  return result;
};

// Copied from https://github.com/graingert/angular.js/blob/a43574052e9775cbc1d7dd8a086752c979b0f020/src/Angular.js#L685-L693
export const isError = (value: any) => {
  switch (Object.prototype.toString.call(value)) {
    case '[object Error]':
      return true;
    case '[object Exception]':
      return true;
    case '[object DOMException]':
      return true;
    default:
      return value instanceof Error;
  }
};
