import React, { useState } from 'react';
import Navbar from './Navbar';
import Hamburger from './Hamburger';
import Sidebar from './Sidebar';
import { StyledHeader, Overlay } from './styles';

export default () => {
  const [sidebar, setSidebar] = useState(false);
  const toggle = () => setSidebar(!sidebar);

  return (
    <StyledHeader>
      <Overlay sidebar={sidebar} onClick={toggle} />
      <Navbar />
      <Hamburger sidebar={sidebar} toggle={toggle} />
      <Sidebar sidebar={sidebar} toggle={toggle} />
    </StyledHeader>
  );
};
