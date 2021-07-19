import React from 'react';
import PropTypes from 'prop-types';
import SwitchBase from '../internal/SwitchBase';
import IndeterminateCheckBoxIcon from '../internal/svg-icons/IndeterminateCheckBox';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  default: {
    color: theme.palette.text.secondary,
  },
  checked: {
    color: theme.palette.primary.main,
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
});

function Checkbox(props) {
  const { checkedIcon, icon, indeterminate, indeterminateIcon, ...other } = props;

  return (
    <SwitchBase
      checkedIcon={indeterminate ? indeterminateIcon : checkedIcon}
      icon={indeterminate ? indeterminateIcon : icon}
      {...other}
    />
  );
}

Checkbox.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the switch will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,
  /**
   * If `true`, the component appears indeterminate.
   */
  indeterminate: PropTypes.bool,
  /**
   * The icon to display when the component is indeterminate.
   */
  indeterminateIcon: PropTypes.node,
  /**
   * Properties applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: PropTypes.func,
  /**
   * The input component property `type`.
   */
  inputType: PropTypes.string,
  /*
   * @ignore
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The value of the component.
   */
  value: PropTypes.string,
};

Checkbox.defaultProps = {
  indeterminate: false,
  indeterminateIcon: <IndeterminateCheckBoxIcon />,
};

export default withStyles(styles, { name: 'MuiCheckbox' })(Checkbox);
