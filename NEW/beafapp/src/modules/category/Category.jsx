import React from 'react'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import {
  getPostsByCategory,
  voteBefore,
  voteAfter,
  postNewComment,
  deleteComment,
  deletePost,
} from '../feed/actions'
import { Loading, Container, SEO, Empty } from '../../components/common'
import Posts from '../feed/components/Posts'
import Discover from '../feed/components/Discover'
import { Wrapper } from './styles'

const Category = ({
  match: {
    params: { category },
  },
  auth,
  posts: { data, page, pages },
  voteBefore,
  voteAfter,
  postNewComment,
  deleteComment,
  deletePost,
  getPostsByCategory,
}) => (
  <Wrapper as={Container}>
    <SEO
      url={`/category/${category}`}
      title={category}
      description={category}
    />
    {data.length > 0 ? (
      <Posts
        title={category}
        posts={data}
        user={auth.user}
        isLoggedIn={auth.isLoggedIn}
        voteBefore={voteBefore}
        voteAfter={voteAfter}
        postNewComment={postNewComment}
        deleteComment={deleteComment}
        deletePost={deletePost}
        getPosts={() => getPostsByCategory(category, page + 1)}
        page={page}
        pages={pages}
      />
    ) : (
      <Empty />
    )}
    <Discover myId={auth.user && auth.user._id} />
  </Wrapper>
)

const mapStateToProps = ({ posts, auth }) => ({
  posts,
  auth,
})

const enhance = compose(
  connect(
    mapStateToProps,
    {
      getPostsByCategory,
      voteBefore,
      voteAfter,
      postNewComment,
      deleteComment,
      deletePost,
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.getPostsByCategory(this.props.match.params.category)
    },
    componentWillReceiveProps(nextProps) {
      if (nextProps.posts.errors === 'Invalid category') {
        this.props.history.push('/404')
      }

      if (
        nextProps.match.params.category !== this.props.match.params.category
      ) {
        this.props.getPostsByCategory(nextProps.match.params.category)
      }
    },
  }),
  branch(
    ({ posts, auth }) => !auth || !posts || !posts.data || posts.loading,
    renderComponent(Loading)
  )
)

export default enhance(Category)
