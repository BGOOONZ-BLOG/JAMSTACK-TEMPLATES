import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../common'
import { Wrapper, Details, Avatar, UnFollowBtn } from './styles'

export const SingleUser = ({
  _id,
  avatar,
  username,
  firstName,
  lastName,
  followers,
  myId,
  unFollowUser,
  followUser,
  toggleModal,
  history,
  modal,
}) => {
  return (
    <Wrapper>
      <Link to={`/profile/${_id}`}>
        <Avatar src={avatar} alt={username} />
      </Link>
      <Details>
        {toggleModal ? (
          <Link
            to={`/profile/${_id}`}
            onClick={() => {
              toggleModal(false)
              history.push(`/profile/${_id}`)
            }}
          >
            <h4>{`${firstName} ${lastName}`}</h4>
            <p>{`@${username}`}</p>
          </Link>
        ) : (
          <Link to={`/profile/${_id}`}>
            <h4>{`${firstName} ${lastName}`}</h4>
            <p>{`@${username}`}</p>
          </Link>
        )}
        {myId &&
          !modal &&
          (followers.find(user => user._id === myId) ? (
            <UnFollowBtn
              as={Button}
              onClick={() => unFollowUser(_id, myId)}
              type="button"
              outlined="true"
            >
              <span>Following</span>
            </UnFollowBtn>
          ) : (
            <Button
              onClick={() =>
                followUser(_id, avatar, firstName, lastName, username, myId)
              }
              type="button"
            >
              Follow
            </Button>
          ))}
      </Details>
    </Wrapper>
  )
}
