import React from 'react';
import Tooltip from 'rc-tooltip';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-tooltip',
      placement: 'top',
      mouseEnterDelay: 0.1,
      mouseLeaveDelay: 0.1
    };
  },
  getInitialState() {
    return {
      visible: false
    };
  },
  onVisibleChange(visible) {
    this.setState({ visible });
  },
  render() {
    let transitionName = ({
      top: 'zoom-down',
      bottom: 'zoom-up',
      left: 'zoom-right',
      right: 'zoom-left'
    })[this.props.placement];

    // Hide tooltip when there is no title
    let visible = this.state.visible;
    if (!this.props.title) {
      visible = false;
    }

    return (
       <Tooltip transitionName={transitionName}
        overlay={this.props.title}
        visible={visible}
        onVisibleChange={this.onVisibleChange}
        {...this.props}>
        {this.props.children}
      </Tooltip>
    );
  }
});
