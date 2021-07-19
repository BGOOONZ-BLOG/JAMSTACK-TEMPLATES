/*jshint node:true*/
module.exports = {
  description: 'Default blueprint for ember-tachyons-components.',

  normalizeEntityName: function () {
  },

  afterInstall: function () {
    return this.addAddonToProject({
      name: 'ember-cli-tachyons-shim',
      target: '4.2.1'
    });
  }
};
