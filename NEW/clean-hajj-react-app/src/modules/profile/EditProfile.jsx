import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, branch, renderComponent } from 'recompose'
import { editProfile } from './actions'
import { Loader, Container, Button, Input, Card, Error, Head } from '../common'

class EditProfile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: props.auth.user.firstName || '',
			lastName: props.auth.user.lastName || '',
			username: props.auth.user.username || '',
			errorFirstName: undefined,
			errorLastName: undefined,
			errorUsername: undefined,
			error: undefined
		}
	}

	componentDidMount() {
    	if (this.props.auth.error) {
    		this.setState({ error: this.props.auth.error.error })
    	}
	}

    onSubmit = e => {
    	e.preventDefault()

    	const { editProfile, history } = this.props
    	const { firstName, lastName, username } = this.state

    	if (firstName === '') {
    		this.setState({ errorFirstName: 'First name field is required' })
    	} else if (lastName === '') {
    		this.setState({ errorLastName: 'Last name field is required' })
    	} else if (username === '') {
    		this.setState({ errorUsername: 'username field is required' })
    	}

    	const profileData = { firstName, lastName, username }

    	editProfile(profileData, history)
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
    	const {
    		firstName,
    		lastName,
    		username,
    		errorFirstName,
    		errorLastName,
    		errorUsername,
    		error } = this.state
    	return (
    		<Container className="profile-form">
    			<Head
    				url="https://cleanify.netlify.com/edit-profile"
    				title="Edit profile"
    				description="Edit profile"
    			/>
    			<Card className="profile-form-edit">
    				<form onSubmit={this.onSubmit}>
    					<Input type="text" label="First name" name="firstName" value={firstName} onChange={this.handleChange} error={errorFirstName} />
    					<Input type="text" label="Last name" name="lastName" value={lastName} onChange={this.handleChange} error={errorLastName} />
    					<Input type="text" label="Username" name="username" value={username} onChange={this.handleChange} error={errorUsername} />
    					{error !== undefined && <Error>{error}</Error>}
    					<div className="center">
    						<Button type="submit">Submit</Button>
    					</div>
    				</form>
    			</Card>
    		</Container>
    	)
    }
}

const mapStateToProps = state => ({
	auth: state.auth
})

const enhance = compose(
	withRouter,
	connect(mapStateToProps, { editProfile }),
	branch(
		({ auth }) => auth === undefined || auth.loading,
		renderComponent(Loader)
	)
)

export default enhance(EditProfile)
