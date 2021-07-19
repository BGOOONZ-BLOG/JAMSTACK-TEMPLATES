import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let ArrowForward = props =>
  <SvgIconCustom {...props}>
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </SvgIconCustom>;

ArrowForward = pure(ArrowForward);
ArrowForward.muiName = 'SvgIcon';

export default ArrowForward;
