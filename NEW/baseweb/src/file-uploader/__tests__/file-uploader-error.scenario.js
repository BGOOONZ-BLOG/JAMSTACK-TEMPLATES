/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {FileUploader} from '../index.js';

export default function Scenario() {
  return (
    <FileUploader
      progressAmount={40}
      progressMessage="Uploading... 8.24 of 45.08MB"
      errorMessage="Upload failed... connection was lost."
    />
  );
}
