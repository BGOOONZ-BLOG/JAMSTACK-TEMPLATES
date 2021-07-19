import Ember from 'ember';

export default function(callingContext, name, options) {
  return Ember.Handlebars.helpers.render.call(callingContext, name, options);
}
