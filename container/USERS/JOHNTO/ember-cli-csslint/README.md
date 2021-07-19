# ember-cli-csslint [![Build Status](https://travis-ci.org/johnotander/ember-cli-csslint.svg?branch=ignore-test-css)](https://travis-ci.org/johnotander/ember-cli-csslint)

[Lint](https://github.com/CSSLint/csslint) your Ember app's CSS as part of the build
process. This addon lints the CSS _after_ the preprocessors (using the postprocess
hook) so you can lint the resulting CSS after the Sass/Less preprocessors.

## Installation

```
ember install:addon ember-cli-csslint
```

## Usage

It is recommended to create a `.csslintrc` in your project root with the following
`exclude-list` in order to ignore vendor and test-support CSS:

```json
{
  "exclude-list": [
    "assets/vendor.css",
    "assets/test-support.css"
  ]
}
```

Now, when you run `ember build`, the CSS Linting will be automatically run:

```
ember build
version: 0.1.2
Building
app.css: line 2, col 3, Use of !important,
app.css: line 5, col 1, Don't use adjoining classes.,
app.css: line 5, col 1, Rule is empty.
3 errors

===== 3 CSSLint Errors

Built project successfully. Stored in "dist/".
```

To customize your linting, create a `.csslintrc` in your project root. Here's an example
`.csslintrc` that doesn't complain about the use of `!important`:

```json
{
  "important": false
}
```

For more information on the available rules see the [csslint wiki](https://github.com/CSSLint/csslint/wiki/Rules-by-ID).

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

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## TODO:

- [X] Ensure the linting occurs on every build, including when the server is running.
- [ ] Beautify the output.
- [ ] Allow configuration for the styles directory (in case `app/styles` isn't used).
- [ ] Allow configuration to specify the output CSS (in case a preprocessor is used).

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com) ([@4lpine](https://twitter.com/4lpine)).
