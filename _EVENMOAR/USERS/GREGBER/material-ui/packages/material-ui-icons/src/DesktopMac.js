import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let DesktopMac = props =>
  <SvgIconCustom {...props}>
    <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z" />
  </SvgIconCustom>;

DesktopMac = pure(DesktopMac);
DesktopMac.muiName = 'SvgIcon';

export default DesktopMac;
