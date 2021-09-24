---
id: faq
title: FAQ
---

See also the [main FAQ](dom-testing-library/faq.md) for questions not specific
to Vue testing.

<details>
<summary>**Is Vue Testing Library a replacement for the official @vue/test-utils?**</summary>

Short answer: yes, it is. If you use Vue Testing Library (VTL) there's no need
to install [@vue/test-utils][vue-test-utils].

Longer answer: VTL is built on top of @vue/test-utils. The official library is
used to render Vue components (by calling [`mount`][mount]) and exposes some of
its methods (while hiding others). You can check the full list of available
methods in the [API](vue-testing-library/api.md) section.

</details>

<details>
<summary>**Do I need to install DOM Testing Library?**</summary>

Nope! VTL imports everything it needs from DOM Testing Library, and then
re-exports it.

</details>

<details>
<summary>**What queries does Vue Testing Library provide?**</summary>

All queries from DOM Testing Library. See
[Queries](dom-testing-library/api-queries.md) for full list.

</details>

<details>
<summary>**If I can't use shallow rendering, how do I mock out components in tests?**</summary>

In general, you should avoid mocking out components (see
[the Guiding Principles section](guiding-principles.md)).

However if you need to, you can either use Jest's
[mocking feature](https://facebook.github.io/jest/docs/en/manual-mocks.html) or
the [`stubs`][stubs] key provided by @vue/test-utils.

```js
import { render } from '@vue/test-utils'
import Component from './Component'

test('Can stub components', () => {
  render(Component, {
    stubs: ['FontAwesomeIcon'],
  })
})
```

You can check out a [working example][stubs-example] in the GitHub repository of
VTL.

</details>

<details>
<summary>**How can I test if an element has appeared / has disappeared?**</summary>

Check the
[Appearance and Disappearance](https://testing-library.com/docs/guide-disappearance)
section of the Guide for available methods to test appearance and disappearance.

If you want to check if an element was never rendered, you might want to write
something like the following:

```js
expect(queryByText('submit')).toBeNull()

// or, if using extend/expect:
import 'jest-dom/extend-expect'
expect(queryByText('submit')).not.toBeInTheDocument()
```

</details>

<!--
Links:
-->

<!-- prettier-ignore-start -->

[vue-test-utils]: https://github.com/vuejs/vue-test-utils
[mount]: https://vue-test-utils.vuejs.org/api/#mount
[stubs]: https://vue-test-utils.vuejs.org/api/options.html#stubs
[stubs-example]: https://github.com/testing-library/vue-testing-library/blob/master/tests/__tests__/stubs.js

<!-- prettier-ignore-end -->
