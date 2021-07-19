import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let CallMade = props =>
  <SvgIconCustom {...props}>
    <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z" />
  </SvgIconCustom>;

CallMade = pure(CallMade);
CallMade.muiName = 'SvgIcon';

export default CallMade;
