---
id: faq
title: FAQ
---

See also the [main FAQ](dom-testing-library/faq.md) for questions not specific
to React testing

<details>
  


<summary>How do I test input onChange handlers?</summary>

TL;DR:
[Go to the `on-change.js` example](https://codesandbox.io/s/github/kentcdodds/react-testing-library-examples/tree/master/?module=%2Fsrc%2F__tests__%2Fon-change.js&previewwindow=tests)

In summary:

```javascript
import React from 'react'
import '@testing-library/react/cleanup-after-each'
import { render, fireEvent } from '@testing-library/react'

test('change values via the fireEvent.change method', () => {
  const handleChange = jest.fn()
  const { container } = render(<input type="text" onChange={handleChange} />)
  const input = container.firstChild
  fireEvent.change(input, { target: { value: 'a' } })
  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(input.value).toBe('a')
})

test('checkboxes (and radios) must use fireEvent.click', () => {
  const handleChange = jest.fn()
  const { container } = render(
    <input type="checkbox" onChange={handleChange} />
  )
  const checkbox = container.firstChild
  fireEvent.click(checkbox)
  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(checkbox.checked).toBe(true)
})
```

If you've used enzyme or React's TestUtils, you may be accustomed to changing
inputs like so:

```javascript
input.value = 'a'
Simulate.change(input)
```

We can't do this with React Testing Library because React actually keeps track
of any time you assign the `value` property on an `input` and so when you fire
the `change` event, React thinks that the value hasn't actually been changed.

This works for Simulate because they use internal APIs to fire special simulated
events. With React Testing Library, we try to avoid implementation details to
make your tests more resiliant.

So we have it worked out for the change event handler to set the property for
you in a way that's not trackable by React. This is why you must pass the value
as part of the `change` method call.

</details>

<details>

<summary>Can I write unit tests with this library?</summary>

Definitely yes! You can write unit and integration tests with this library. See
below for more on how to mock dependencies (because this library intentionally
does NOT support shallow rendering) if you want to unit test a high level
component. The tests in this project show several examples of unit testing with
this library.

As you write your tests, keep in mind:

> The more your tests resemble the way your software is used, the more
> confidence they can give you. - [17 Feb 2018][guiding-principle]

</details>

<details>

<summary>If I can't use shallow rendering, how do I mock out components in tests?</summary>

In general, you should avoid mocking out components (see
[the Guiding Principles section](guiding-principles.md)). However if you need
to, then it's pretty trivial using
[Jest's mocking feature](https://facebook.github.io/jest/docs/en/manual-mocks.html).
One case that I've found mocking to be especially useful is for animation
libraries. I don't want my tests to wait for animations to end.

```javascript
jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children }) => children)
  const FakeCSSTransition = jest.fn(props =>
    props.in ? <FakeTransition>{props.children}</FakeTransition> : null
  )
  return { CSSTransition: FakeCSSTransition, Transition: FakeTransition }
})

test('you can mock things with jest.mock', () => {
  const { getByTestId, queryByTestId } = render(
    <HiddenMessage initialShow={true} />
  )
  expect(queryByTestId('hidden-message')).toBeTruthy() // we just care it exists
  // hide the message
  fireEvent.click(getByTestId('toggle-message'))
  // in the real world, the CSSTransition component would take some time
  // before finishing the animation which would actually hide the message.
  // So we've mocked it out for our tests to make it happen instantly
  expect(queryByTestId('hidden-message')).toBeNull() // we just care it doesn't exist
})
```

Note that because they're Jest mock functions (`jest.fn()`), you could also make
assertions on those as well if you wanted.

[Open full test](example-react-transition-group.md) for the full example.

This looks like more work that shallow rendering (and it is), but it gives you
more confidence so long as your mock resembles the thing you're mocking closely
enough.

If you want to make things more like shallow rendering, then you could do
something more [like this](example-react-transition-group.md).

Learn more about how Jest mocks work from my blog post:
["But really, what is a JavaScript mock?"](https://blog.kentcdodds.com/but-really-what-is-a-javascript-mock-10d060966f7d)

</details>

<details>

<summary>What about enzyme is "bloated with complexity and features" and "encourage
poor testing practices"?</summary>

Most of the damaging features have to do with encouraging testing implementation
details. Primarily, these are
[shallow rendering](http://airbnb.io/enzyme/docs/api/shallow.html), APIs which
allow selecting rendered elements by component constructors, and APIs which
allow you to get and interact with component instances (and their
state/properties) (most of enzyme's wrapper APIs allow this).

The guiding principle for this library is:

> The more your tests resemble the way your software is used, the more
> confidence they can give you. - [17 Feb 2018][guiding-principle]

Because users can't directly interact with your app's component instances,
assert on their internal state or what components they render, or call their
internal methods, doing those things in your tests reduce the confidence they're
able to give you.

That's not to say that there's never a use case for doing those things, so they
should be possible to accomplish, just not the default and natural way to test
react components.

</details>

<details>

<summary>Why isn't snapshot diffing working?</summary>

If you use the [snapshot-diff](https://github.com/jest-community/snapshot-diff)
library to save snapshot diffs, it won't work out of the box because this
library uses the DOM which is mutable. Changes don't return new objects so
snapshot-diff will think it's the same object and avoid diffing it.

Luckily there's an easy way to make it work: clone the DOM when passing it into
snapshot-diff. It looks like this:

```js
const firstVersion = container.cloneNode(true)
// Do some changes
snapshotDiff(firstVersion, container.cloneNode(true))
```

</details>

<!--
Links:
-->

<!-- prettier-ignore-start -->

[guiding-principle]: https://twitter.com/kentcdodds/status/977018512689455106
[data-testid-blog-post]: https://blog.kentcdodds.com/making-your-ui-tests-resilient-to-change-d37a6ee37269
[dom-testing-lib-textmatch]: https://github.com/testing-library/dom-testing-library#textmatch

<!-- prettier-ignore-end -->
