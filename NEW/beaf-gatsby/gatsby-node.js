const path = require('path');
const postsQuery = require('./postQuery');

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  try {
    const postTemplate = path.resolve('./src/templates/post.js');

    const res = await graphql(postsQuery);

    res.data.posts.edges.forEach(({ node: { frontmatter: { slug } } }) => {
      createPage({
        path: slug,
        component: postTemplate,
        context: {
          slug,
        },
      });
    });

    if (res.errors) {
      throw new Error(res.errors);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
