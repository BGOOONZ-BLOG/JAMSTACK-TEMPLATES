import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let CallMissed = props =>
  <SvgIconCustom {...props}>
    <path d="M19.59 7L12 14.59 6.41 9H11V7H3v8h2v-4.59l7 7 9-9z" />
  </SvgIconCustom>;

CallMissed = pure(CallMissed);
CallMissed.muiName = 'SvgIcon';

export default CallMissed;
