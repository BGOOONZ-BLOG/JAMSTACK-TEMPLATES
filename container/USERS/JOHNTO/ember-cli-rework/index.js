/* jshint node: true */
'use strict';

var rework = require('broccoli-rework');
var Funnel = require('broccoli-funnel');

/**
 * Preprocessor
 */

// Preprocessor constructor
function Preprocessor(options) {
  this.name = 'ember-cli-rework';
  this.options = options || {};
}

// Preprocessor.toTree method
Preprocessor.prototype.toTree = function(tree, inputPath, outputPath, inputOptions) {
  var self = this;
  // All css in directories below "app/styles" is filtered out by default
  var excludedCss = this.options.exclude || ['app/styles/*/**/*.css'];

  // Filter css in subdirectories from tree
  var filteredTree = new Funnel(tree, {
    exclude: excludedCss
  });

  function reworkTree(tree) {
    var plugins = self.options.plugins;
    if (plugins) {
      tree = rework(tree, {
        use: function(css) {
          // Use all plugins defined in Brocfile.js config
          plugins.forEach(function(plugin) {
            css.use(plugin);
          });
        }
      });
    }
    // Return the reworked css
    return tree;
  };

  // Funnel tree with reworked css to output path and return
  return new Funnel(reworkTree(filteredTree), {
    srcDir: inputPath,
    destDir: outputPath
  });
};

/**
 * Export
 */

// Export rework preprocessor
module.exports = {
  name: 'ember-cli-rework',

  included: function(app) {
    this._super.included.apply(this, arguments);
    app.registry.add('css', new Preprocessor(app.options && app.options.rework));
  }
};
