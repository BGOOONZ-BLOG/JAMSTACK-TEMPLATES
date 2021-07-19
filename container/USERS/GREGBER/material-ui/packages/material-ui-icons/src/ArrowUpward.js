import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let ArrowUpward = props =>
  <SvgIconCustom {...props}>
    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
  </SvgIconCustom>;

ArrowUpward = pure(ArrowUpward);
ArrowUpward.muiName = 'SvgIcon';

export default ArrowUpward;
