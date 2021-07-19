import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import withWidth from 'material-ui/utils/withWidth';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  container: {
    flexGrow: 1,
    paddingTop: 30,
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 54,
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: '100%',
    margin: 12,
  },
  typography: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 5,
  },
});

function BreakpointDown(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Typography variant="subheading" className={classes.typography}>
        Current width: {props.width}
      </Typography>
      <Hidden xsDown>
        <Paper className={classes.paper}>xsDown</Paper>
      </Hidden>
      <Hidden smDown>
        <Paper className={classes.paper}>smDown</Paper>
      </Hidden>
      <Hidden mdDown>
        <Paper className={classes.paper}>mdDown</Paper>
      </Hidden>
      <Hidden lgDown>
        <Paper className={classes.paper}>lgDown</Paper>
      </Hidden>
      <Hidden xlDown>
        <Paper className={classes.paper}>xlDown</Paper>
      </Hidden>
    </div>
  );
}

BreakpointDown.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string,
};

export default compose(withStyles(styles), withWidth())(BreakpointDown);
