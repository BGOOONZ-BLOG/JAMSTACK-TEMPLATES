import React from 'react';
import Header from 'components/theme/Header';
import Footer from 'components/theme/Footer';
import './layout.css';
import { GlobalStyle } from './styles';

export default ({ children }) => (
  <>
    <GlobalStyle />
    <Header />
    {children}
    <Footer />
  </>
);
