/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

type Options = {
  nodeComplete: (suite: TreeNode) => void,
  nodeStart: (suite: TreeNode) => void,
  queueRunnerFactory: any,
  runnableIds: Array<string>,
  tree: TreeNode,
};

type TreeNode = {
  afterAllFns: Array<any>,
  beforeAllFns: Array<any>,
  execute: (onComplete: () => void, enabled: boolean) => void,
  id: string,
  onException: (error: Error) => void,
  sharedUserContext: () => any,
  children?: Array<TreeNode>,
};

// Try getting the real promise object from the context, if available. Someone
// could have overridden it in a test. Async functions return it implicitly.
// eslint-disable-next-line no-unused-vars
const Promise = global[Symbol.for('jest-native-promise')] || global.Promise;

export default function treeProcessor(options: Options) {
  const {
    nodeComplete,
    nodeStart,
    queueRunnerFactory,
    runnableIds,
    tree,
  } = options;

  function isEnabled(node, parentEnabled) {
    return parentEnabled || runnableIds.indexOf(node.id) !== -1;
  }

  return queueRunnerFactory({
    onException: error => tree.onException(error),
    queueableFns: wrapChildren(tree, isEnabled(tree, false)),
    userContext: tree.sharedUserContext(),
  });

  function executeNode(node, parentEnabled) {
    const enabled = isEnabled(node, parentEnabled);
    if (!node.children) {
      return {
        fn(done) {
          node.execute(done, enabled);
        },
      };
    }
    return {
      async fn(done) {
        nodeStart(node);
        await queueRunnerFactory({
          onException: error => node.onException(error),
          queueableFns: wrapChildren(node, enabled),
          userContext: node.sharedUserContext(),
        });
        nodeComplete(node);
        done();
      },
    };
  }

  function wrapChildren(node: TreeNode, enabled: boolean) {
    if (!node.children) {
      throw new Error('`node.children` is not defined.');
    }
    const children = node.children.map(child => executeNode(child, enabled));
    return node.beforeAllFns.concat(children).concat(node.afterAllFns);
  }
}
