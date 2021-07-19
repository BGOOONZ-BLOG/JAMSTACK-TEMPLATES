import test from 'ava'
import isPresent from 'is-present'
import diatonic from './'

test('returns an object with values', t => {
  t.plan(2)

  const d = diatonic()

  t.true(isPresent(d))
  t.is(d.inch, '6rem')
})

test('returns px values when specified', t => {
  const d = diatonic({ px: true })

  t.is(d.inch, '96px')
})
