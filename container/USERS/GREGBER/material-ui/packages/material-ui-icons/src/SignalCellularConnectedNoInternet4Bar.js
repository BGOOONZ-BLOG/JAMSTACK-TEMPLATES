import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let SignalCellularConnectedNoInternet4Bar = props =>
  <SvgIconCustom {...props}>
    <path d="M20 18h2v-8h-2v8zm0 4h2v-2h-2v2zM2 22h16V8h4V2L2 22z" />
  </SvgIconCustom>;

SignalCellularConnectedNoInternet4Bar = pure(SignalCellularConnectedNoInternet4Bar);
SignalCellularConnectedNoInternet4Bar.muiName = 'SvgIcon';

export default SignalCellularConnectedNoInternet4Bar;
