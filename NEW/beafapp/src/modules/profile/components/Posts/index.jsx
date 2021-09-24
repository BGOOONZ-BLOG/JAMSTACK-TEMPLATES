import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Post, Loading } from '../../../../components/common'
import { Wrapper, Flex } from './styles'

const Posts = ({ posts, isLoggedIn, user, getPosts, page, pages }) => (
  <Wrapper>
    <h2>Posts</h2>
    <Flex
      as={InfiniteScroll}
      pageStart={1}
      loadMore={getPosts}
      hasMore={page < pages}
      loader={
        <div key="loader" style={{ textAlign: 'center', width: '100%' }}>
          <Loading />
        </div>
      }
    >
      {posts.map(post => (
        <Post
          flex
          profile
          {...post}
          key={post._id}
          userId={user && user._id}
          userName={user && user.username}
          isLoggedIn={isLoggedIn}
          /* voteBefore={voteBefore}
					voteAfter={voteAfter}
					postNewComment={postNewComment}
					deleteComment={deleteComment}
					deletePost={deletePost} */
        />
      ))}
    </Flex>
  </Wrapper>
)

export default Posts
