import React from 'react'
import { connect } from 'react-redux'
import { compose, renderComponent, branch, lifecycle } from 'recompose'
import {
  Container,
  Loading,
  SEO,
  ProfileDetails,
  Empty,
} from '../../components/common'
import { Wrapper, StyledContainer } from './styles'
import {
  getMyPosts,
  voteBefore,
  voteAfter,
  postNewComment,
  deleteComment,
  deletePost,
} from '../feed/actions'
import Posts from './components/Posts'

const Profile = ({
  auth,
  posts: { data, page, pages },
  voteBefore,
  voteAfter,
  deleteComment,
  postNewComment,
  deletePost,
  getMyPosts,
}) => (
  <StyledContainer as={Container}>
    <SEO
      url="/profile"
      title={auth.user.username}
      description={auth.user.bio}
      cover={auth.user.avatar}
    />
    <Wrapper>
      <ProfileDetails
        loggedIn={auth.isLoggedIn}
        userId={auth.user._id}
        profileId={auth.user._id}
        avatar={auth.user.avatar}
        firstName={auth.user.firstName}
        lastName={auth.user.lastName}
        username={auth.user.username}
        bio={auth.user.bio}
        isVerified={auth.user.isVerified}
        followers={auth.user.followers}
        following={auth.user.following}
      />
      {data.length > 0 ? (
        <Posts
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
          getPosts={() => getMyPosts(page + 1)}
        />
      ) : (
        <Empty profile="true" />
      )}
    </Wrapper>
  </StyledContainer>
)

const mapStateToProps = ({ auth, posts }) => ({
  auth,
  posts,
})

const enhance = compose(
  connect(
    mapStateToProps,
    {
      getMyPosts,
      voteBefore,
      voteAfter,
      postNewComment,
      deleteComment,
      deletePost,
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.getMyPosts()
    },
  }),
  branch(
    ({ posts, auth }) => !auth || !posts || !posts.data || posts.loading,
    renderComponent(Loading)
  )
)

export default enhance(Profile)
