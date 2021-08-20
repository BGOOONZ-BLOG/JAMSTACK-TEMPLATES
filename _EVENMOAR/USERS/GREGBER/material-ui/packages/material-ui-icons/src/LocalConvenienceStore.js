import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let LocalConvenienceStore = props =>
  <SvgIconCustom {...props}>
    <path d="M19 7V4H5v3H2v13h8v-4h4v4h8V7h-3zm-8 3H9v1h2v1H8V9h2V8H8V7h3v3zm5 2h-1v-2h-2V7h1v2h1V7h1v5z" />
  </SvgIconCustom>;

LocalConvenienceStore = pure(LocalConvenienceStore);
LocalConvenienceStore.muiName = 'SvgIcon';

export default LocalConvenienceStore;
