# dom-stats [![Build Status](https://secure.travis-ci.org/johnotander/dom-stats.svg?branch=master)](https://travis-ci.org/johnotander/dom-stats) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Parse and return stats for a given html string.

## Installation

```bash
npm i -S dom-stats
```

## Usage

```javascript
const domStats = require('dom-stats')

const stats = domStats('<span id="foo"><i class="hi" id="foo"</i></span>')
console.log(stats)
// {
//   totalTags: 2,
//   totalClasses: 1,
//   totalIds: 2,
//   averageClassCount: 0.5,
//   duplicateIds: ['foo'],
//   duplicateIdsCount: 1,
//   tagCounts: { span: 1, a: 1 }
// }
```

## License

MIT

## Related

* <https://github.com/cheeriojs/cheerio>
* <https://github.com/johnotander/is-present>
* <https://github.com/sindresorhus/html-tags>

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com) ([@4lpine](https://twitter.com/4lpine)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
