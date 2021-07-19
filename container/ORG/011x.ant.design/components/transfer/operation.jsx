import React, { Component, PropTypes } from 'react';
import Button from '../button';
import Icon from '../icon';

function noop() {
}

class TransferOperation extends Component {
  render() {
    const {
      moveToLeft,
      moveToRight,
      leftArrowText,
      rightArrowText,
      leftActive,
      rightActive,
      className,
    } = this.props;

    const moveToLeftButton = (
      <Button type="primary" size="small" disabled={!leftActive} onClick={moveToLeft}>
        {<span><Icon type="left" />{leftArrowText}</span>}
      </Button>
    );
    const moveToRightButton = (
      <Button type="primary" size="small" disabled={!rightActive} onClick={moveToRight}>
        {<span>{rightArrowText}<Icon type="right" /></span>}
      </Button>
    );
    return <div className={className}>
      {moveToLeftButton}
      {moveToRightButton}
    </div>;
  }
}

TransferOperation.defaultProps = {
  leftArrowText: '',
  rightArrowText: '',
  moveToLeft: noop,
  moveToRight: noop,
};

TransferOperation.propTypes = {
  className: PropTypes.string,
  leftArrowText: PropTypes.string,
  rightArrowText: PropTypes.string,
  moveToLeft: PropTypes.func,
  moveToRight: PropTypes.func,
};

export default TransferOperation;
