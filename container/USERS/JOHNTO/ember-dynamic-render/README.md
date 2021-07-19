# Dynamic Render

_Currently under development, and is intended to be a PoC._

This is an [ember-cli](http://www.ember-cli.com/) addon for dynamic rendering. This is intended
to allow templates to be rendered based off of variables, objects, and arrays similar to Rails
functionality.

### Proposed API

###### Array rendering

```hbs
{{dynamic-render foos}} {{! render 'foo' foo for each object inferred by model name.}}
```

###### Object rendering

```hbs
{{dynamic-render bar}} {{! render 'bar' bar for the object inferred by model name.}}
```

###### Rendering from a variable

```hbs
{{dynamic-render myVariable}} {{! render 'myVariableValue' }}
```

## Installation

```
npm i --save-dev ember-dynamic-render
```

## Usage

This allows you to specify dynamic templates to render:

```hbs
{{dynamic-render someVariable object }}
```

It will also infer the template if one isn't specified by the model name:

```hbs
{{dynamic-render object}} {{! # => will render object.hbs }}
```

## Development

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

## Acknowledgements

Adapted from <https://github.com/minutebase/ember-dynamic-component>.

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com) ([@4lpine](https://twitter.com/4lpine)).
