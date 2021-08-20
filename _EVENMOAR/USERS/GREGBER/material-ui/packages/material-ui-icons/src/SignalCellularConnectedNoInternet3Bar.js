import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let SignalCellularConnectedNoInternet3Bar = props =>
  <SvgIconCustom {...props}>
    <path fillOpacity=".3" d="M22 8V2L2 22h16V8z" /><path d="M17 22V7L2 22h15zm3-12v8h2v-8h-2zm0 12h2v-2h-2v2z" />
  </SvgIconCustom>;

SignalCellularConnectedNoInternet3Bar = pure(SignalCellularConnectedNoInternet3Bar);
SignalCellularConnectedNoInternet3Bar.muiName = 'SvgIcon';

export default SignalCellularConnectedNoInternet3Bar;
