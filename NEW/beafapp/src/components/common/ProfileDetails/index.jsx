import React from 'react'
import Tooltip from 'react-simple-tooltip'
import ImageZoom from 'react-medium-image-zoom'
import { compose, withStateHandlers } from 'recompose'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import { Wrapper, Flex, Details, UnFollowBtn } from './styles'
import { Button, DefaultBtn } from '../../common'
import verifiedIcon from './assets/verified.svg'

const ProfileWrapper = ({
  isVisible,
  toggleModal,
  modalContent,
  loggedIn,
  profileId,
  userId,
  avatar,
  isVerified,
  firstName,
  lastName,
  username,
  bio = '404 Bio not found!',
  followers,
  following,
  unFollowUser,
  followUser,
  contentTitle,
  myAvatar,
  myFirstName,
  myLastName,
  myUsername,
}) => (
  <Wrapper>
    <Flex>
      <Details>
        <h2>
          <span>
            {firstName} {lastName}
          </span>
          {isVerified && (
            <Tooltip
              placement="right"
              fadeDuration={500}
              content="Verified account"
            >
              <img src={verifiedIcon} alt="Verified Account" />
            </Tooltip>
          )}
        </h2>
        <h4>@{username}</h4>
        <p>{bio}</p>
        <DefaultBtn
          type="button"
          disabled={followers.length < 1}
          onClick={() => {
            if (followers) toggleModal(true, followers, 'Followers')
            else alert(`You don't seem to have any followers yet!`)
          }}
        >
          {followers.length} Followers
        </DefaultBtn>
        <DefaultBtn
          type="button"
          disabled={following.length < 1}
          onClick={() => {
            if (following) toggleModal(true, following, 'Following')
            else alert(`Start following someone to help them make decisions!`)
          }}
        >
          {following.length} Following
        </DefaultBtn>
      </Details>
      <ImageZoom
        image={{
          src: avatar,
          alt: username,
          className: 'avatar',
        }}
      />
    </Flex>
    {loggedIn &&
      (userId === profileId ? (
        <Button as={Link} to="/profile/edit">
          Edit Profile
        </Button>
      ) : followers.find(user => user._id === userId) ? (
        <UnFollowBtn
          as={Button}
          onClick={() => unFollowUser(profileId, userId, true)}
          type="button"
          outlined="true"
        >
          <span>Following</span>
        </UnFollowBtn>
      ) : (
        <Button
          onClick={() =>
            followUser(
              profileId,
              myAvatar,
              myFirstName,
              myLastName,
              myUsername,
              userId,
              true
            )
          }
          type="button"
        >
          Follow
        </Button>
      ))}
    {isVisible && (
      <Modal
        contentTitle={contentTitle}
        toggleModal={toggleModal}
        content={modalContent}
        followUser={followUser}
        unFollowUser={unFollowUser}
        myId={userId}
      />
    )}
  </Wrapper>
)

const enhance = compose(
  withStateHandlers(
    ({ followers }) => ({
      isVisible: false,
      modalContent: followers,
      contentTitle: 'Followers',
    }),
    {
      toggleModal: () => (value, content, contentTitle) => ({
        isVisible: value,
        modalContent: content,
        contentTitle,
      }),
    }
  )
)

export const ProfileDetails = enhance(ProfileWrapper)
