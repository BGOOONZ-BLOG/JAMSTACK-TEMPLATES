import test from 'ava'
import isPresent from 'is-present'
import fs from 'fs'
import domStats from '..'

test('should return the stats for an HTML string', t => {
  t.plan(4)

  const stats = domStats(fixture('furtive.html'))
  t.truthy(isPresent(stats))
  t.deepEqual(stats.tagCounts.p, 21)
  t.deepEqual(stats.tagCounts.li, 12)
  t.deepEqual(stats.tagCounts.video, 0)
})

test('should skip zero counts if the option is passed', t => {
  t.plan(1)

  const stats = domStats(fixture('furtive.html'), { ignoreZeroCounts: true })
  t.deepEqual(stats.tagCounts.video, undefined)
})

test('should return id statistics', t => {
  t.plan(3)

  const stats = domStats(fixture('furtive.html'))
  t.deepEqual(stats.duplicateIds, ['grid'])
  t.deepEqual(stats.duplicateIdsCount, 1)
  t.deepEqual(stats.totalIds, 17)
})

test('should return class statistics', t => {
  t.plan(2)

  const stats = domStats(fixture('furtive.html'))
  t.deepEqual(stats.totalClasses, 415)
  t.deepEqual(Math.round(stats.averageClassCount), 2)
})

function fixture(name) {
  return fs.readFileSync('fixtures/' + name, 'utf8').trim()
}
