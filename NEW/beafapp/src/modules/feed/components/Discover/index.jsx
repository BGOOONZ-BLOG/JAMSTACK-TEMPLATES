import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle, renderComponent, branch } from 'recompose'
import { Wrapper, Fixed, Block } from './styles'
import { getUsers, followUser, unFollowUser } from '../../../discover/actions'
import { SingleUser, Loading } from '../../../../components/common'

const Discover = ({ users, followUser, unFollowUser, myId }) => (
  <Wrapper>
    <Fixed>
      <h2>Discover people</h2>
      <Block>
        {users.data.map(user => (
          <SingleUser
            key={user._id}
            {...user}
            unFollowUser={unFollowUser}
            followUser={followUser}
            myId={myId}
          />
        ))}
      </Block>
      <p>© {new Date().getFullYear()} Beaf</p>
    </Fixed>
  </Wrapper>
)

const mapStateToProps = ({ users }) => ({ users })

const enhance = compose(
  connect(
    mapStateToProps,
    {
      getUsers,
      followUser,
      unFollowUser,
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.getUsers()
    },
  }),
  branch(
    ({ users }) => !users || !users.data || users.loading,
    renderComponent(Loading)
  )
)

export default enhance(Discover)
