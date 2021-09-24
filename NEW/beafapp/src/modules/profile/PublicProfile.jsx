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
import { StyledContainer, Wrapper } from './styles'
import {
  getPostsByUserId,
  voteBefore,
  voteAfter,
  postNewComment,
  deleteComment,
  deletePost,
} from '../feed/actions'
import { followUser, unFollowUser } from '../discover/actions'
import { getUserById } from './actions'
import Posts from './components/Posts'

const PublicProfile = ({
  profile: { profile },
  auth: { user, isLoggedIn },
  posts: { data, page, pages },
  voteBefore,
  voteAfter,
  deleteComment,
  postNewComment,
  deletePost,
  unFollowUser,
  followUser,
  getPostsByUserId,
}) => (
  <StyledContainer as={Container}>
    <SEO
      url={`/profile/${profile._id}`}
      title={profile.username}
      description={profile.bio}
    />
    <Wrapper>
      <ProfileDetails
        loggedIn={user && isLoggedIn}
        userId={user && user._id}
        profileId={profile._id}
        avatar={profile.avatar}
        firstName={profile.firstName}
        lastName={profile.lastName}
        username={profile.username}
        bio={profile.bio}
        isVerified={profile.isVerified}
        followers={profile.followers}
        following={profile.following}
        unFollowUser={unFollowUser}
        followUser={followUser}
        myAvatar={user && user.avatar}
        myFirstName={user && user.firstName}
        myLastName={user && user.lastName}
        myUsername={user && user.username}
      />
      {data.length > 0 ? (
        <Posts
          posts={data}
          user={user}
          isLoggedIn={isLoggedIn}
          voteBefore={voteBefore}
          voteAfter={voteAfter}
          postNewComment={postNewComment}
          deleteComment={deleteComment}
          deletePost={deletePost}
          page={page}
          pages={pages}
          getPosts={() => getPostsByUserId(profile._id, page + 1)}
        />
      ) : (
        <Empty
          profile="true"
          publicProfile={isLoggedIn && user && user._id !== profile._id}
        />
      )}
    </Wrapper>
  </StyledContainer>
)

const mapStateToProps = ({ profile, posts, auth }) => ({
  auth,
  profile,
  posts,
})

const enhance = compose(
  connect(
    mapStateToProps,
    {
      getPostsByUserId,
      getUserById,
      voteBefore,
      voteAfter,
      postNewComment,
      deleteComment,
      deletePost,
      unFollowUser,
      followUser,
    }
  ),
  lifecycle({
    async componentDidMount() {
      await this.props.getUserById(this.props.match.params.user_id)
      this.props.getPostsByUserId(this.props.match.params.user_id)
    },
  }),
  branch(
    ({ posts, profile, auth }) =>
      !auth ||
      !profile ||
      !profile.profile ||
      !posts ||
      !posts.data ||
      posts.loading,
    renderComponent(Loading)
  )
)

export default enhance(PublicProfile)
