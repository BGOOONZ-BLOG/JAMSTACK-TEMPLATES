/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

'use strict';

import type {EventHandler} from 'types/Circus';

const testHandler: EventHandler = (event, state) => {
  switch (event.name) {
    case 'start_describe_definition': {
      console.log(event.name + ':', event.blockName);
      break;
    }
    case 'run_describe_start':
    case 'run_describe_finish': {
      console.log(event.name + ':', event.describeBlock.name);
      break;
    }
    case 'test_start':
    case 'test_done': {
      console.log(event.name + ':', event.test.name);
      break;
    }

    case 'add_test': {
      console.log(event.name + ':', event.testName);
      break;
    }

    case 'test_fn_start':
    case 'test_fn_success':
    case 'test_fn_failure': {
      console.log(event.name + ':', event.test.name);
      break;
    }

    case 'add_hook': {
      console.log(event.name + ':', event.hookType);
      break;
    }

    case 'hook_start':
    case 'hook_success':
    case 'hook_failure': {
      console.log(event.name + ':', event.hook.type);
      break;
    }

    default: {
      console.log(event.name);
    }
  }
};

export default testHandler;
