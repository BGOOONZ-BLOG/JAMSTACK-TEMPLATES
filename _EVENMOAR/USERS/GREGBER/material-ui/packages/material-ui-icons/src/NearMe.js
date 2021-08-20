import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let NearMe = props =>
  <SvgIconCustom {...props}>
    <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
  </SvgIconCustom>;

NearMe = pure(NearMe);
NearMe.muiName = 'SvgIcon';

export default NearMe;
