import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let TrendingDown = props =>
  <SvgIconCustom {...props}>
    <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z" />
  </SvgIconCustom>;

TrendingDown = pure(TrendingDown);
TrendingDown.muiName = 'SvgIcon';

export default TrendingDown;
