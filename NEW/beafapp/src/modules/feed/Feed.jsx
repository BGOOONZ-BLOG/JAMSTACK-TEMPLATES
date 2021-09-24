import React from 'react'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import {
  getPosts,
  voteBefore,
  voteAfter,
  postNewComment,
  deleteComment,
  deletePost,
} from './actions'
import { Loading, Container, SEO, Empty } from '../../components/common'
import Posts from './components/Posts'
import Discover from './components/Discover'
import { Wrapper } from './styles'

const Feed = ({
  auth,
  posts: { data, page, pages },
  voteBefore,
  voteAfter,
  postNewComment,
  deleteComment,
  deletePost,
  getPosts,
}) => (
  <Wrapper as={Container}>
    <SEO url="/" title="Feed" description="Feed" />
    {data.length > 0 ? (
      <Posts
        title="Recent posts"
        posts={data}
        user={auth.user}
        isLoggedIn={auth.isLoggedIn}
        voteBefore={voteBefore}
        voteAfter={voteAfter}
        postNewComment={postNewComment}
        deleteComment={deleteComment}
        deletePost={deletePost}
        page={page}
        pages={pages}
        getPosts={() => getPosts(page + 1)}
      />
    ) : (
      <Empty follow />
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
      getPosts,
      voteBefore,
      voteAfter,
      postNewComment,
      deleteComment,
      deletePost,
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.getPosts()
    },
  }),
  branch(
    ({ posts, auth }) => !auth || !posts || !posts.data || posts.loading,
    renderComponent(Loading)
  )
)

export default enhance(Feed)
