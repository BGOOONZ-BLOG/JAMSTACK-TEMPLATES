import {StyledLink} from 'baseui/link';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const LinkConfig: TConfig = {
  componentName: 'StyledLink',
  imports: {
    'baseui/link': {
      named: ['StyledLink'],
    },
  },
  scope: {StyledLink},
  theme: ['linkText', 'linkVisited', 'linkHover', 'linkActive'],
  props: {
    children: {
      value: 'Link to Base Web',
      type: PropTypes.ReactNode,
      description: `Link's content.`,
    },
    href: {
      value: 'https://baseweb.design',
      type: PropTypes.String,
      description: 'The URL that the hyperlink points to.',
    },
    animateUnderline: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Indicates that the link underline is animated.',
    },
  },
};

export default LinkConfig;
