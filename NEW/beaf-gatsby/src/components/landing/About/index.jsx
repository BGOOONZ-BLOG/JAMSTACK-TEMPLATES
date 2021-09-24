import React from 'react';
import Container from 'components/common/Container';
import Subscribe from 'components/common/Subscribe';
import aboutIcon from 'assets/illustrations/about.svg';
import { Wrapper, Item, Content } from './styles';

const About = () => (
  <Wrapper as={Container}>
    <Item as={Content}>
      <h1>The community platform for making decisions!</h1>
      <ul>
        <li>Need help to decide the phone you should buy?</li>
        <li>
          Not sure of choices you should take in your professional career?
        </li>
        <li>
          Or you just like to share your experience with the community to help
          them take good decisions?
        </li>
      </ul>
      <h4>Beaf is just the right place for that!</h4>
      <p>
        Be one of our early users and share your feedback with us while trying
        the beta version
      </p>
      <Subscribe />
    </Item>
    <Item>
      <img
        src={aboutIcon}
        alt="about illustration"
        style={{ marginBottom: 0 }}
      />
    </Item>
  </Wrapper>
);

export { About };
