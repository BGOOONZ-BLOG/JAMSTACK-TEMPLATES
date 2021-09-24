import React from 'react'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  getPostById,
  voteBefore,
  voteAfter,
  postNewComment,
  deleteComment,
  deletePost,
} from './actions'
import { Loading, SEO, Post, Container, Button } from '../../components/common'
import { Wrapper, Overlay, Left } from './styles'
import backArrow from './assets/back.svg'

const PostPage = ({
  auth,
  singlePost,
  voteBefore,
  voteAfter,
  postNewComment,
  deleteComment,
  deletePost,
  history,
}) => (
  <Wrapper>
    <SEO
      url={`/post/${singlePost.post._id}`}
      title={singlePost.post.title}
      description={singlePost.post.description}
      cover={singlePost.post.before_img}
    />
    <Overlay as={Container}>
      <Left>
        <button
          type="button"
          onClick={() => {
            if (history.action === 'PUSH') history.goBack()
            else history.push('/')
          }}
        >
          <img src={backArrow} alt="Go Back" />
          <span>Back to the feed</span>
        </button>
      </Left>
      <Post
        {...singlePost.post}
        userId={auth.user && auth.user._id}
        isLoggedIn={auth.isLoggedIn}
        userName={auth.user && auth.user.username}
        voteBefore={voteBefore}
        voteAfter={voteAfter}
        postNewComment={postNewComment}
        deleteComment={deleteComment}
        deletePost={deletePost}
        showComments
      />
      {!auth.isLoggedIn && (
        <Button
          confirm="true"
          as={Link}
          to={`/register/?from=${singlePost.post.title}`}
        >
          Sign Up to vote!
        </Button>
      )}
    </Overlay>
  </Wrapper>
)

const mapStateToProps = ({ singlePost, auth }) => ({
  singlePost,
  auth,
})

const enhance = compose(
  connect(
    mapStateToProps,
    {
      getPostById,
      voteBefore,
      voteAfter,
      postNewComment,
      deleteComment,
      deletePost,
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.getPostById(this.props.match.params.post_id)
    },
    componentWillReceiveProps(nextProps) {
      if (nextProps.singlePost.errors === 'Invalid ID') {
        this.props.history.push('/404')
      }

      if (nextProps.match.params.post_id !== this.props.match.params.post_id) {
        this.props.getPostById(nextProps.match.params.post_id)
      }
    },
  }),
  branch(
    ({ singlePost, auth }) =>
      !auth || !singlePost || !singlePost.post || singlePost.loading,
    renderComponent(Loading)
  )
)

export default enhance(PostPage)
