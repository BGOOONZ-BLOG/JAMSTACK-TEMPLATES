'use strict'

var cheerio = require('cheerio')
var htmlTags = require('html-tags')
var isPresent = require('is-present')

module.exports = function domStats (html, options) {
  if (typeof html !== 'string') {
    throw new TypeError('dom-stats expected a string')
  }

  return analyzeDom(cheerio.load(html), options || {})
}

function analyzeDom(dom, options) {
  var stats = {
    totalTags: 0,
    totalClasses: 0,
    totalIds: 0,
    averageClassCount: 0,
    duplicateIds: [],
    duplicateIdsCount: 0,
    tagCounts: {}
  }

  var ids = {}
  var classes = {}

  htmlTags.forEach(function(tag) {
    var tags = dom(tag)
    var tagCount = tags.length

    if (options.ignoreZeroCounts && tagCount == 0) {
      return
    }

    stats.totalTags += tagCount
    stats.tagCounts[tag] = tagCount

    tags.each(function(i, tag) {
      var classList = (tag.attribs.class || '').split(/\s+/)
      if (isPresent(classList)) {
        stats.totalClasses += classList.length
      }

      if (isPresent(tag.attribs.id)) {
        if (ids[tag.attribs.id]) {
          ids[tag.attribs.id]++
        } else {
          ids[tag.attribs.id] = 1
        }
      }
    })
  })

  Object.keys(ids).forEach(function(id) {
    stats.totalIds += ids[id]
    if (ids[id] > 1) {
      stats.duplicateIds.push(id)
      stats.duplicateIdsCount++
    }
  })

  if (stats.totalTags) {
    stats.averageClassCount = stats.totalClasses/stats.totalTags
  }

  return stats
}
