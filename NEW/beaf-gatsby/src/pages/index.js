import React from 'react';
import Layout from 'components/common/Layout';
import SEO from 'components/common/SEO';
import { About, Articles, Users } from 'components/landing';
import { graphql, useStaticQuery } from 'gatsby';

export default () => {
  const {
    posts: { edges },
  } = useStaticQuery(graphql`
    query {
      posts: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 20
      ) {
        edges {
          node {
            excerpt(pruneLength: 230)
            id
            timeToRead
            frontmatter {
              title
              date(formatString: "MMM DD, YYYY")
              slug
              thumbnail {
                childImageSharp {
                  fluid(maxWidth: 630) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  return (
    <Layout>
      <SEO
        title="The community platform for making decisions!"
        type="Organization"
      />
      <About />
      {/* <Features /> */}
      <Articles posts={edges} />
      <Users />
    </Layout>
  );
};
