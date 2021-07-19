import DS from "ember-data";

export default DS.ActiveModelAdapter.extend({
  host: Ember.ENV.ACTIVE_MODEL_API_URL,

  buildURL: function() {
    var base;
    base = this._super.apply(this, arguments);
    return "" + base + ".json";
  }
});
