import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import StepIcon from './StepIcon';

export const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  horizontal: {},
  vertical: {},
  active: {
    fontWeight: 500,
  },
  completed: {
    fontWeight: 500,
  },
  disabled: {
    cursor: 'default',
  },
  iconContainer: {},
  iconContainerNoAlternative: {
    paddingRight: theme.spacing.unit,
  },
  alternativeLabelRoot: {
    flexDirection: 'column',
  },
  alternativeLabel: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2,
  },
});

function StepLabel(props) {
  const {
    active,
    alternativeLabel,
    children,
    classes,
    className: classNameProp,
    completed,
    disabled,
    icon,
    last,
    optional,
    orientation,
    ...other
  } = props;

  const className = classNames(classes.root, classes[orientation], {
    [classes.disabled]: disabled,
    [classes.completed]: completed,
    [classes.alternativeLabelRoot]: alternativeLabel,
    classNameProp,
  });
  const labelClassName = classNames({
    [classes.alternativeLabel]: alternativeLabel,
    [classes.completed]: completed,
    [classes.active]: active,
  });

  return (
    <span className={className} {...other}>
      {icon && (
        <span
          className={classNames(classes.iconContainer, {
            [classes.iconContainerNoAlternative]: !alternativeLabel,
          })}
        >
          <StepIcon
            completed={completed}
            active={active}
            icon={icon}
            alternativeLabel={alternativeLabel}
          />
        </span>
      )}
      <span>
        <Typography variant="body1" component="span" className={labelClassName}>
          {children}
        </Typography>
        {optional}
      </span>
    </span>
  );
}

StepLabel.propTypes = {
  /**
   * @ignore
   * Sets the step as active. Is passed to child components.
   */
  active: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * In most cases will simply be a string containing a title for the label.
   */
  children: PropTypes.node,
  /**
   * Custom styles for component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepLabelButton` is a child of `StepLabel`. Is passed to child components.
   */
  disabled: PropTypes.bool,
  /**
   * Override the default icon.
   */
  icon: PropTypes.node,
  /**
   * @ignore
   */
  last: PropTypes.bool,
  /**
   * The optional node to display.
   */
  optional: PropTypes.node,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

StepLabel.defaultProps = {
  active: false,
  alternativeLabel: false,
  completed: false,
  disabled: false,
  last: false,
  orientation: 'horizontal',
};

StepLabel.muiName = 'StepLabel';

export default withStyles(styles, { name: 'MuiStepLabel' })(StepLabel);
