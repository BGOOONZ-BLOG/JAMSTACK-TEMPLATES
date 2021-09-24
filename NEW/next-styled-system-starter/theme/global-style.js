import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *, ::after, ::before {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: #f3f3f5;
		color: #000;
  }
`;
