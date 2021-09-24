import React from 'react';
import { Link } from 'gatsby';
import Container from 'components/common/Container';
import { Links, Item, Wrapper } from './styles';

const Copyrights = () => (
  <Wrapper as={Container}>
    <Links>
      ©{' '}
      <Item as={Link} to="/">
        BEAF
      </Item>{' '}
      {new Date().getFullYear()}
    </Links>
  </Wrapper>
);

export default Copyrights;
