import React from 'react'
import { connect } from 'react-redux'
import { compose, renderComponent, branch } from 'recompose'
import { Button, Container, Loader, Head } from '../common'
import './styles.scss'

const Profile = ({ auth }) => (
	<Container className="empty-profile">
		<Head
			url="https://cleanify.netlify.com/profile"
			title="Profile"
			description="Profile"
		/>
		<h2>Welcome {`${auth.user.firstName} ${auth.user.lastName}`}</h2>
		<div className="center">
			<Button href="/edit-profile">Edit profile</Button>
		</div>
	</Container>
)

const mapStateToProps = ({ auth }) => ({
	auth
})

const enhance = compose(
	connect(mapStateToProps),
	branch(
		({ auth }) => !!auth.loading || !auth,
		renderComponent(Loader)
	)
)

export default enhance(Profile)
