import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { withStateHandlers, compose, withProps } from 'recompose'
import { Link } from 'react-router-dom'
import { Modal } from '../../../Modal'
import { CancelMark } from '../../../../common'
import {
  Wrapper,
  SingleComment,
  Flex,
  More,
  CommentDetails,
  SubFlex,
} from './styles'

TimeAgo.addLocale(en)

const timeAgo = new TimeAgo('en-US')

const Comments = ({
  post_id,
  comments,
  showComments,
  userId,
  confirm,
  isVisible,
  showModal,
  setComment,
  state_post_id,
  state_id,
}) => {
  const replies = showComments ? comments : comments.slice(0, 3)
  return (
    <>
      <Wrapper>
        {replies
          .sort((a, b) => (a.date < b.date ? 1 : -1))
          .map(({ _id, creator_id, creator_username, comment, date }) => (
            <SingleComment key={_id}>
              <CommentDetails>
                <Flex>
                  <SubFlex>
                    <Link to={`/profile/${creator_id}`}>
                      {creator_username}
                    </Link>
                    <i>{timeAgo.format(Date.parse(date))}</i>
                  </SubFlex>
                  <p>{comment}</p>
                </Flex>
              </CommentDetails>
              {userId === creator_id && (
                <CancelMark
                  toggle={() => setComment(post_id, _id)}
                  alt="close modal"
                  flex
                />
              )}
            </SingleComment>
          ))}
        {!showComments && comments.length > 3 && (
          <More>
            <Link to={`/post/${post_id}`}>More comments</Link>
          </More>
        )}
      </Wrapper>
      {isVisible && (
        <Modal
          title="Are you sure you want to delete this comment?"
          action="Confirm"
          onPress={() => confirm(state_post_id, state_id, showModal)}
          cancel={showModal}
        />
      )}
    </>
  )
}

const enhance = compose(
  withProps(({ deleteComment }) => ({
    deleteComment,
  })),
  withStateHandlers(
    {
      isVisible: false,
      state_post_id: '',
      state_id: '',
    },
    {
      setComment: () => (post_id, _id) => ({
        state_post_id: post_id,
        state_id: _id,
        isVisible: true,
      }),
      showModal: ({ isVisible }) => () => ({
        isVisible: !isVisible,
        state_id: '',
        state_post_id: '',
      }),
      confirm: (_state, { deleteComment }) => async (
        post_id,
        _id,
        callback
      ) => {
        await deleteComment(post_id, _id)
        callback()
      },
    }
  )
)

export default enhance(Comments)
