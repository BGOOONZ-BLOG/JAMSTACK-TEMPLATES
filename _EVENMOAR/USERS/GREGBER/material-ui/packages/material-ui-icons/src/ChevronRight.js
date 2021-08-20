import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let ChevronRight = props =>
  <SvgIconCustom {...props}>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </SvgIconCustom>;

ChevronRight = pure(ChevronRight);
ChevronRight.muiName = 'SvgIcon';

export default ChevronRight;
