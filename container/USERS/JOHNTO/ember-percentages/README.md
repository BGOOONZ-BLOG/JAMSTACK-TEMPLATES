# ember-percentages [![Build Status](https://travis-ci.org/johnotander/ember-percentages.svg?branch=master)](https://travis-ci.org/johnotander/ember-percentages) [![Ember Observer Score](http://emberobserver.com/badges/ember-percentages.svg)](http://emberobserver.com/addons/ember-percentages)

A helper for formatting percentages from floats to human readable numbers.

## Installation

```
ember install ember-percentages
```

## Usage

```hbs
{{percentage '0.87235'}}    {{! => '87.235%'}}
{{percentage '0.87235' decimals=1}}  {{! => '87.2%'}}
{{percentage someProperty}} {{! => '12.8%'}}
```

##### You can specify the decimal place for rounding

```hbs
{{percentage '0.87235' decimals=2}} {{! => '82.24%'}}
```

##### There's a shortcut provided, too

```hbs
{{pct '0.1234567' decimals=2}} {{! => '12.35%'}}
```

## License

MIT

## Contributing

1. Fork it
* Create your feature branch (`git checkout -b my-new-feature`)
* Install the dependencies and run gulp (`npm i && gulp`)
* Commit your changes (`git commit -am 'Add some feature'`)
* Push to the branch (`git push origin my-new-feature`)
* Create new Pull Request

***

> Crafted with <3 by [John Otander](http://johnotander.com) ([@4lpine](https://twitter.com/4lpine)).
