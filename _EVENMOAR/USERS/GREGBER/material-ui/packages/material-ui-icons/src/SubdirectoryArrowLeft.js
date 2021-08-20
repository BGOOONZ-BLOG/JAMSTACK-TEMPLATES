import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let SubdirectoryArrowLeft = props =>
  <SvgIconCustom {...props}>
    <path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z" />
  </SvgIconCustom>;

SubdirectoryArrowLeft = pure(SubdirectoryArrowLeft);
SubdirectoryArrowLeft.muiName = 'SvgIcon';

export default SubdirectoryArrowLeft;
