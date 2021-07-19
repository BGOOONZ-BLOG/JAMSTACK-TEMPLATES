import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let FullscreenExit = props =>
  <SvgIconCustom {...props}>
    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
  </SvgIconCustom>;

FullscreenExit = pure(FullscreenExit);
FullscreenExit.muiName = 'SvgIcon';

export default FullscreenExit;
