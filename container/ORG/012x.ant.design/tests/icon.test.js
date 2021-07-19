jest.dontMock('../components/icon/index');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { wrap } from 'react-stateless-wrapper';

const Icon = wrap(require('../components/icon/index'));

describe('Icon', function() {
  let icon;
  let iconNode;

  beforeEach(() => {
    icon = TestUtils.renderIntoDocument(
      <Icon type="appstore" className="my-icon-classname" />
    );
    iconNode = TestUtils.findRenderedDOMComponentWithTag(icon, 'I');
  });

  it('should render to a <i class="xxx"></i>', () => {
    expect(iconNode.tagName).toBe('I');
    expect(iconNode.className).toContain('my-icon-classname');
    expect(iconNode.className).toContain('anticon');
    expect(iconNode.className).toContain('anticon-appstore');
  });
});

