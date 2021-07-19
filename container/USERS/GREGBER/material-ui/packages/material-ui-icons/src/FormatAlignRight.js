import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let FormatAlignRight = props =>
  <SvgIconCustom {...props}>
    <path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z" />
  </SvgIconCustom>;

FormatAlignRight = pure(FormatAlignRight);
FormatAlignRight.muiName = 'SvgIcon';

export default FormatAlignRight;
