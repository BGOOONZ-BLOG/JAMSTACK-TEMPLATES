import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let ChatBubbleOutline = props =>
  <SvgIconCustom {...props}>
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
  </SvgIconCustom>;

ChatBubbleOutline = pure(ChatBubbleOutline);
ChatBubbleOutline.muiName = 'SvgIcon';

export default ChatBubbleOutline;
