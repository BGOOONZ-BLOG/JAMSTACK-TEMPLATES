import React from 'react';
import Container from 'components/common/Container';
import { Wrapper, Post } from './styles';

export const Content = ({ title, date, timeToRead, content }) => (
  <Wrapper as={Container}>
    <h1>{title}</h1>
    <div>{date}</div>
    <div>{timeToRead} min read</div>
    <Post dangerouslySetInnerHTML={{ __html: content }} />
  </Wrapper>
);
