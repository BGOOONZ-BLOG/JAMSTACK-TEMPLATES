import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '70%',
  },
};

type ProvidedProps = {
  classes: Object,
  theme?: Object,
};

function Icons(props: ProvidedProps) {
  return (
    <div className={props.classes.root}>
      <Icon>add_circle</Icon>
      <Icon color="secondary">add_circle</Icon>
      <Icon color="action">add_circle</Icon>
      <Icon color="disabled">add_circle</Icon>
      <Icon color="primary" style={{ fontSize: 30 }}>
        add_circle
      </Icon>
      <Icon color="error" style={{ fontSize: 36 }}>
        add_circle
      </Icon>
    </div>
  );
}

Icons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Icons);
