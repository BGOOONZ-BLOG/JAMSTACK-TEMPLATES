import React from 'react'
import Tooltip from 'react-simple-tooltip'
import { Link } from 'react-router-dom'
import { Wrapper, Floating, Btn } from './styles'
import beforeIcon from '../../assets/before.svg'
import afterIcon from '../../assets/after.svg'

export const Vote = ({
  isLoggedIn,
  _id,
  userId,
  before_votes,
  after_votes,
  voteBefore,
  voteAfter,
  unbiased,
}) => (
  <Wrapper>
    <Btn before>
      <Tooltip content="Vote!">
        {isLoggedIn ? (
          <Floating
            voted={before_votes.includes(userId)}
            onClick={() => voteBefore(_id, userId)}
            before="true"
          >
            <img src={beforeIcon} alt="vote before" />
          </Floating>
        ) : (
          <Floating as={Link} to="/login" islink="true" before="true">
            <img src={beforeIcon} alt="vote before" />
          </Floating>
        )}
      </Tooltip>
      {(!unbiased ||
        before_votes.includes(userId) ||
        after_votes.includes(userId)) && <p>{before_votes.length}</p>}
    </Btn>
    <Btn>
      <Tooltip content="Vote!">
        {isLoggedIn ? (
          <Floating
            voted={after_votes.includes(userId)}
            onClick={() => voteAfter(_id, userId)}
          >
            <img src={afterIcon} alt="vote before" />
          </Floating>
        ) : (
          <Floating as={Link} islink="true" to="/login">
            <img src={afterIcon} alt="vote after" />
          </Floating>
        )}
      </Tooltip>
      {(!unbiased ||
        after_votes.includes(userId) ||
        before_votes.includes(userId)) && <p>{after_votes.length}</p>}
    </Btn>
  </Wrapper>
)
