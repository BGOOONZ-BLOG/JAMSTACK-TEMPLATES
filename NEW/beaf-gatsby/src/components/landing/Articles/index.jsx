import React from 'react';
import Container from 'components/common/Container';
import Grid from 'components/common/Grid';
import { Wrapper } from './styles';

export const Articles = ({ posts }) => (
  <Wrapper as={Container}>
    <h2>Latest posts</h2>
    <Grid data={posts} />
  </Wrapper>
);
