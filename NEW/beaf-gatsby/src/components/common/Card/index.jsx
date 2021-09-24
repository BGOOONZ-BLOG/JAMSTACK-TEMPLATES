import React from 'react';
import { navigate } from 'gatsby';
import Img from 'gatsby-image';
import {
  Item,
  Post,
  ArticleContent,
  ArticleImg,
  ArticleTitle,
  Paragraph,
  Info,
  StyledSpan,
} from './styles';

const Card = ({ description, title, slug, thumbnail, date, timeToRead }) => (
  <Item>
    <Post onClick={() => navigate(slug)}>
      <ArticleImg>
        <Img fluid={thumbnail.childImageSharp.fluid} />
      </ArticleImg>
      <ArticleContent>
        <ArticleTitle>{title}</ArticleTitle>
        <Paragraph>{description}</Paragraph>
        <Info>
          {date}
          <StyledSpan>{timeToRead} min read</StyledSpan>
        </Info>
      </ArticleContent>
    </Post>
  </Item>
);

export default Card;
