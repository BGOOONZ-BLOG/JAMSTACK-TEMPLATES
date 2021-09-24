import React from 'react';
import { Link } from 'gatsby';
import Container from 'components/common/Container';
import logo from 'assets/logo.svg';
import NavbarLinks from '../NavbarLinks';
import { Brand, Wrapper, Logo } from './styles';

export default () => (
  <Wrapper as={Container}>
    <Brand as={Link} to="/">
      <Logo src={logo} alt="logo" />
      BE
      <span>AF</span>
    </Brand>
    <NavbarLinks desktop />
  </Wrapper>
);
