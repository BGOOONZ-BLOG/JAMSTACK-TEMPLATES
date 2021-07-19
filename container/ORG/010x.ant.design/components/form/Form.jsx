import React from 'react';
import classNames from 'classnames';

class Form extends React.Component {
  render() {
    const prefixCls = this.props.prefixCls;
    const formClassName = {
      [`${prefixCls}-horizontal`]: this.props.horizontal,
      [`${prefixCls}-inline`]: this.props.inline,
    };
    const classes = classNames(formClassName);

    return (
      <form {...this.props} className={classes}>
        {this.props.children}
      </form>
    );
  }
}

Form.propTypes = {
  prefixCls: React.PropTypes.string,
  horizontal: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  children: React.PropTypes.any,
  onSubmit: React.PropTypes.func,
};

Form.defaultProps = {
  prefixCls: 'ant-form',
};

module.exports = Form;
