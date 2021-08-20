import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let FormatAlignLeft = props =>
  <SvgIconCustom {...props}>
    <path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z" />
  </SvgIconCustom>;

FormatAlignLeft = pure(FormatAlignLeft);
FormatAlignLeft.muiName = 'SvgIcon';

export default FormatAlignLeft;
