import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Post, Loading } from '../../../../components/common'
import { Wrapper, Content } from './styles'

const Posts = ({
  posts,
  user,
  voteBefore,
  voteAfter,
  isLoggedIn,
  postNewComment,
  deleteComment,
  deletePost,
  title,
  getPosts,
  page,
  pages,
}) => (
  <Wrapper>
    <Content>
      <h2>{title}</h2>
      <InfiniteScroll
        pageStart={1}
        loadMore={getPosts}
        hasMore={page < pages}
        loader={<Loading key="loader" />}
      >
        {posts.map(post => (
          <Post
            {...post}
            key={post._id}
            unbiased={post.unbiased}
            userId={user && user._id}
            userName={user && user.username}
            isLoggedIn={isLoggedIn}
            voteBefore={voteBefore}
            voteAfter={voteAfter}
            postNewComment={postNewComment}
            deleteComment={deleteComment}
            deletePost={deletePost}
          />
        ))}
      </InfiniteScroll>
    </Content>
  </Wrapper>
)

export default Posts
