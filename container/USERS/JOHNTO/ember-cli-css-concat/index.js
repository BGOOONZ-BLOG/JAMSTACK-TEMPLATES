'use strict';

var concatFiles = require('broccoli-concat');
var removeFile = require('broccoli-file-remover');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-css-concat',

  config: function(/* environment, appConfig */) {
    return {
      cssConcat: {
        inputFiles: [
          'assets/' + this.app.name + '.css',
          'assets/vendor.css'
        ],
        outputFile: '/assets/' + this.app.name + '.css'
      }
    };
  },

  included: function(app) {
    this._super.include(app);

    app.registry.add('css', {
      name: 'ember-cli-css-concat',
      ext: 'css',
      toTree: function(tree) {
        var concatedFiles = concatFiles(tree, {
          inputFiles: ['assets/' + app.name + '.css', 'assets/vendor.css'],
          outputFile: '/assets/' + app.name + '.css'
        });

        var appTreeWithoutStyles = removeFile(tree, {
          files: ['assets/vendor.css']
        });

        return mergeTrees([appTreeWithoutStyles,  compiledStyles], { overwrite: true });
      }
    })
  }
};
