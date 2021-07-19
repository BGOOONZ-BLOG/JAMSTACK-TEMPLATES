import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let FormatAlignCenter = props =>
  <SvgIconCustom {...props}>
    <path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z" />
  </SvgIconCustom>;

FormatAlignCenter = pure(FormatAlignCenter);
FormatAlignCenter.muiName = 'SvgIcon';

export default FormatAlignCenter;
