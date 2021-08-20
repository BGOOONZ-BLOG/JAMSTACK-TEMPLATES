
var shorthandExpand = require('css-shorthand-expand')

module.exports = function (properties) {

  properties = properties || this.properties

  if (!properties) {
    return 0
  }

  var fontSizes = properties['font-size'] || []

  if (properties.font) {
    fontSizes = fontSizes.concat(properties.font
      .map(function (value) {
        return shorthandExpand('font', value)['font-family']
      })
      .filter(function (value) {
        return value
      })
    )
  }

  return fontSizes

}

