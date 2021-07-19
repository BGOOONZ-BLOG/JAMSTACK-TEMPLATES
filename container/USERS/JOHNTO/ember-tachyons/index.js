/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-tachyons',

  included: function(app) {
    this._super.included(app);

    this.app.import('vendor/tachyons.css');
  }
};
