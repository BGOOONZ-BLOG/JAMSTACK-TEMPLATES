import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let BubbleChart = props =>
  <SvgIconCustom {...props}>
    <circle cx="7.2" cy="14.4" r="3.2" /><circle cx="14.8" cy="18" r="2" /><circle cx="15.2" cy="8.8" r="4.8" />
  </SvgIconCustom>;

BubbleChart = pure(BubbleChart);
BubbleChart.muiName = 'SvgIcon';

export default BubbleChart;
