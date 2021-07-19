var csslintTree = require('broccoli-csslint');
var removeFiles = require('broccoli-file-remover');
var broccoli = require('broccoli');

'use strict';

module.exports = {
  name: 'ember-cli-csslint',

  postprocessTree: function(type, tree) {
    if (type === 'all') {
      return csslintTree(tree);
    } else {
      return tree;
    }
  }
};
