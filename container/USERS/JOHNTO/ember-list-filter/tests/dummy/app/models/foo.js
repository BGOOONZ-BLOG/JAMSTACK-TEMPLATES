import DS from 'ember-data';

var Foo = DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string')
});

var fixtures = [];

for(var i = 0; i < 1000; i++) {
  fixtures.push({
    id: i,
    name: Math.random().toString(),
    email: 'example' + i +'@example.com'
  });
}

Foo.reopenClass({
  FIXTURES: fixtures
});

export default Foo;
