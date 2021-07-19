# Time Ago in Words

This addon has been deprecated.

Please see <https://github.com/johnotander/ember-cli-dates> for the current
version.

An [ember-cli](http://ember-cli.com) addon for computing the time ago in words with moment.js.

## Installation

First, you must install moment with [bower](http://bower.io):

```
$ bower install --save moment
```

Add the following import to your Brocfile.js:

```js
app.import('vendor/moment/moment.js');
```

Then, install ember-time-ago:

```
$ npm install --save ember-time-ago
```

## Usage

In your view:

```hbs
{{time-ago-in-words this.createdAt}}
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com).
