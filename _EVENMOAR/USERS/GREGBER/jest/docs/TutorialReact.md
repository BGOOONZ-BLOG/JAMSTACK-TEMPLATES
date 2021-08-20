---
id: tutorial-react
title: Testing React Apps
---

At Facebook, we use Jest to test [React](http://facebook.github.io/react/)
applications.

## Setup

### Setup with Create React App

If you are just getting started with React, we recommend using
[Create React App](https://github.com/facebookincubator/create-react-app). It is
ready to use and
[ships with Jest](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)!
You don't need to do any extra steps for setup, and can head straight to the
next section.

### Setup without Create React App

If you have an existing application you'll need to install a few packages to
make everything work well together. We are using the `babel-jest` package and
the `react` babel preset to transform our code inside of the test environment.
Also see [using babel](GettingStarted.md#using-babel).

Run

```bash
yarn add --dev jest babel-jest babel-preset-env babel-preset-react react-test-renderer
```

Your `package.json` should look something like this (where `<current-version>`
is the actual latest version number for the package). Please add the scripts and
jest configuration entries:

```json
// package.json
  "dependencies": {
    "react": "<current-version>",
    "react-dom": "<current-version>"
  },
  "devDependencies": {
    "babel-jest": "<current-version>",
    "babel-preset-env": "<current-version>",
    "babel-preset-react": "<current-version>",
    "jest": "<current-version>",
    "react-test-renderer": "<current-version>"
  },
  "scripts": {
    "test": "jest"
  }
```

```json
// .babelrc
{
  "presets": ["env", "react"]
}
```

**And you're good to go!**

### Snapshot Testing

Let's create a [snapshot test](SnapshotTesting.md) for a Link component that
renders hyperlinks:

```javascript
// Link.react.js
import React from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

export default class Link extends React.Component {
  constructor(props) {
    super(props);

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      class: STATUS.NORMAL,
    };
  }

  _onMouseEnter() {
    this.setState({class: STATUS.HOVERED});
  }

  _onMouseLeave() {
    this.setState({class: STATUS.NORMAL});
  }

  render() {
    return (
      <a
        className={this.state.class}
        href={this.props.page || '#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        {this.props.children}
      </a>
    );
  }
}
```

Now let's use React's test renderer and Jest's snapshot feature to interact with
the component and capture the rendered output and create a snapshot file:

```javascript
// Link.react.test.js
import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
```

When you run `yarn test` or `jest`, this will produce an output file like this:

```javascript
// __tests__/__snapshots__/Link.react.test.js.snap
exports[`Link changes the class when hovered 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;

exports[`Link changes the class when hovered 2`] = `
<a
  className="hovered"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;

exports[`Link changes the class when hovered 3`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;
```

The next time you run the tests, the rendered output will be compared to the
previously created snapshot. The snapshot should be committed along code
changes. When a snapshot test fails, you need to inspect whether it is an
intended or unintended change. If the change is expected you can invoke Jest
with `jest -u` to overwrite the existing snapshot.

The code for this example is available at
[examples/snapshot](https://github.com/facebook/jest/tree/master/examples/snapshot).

#### Snapshot Testing with Mocks, Enzyme and React 16

There's a caveat around snapshot testing when using Enzyme and React 16+. If you
mock out a module using the following style:

```js
jest.mock('../SomeDirectory/SomeComponent', () => 'SomeComponent');
```

Then you will see warnings in the console:

```bash
Warning: <SomeComponent /> is using uppercase HTML. Always use lowercase HTML tags in React.

# Or:
Warning: The tag <SomeComponent> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
```

React 16 triggers these warnings due to how it checks element types, and the
mocked module fails these checks. Your options are:

1.  Render as text. This way you won't see the props passed to the mock
    component in the snapshot, but it's straightforward:
    ```js
    jest.mock('./SomeComponent', () => () => 'SomeComponent');
    ```
2.  Render as a custom element. DOM "custom elements" aren't checked for
    anything and shouldn't fire warnings. They are lowercase and have a dash in
    the name.
    ```js
    jest.mock('./Widget', () => 'mock-widget');
    ```
3.  Use `react-test-renderer`. The test renderer doesn't care about element
    types and will happily accept e.g. `SomeComponent`. You could check
    snapshots using the test renderer, and check component behavior separately
    using Enzyme.

### DOM Testing

If you'd like to assert, and manipulate your rendered components you can use
[Enzyme](http://airbnb.io/enzyme/) or React's
[TestUtils](http://facebook.github.io/react/docs/test-utils.html). We use Enzyme
for this example.

You have to run `yarn add --dev enzyme` to use Enzyme. If you are using a React
version below 15.5.0, you will also need to install `react-addons-test-utils`.

Let's implement a simple checkbox which swaps between two labels:

```javascript
// CheckboxWithLabel.js

import React from 'react';

export default class CheckboxWithLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isChecked: false};

    // bind manually because React class components don't auto-bind
    // http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({isChecked: !this.state.isChecked});
  }

  render() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
}
```

We use Enzyme's
[shallow renderer](http://airbnb.io/enzyme/docs/api/shallow.html) in this
example.

```javascript
// __tests__/CheckboxWithLabel-test.js

import React from 'react';
import {shallow} from 'enzyme';
import CheckboxWithLabel from '../CheckboxWithLabel';

test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

  expect(checkbox.text()).toEqual('Off');

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');
});
```

The code for this example is available at
[examples/enzyme](https://github.com/facebook/jest/tree/master/examples/enzyme).

### Custom transformers

If you need more advanced functionality, you can also build your own
transformer. Instead of using babel-jest, here is an example of using babel:

```javascript
// custom-transformer.js
'use strict';

const babel = require('babel-core');
const jestPreset = require('babel-preset-jest');

module.exports = {
  process(src, filename) {
    if (babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename,
        presets: [jestPreset],
      });
    }
    return src;
  },
};
```

Don't forget to install the `babel-core` and `babel-preset-jest` packages for
this example to work.

To make this work with Jest you need to update your Jest configuration with
this: `"transform": {"\\.js$": "path/to/custom-transformer.js"}`.

If you'd like to build a transformer with babel support, you can also use
babel-jest to compose one and pass in your custom configuration options:

```javascript
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: ['my-custom-preset'],
});
```
