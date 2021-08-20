import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let FormatTextdirectionLToR = props =>
  <SvgIconCustom {...props}>
    <path d="M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4zm12 8l-4-4v3H5v2h12v3l4-4z" />
  </SvgIconCustom>;

FormatTextdirectionLToR = pure(FormatTextdirectionLToR);
FormatTextdirectionLToR.muiName = 'SvgIcon';

export default FormatTextdirectionLToR;
