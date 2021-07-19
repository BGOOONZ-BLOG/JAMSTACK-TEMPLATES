'use strict';

module.exports = {
  name: 'ember-cli-activemodel-adapter',

  included: function included(app) {
    this.app = app;
    this._super.included(app);
  }
};
