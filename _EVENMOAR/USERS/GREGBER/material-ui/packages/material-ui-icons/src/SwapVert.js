import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let SwapVert = props =>
  <SvgIconCustom {...props}>
    <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z" />
  </SvgIconCustom>;

SwapVert = pure(SwapVert);
SwapVert.muiName = 'SvgIcon';

export default SwapVert;
