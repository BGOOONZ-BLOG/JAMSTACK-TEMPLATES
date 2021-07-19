# List Filter

[![Build Status](https://travis-ci.org/johnotander/ember-list-filter.svg?branch=master)](https://travis-ci.org/johnotander/ember-list-filter)

A list filter component with a text input for the [ember-cli](http://www.ember-cli.com/).

## Installation

```
npm i ember-list-filter --save-dev
```

## Usage

In a template, you can call the list filter component:

```hbs
{{list-filter list=myUserList partial='list-user' properties='name title description'}}
```

Then, make sure you define a partial/template. The above example uses `list-user`:

`list-user.hbs`
```hbs
<li>
  {{gravatar-image email=listFilterObject.email}}
  {{listFilterObject.name}}
  {{listFilterObject.email}}
</li>
```

Note the `listFilterObject` keyword, this is the variable assigned for the `#each` block in the list filter component.

## Development

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com) ([@4lpine](https://twitter.com/4lpine)).
