import React from 'react'
import { connect } from 'react-redux'
import { compose, renderComponent, branch } from 'recompose'
import { Container, Loading, SEO } from '../../components/common'
import { Wrapper, StyledContainer } from './styles'
import { editProfile } from './actions'
import EditForm from './components/EditForm'

const EditProfile = ({ auth: { user }, editProfile }) => (
  <StyledContainer as={Container}>
    <SEO url="/profile/edit" title={user.username} description={user.bio} />
    <Wrapper>
      <EditForm editProfile={editProfile} {...user} />
    </Wrapper>
  </StyledContainer>
)

const mapStateToProps = ({ auth }) => ({ auth })

const enhance = compose(
  connect(
    mapStateToProps,
    {
      editProfile,
    }
  ),
  branch(({ auth }) => !auth || auth.loading, renderComponent(Loading))
)

export default enhance(EditProfile)
