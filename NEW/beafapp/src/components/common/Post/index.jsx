import React from 'react'
import { Wrapper, UnbiasedBadge, Badge } from './styles'
import { Pictures, Content, Vote, AddComment } from './components'
import Comments from './components/Comments'
import PostHeader from './components/PostHeader'

export const Post = ({
  _id,
  title,
  description,
  before_img,
  after_img,
  date,
  userId,
  voteBefore,
  voteAfter,
  before_votes,
  after_votes,
  _creator_username,
  _creator,
  isLoggedIn,
  userName,
  postNewComment,
  comments,
  showComments,
  deleteComment,
  deletePost,
  flex,
  profile,
  unbiased,
}) => (
  <Wrapper flex={flex}>
    <PostHeader
      date={date}
      post_id={_id}
      _creator={_creator}
      userId={userId}
      _creator_username={_creator_username}
      deletePost={deletePost}
    />
    {unbiased && (
      <UnbiasedBadge>
        <Badge>Unbiased</Badge>
      </UnbiasedBadge>
    )}
    <Pictures before_img={before_img} after_img={after_img} title={title} />
    <Content title={title} description={description} />
    {!profile && (
      <Vote
        _id={_id}
        userId={userId}
        voteBefore={voteBefore}
        voteAfter={voteAfter}
        before_votes={before_votes}
        after_votes={after_votes}
        isLoggedIn={isLoggedIn}
        unbiased={unbiased}
      />
    )}
    {!profile && (
      <Comments
        post_id={_id}
        comments={comments}
        userId={userId}
        deleteComment={deleteComment}
        showComments={showComments}
      />
    )}
    {!profile && isLoggedIn && (
      <AddComment
        _id={_id}
        creator_id={userId}
        creator_username={userName}
        postNewComment={postNewComment}
      />
    )}
  </Wrapper>
)
