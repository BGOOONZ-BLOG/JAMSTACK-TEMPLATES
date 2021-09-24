import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/common/Layout';
import SEO from 'components/common/SEO';
import { Content } from 'components/article';

export default ({
  data: {
    post: {
      html,
      timeToRead,
      frontmatter: { title, date, slug, thumbnail },
    },
  },
}) => (
  <Layout>
    <SEO
      type="NewsArticle"
      title={title}
      articleBody={html}
      datePublished={date}
      dateModified={date}
      cover={thumbnail.childImageSharp.fluid.originalImg}
      location={slug}
    />
    <div style={{ paddingTop: '8rem' }}>
      <Content
        title={title}
        content={html}
        date={date}
        timeToRead={timeToRead}
      />
    </div>
  </Layout>
);

export const postQuery = graphql`
  query($slug: String!) {
    post: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 700) {
              originalImg
            }
          }
        }
      }
    }
  }
`;
