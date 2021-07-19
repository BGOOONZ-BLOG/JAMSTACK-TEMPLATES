// Copyright 2004-present Facebook. All Rights Reserved.

const fs = require('fs');

function summarizeFilesInDirectorySync(directory) {
  return fs.readdirSync(directory).map(fileName => ({directory, fileName}));
}

exports.summarizeFilesInDirectorySync = summarizeFilesInDirectorySync;
