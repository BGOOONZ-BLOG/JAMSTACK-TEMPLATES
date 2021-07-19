import React from 'react';
import Slider from 'rc-slider';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-slider',
      tipTransitionName: 'zoom-down'
    };
  },
  render() {
    const {isIncluded, marks, index, defaultIndex, ...rest} = this.props;

    if (isIncluded !== undefined) {
      // 兼容 `isIncluded`
      rest.included = isIncluded;
    }

    if (Array.isArray(marks)) {
      // 兼容当 marks 为数组的情况
      rest.min = 0;
      rest.max = marks.length - 1;
      rest.step = 1;

      if (index !== undefined) {
        rest.value = index;
      }
      if (defaultIndex !== undefined) {
        rest.defaultValue = defaultIndex;
      }

      rest.marks = {};
      marks.forEach((val, idx) => {
        rest.marks[idx] = val;
      });
    } else {
      rest.marks = marks;
    }

    return <Slider {...rest} />;
  }
});
