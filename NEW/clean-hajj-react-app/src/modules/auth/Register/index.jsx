import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, renderComponent, branch } from 'recompose'
import { Input, Button, Loader, Card, Container, Head } from '../../common'
import { register } from '../actions'
import isEmpty from '../../../utils/isEmpty'
import '../styles.scss'

class Register extends Component {
	state = {
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		emailError: false,
		passwordError: false,
		confirmPasswordError: false,
		firstNameError: false,
		lastNameError: false,
		usernameError: false,
		errors: {}
	}

	componentDidMount() {
		if (this.props.auth.errors) {
			this.setState({ errors: this.props.auth.errors })
		}
	}

	onSubmit = e => {
		e.preventDefault()
		const { email, password, firstName, lastName, username, confirmPassword } = this.state
		const { register } = this.props
		if (firstName === '') {
			this.setState({ firstNameError: 'firstName is required' })
		} else if (lastName === '') {
			this.setState({ lastNameError: 'lastName is required' })
		} else if (username === '') {
			this.setState({ usernameError: 'username is required' })
		} else if (email === '') {
			this.setState({ emailError: 'Email is required' })
		} else if (!this.validateEmail(email)) {
			this.setState({ emailError: 'Invalid email' })
		} else if (password === '') {
			this.setState({ passwordError: 'Password is required' })
		} else if (password !== confirmPassword) {
			this.setState({ confirmPasswordError: 'Passwords don\'t match' })
		} else {
			this.setState({
				firstNameError: false,
				lastNameError: false,
				usernameError: false,
				emailError: false,
				passwordError: false,
				confirmPasswordError: false,
				errors: {}
			})
			register(firstName, lastName, username, email, password)
		}
	}

	validateEmail = emailToBeValidate => {
		const RE = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
		return RE.test(emailToBeValidate)
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value })

	render() {
		const {
			email,
			password,
			confirmPassword,
			firstName,
			lastName,
			username,
			emailError,
			passwordError,
			firstNameError,
			lastNameError,
			usernameError,
			confirmPasswordError,
			errors
		} = this.state
		return (
			<Container className="signup">
				<Head
					url="https://cleanify.netlify.com/register"
					title="Create an account"
					description="Register"
				/>
				<Card>
					<form onSubmit={this.onSubmit}>
						<Input type="text" label="First name" name="firstName" value={firstName} onChange={this.handleChange} error={!isEmpty(errors) && errors.firstName ? errors.firstName.message : firstNameError} />
						<Input type="text" label="Last name" name="lastName" value={lastName} onChange={this.handleChange} error={!isEmpty(errors) && errors.lastName ? errors.lastName.message : lastNameError} />
						<Input type="text" label="Username" name="username" value={username} onChange={this.handleChange} error={!isEmpty(errors) && errors.username ? errors.username.message : usernameError} />
						<Input type="text" label="Email" name="email" value={email} onChange={this.handleChange} error={!isEmpty(errors) && errors.email ? errors.email.message : emailError} />
						<Input type="password" label="Password" name="password" value={password} onChange={this.handleChange} error={!isEmpty(errors) && errors.password ? errors.password.message : passwordError} />
						<Input type="password" label="Confirm password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} error={confirmPasswordError} />
						<div className="center">
							<Button type="submit">Register</Button>
						</div>
						<p className="center">Already have an account? Please <Link to="/">Login</Link></p>
					</form>
				</Card>
			</Container>
		)
	}
}

const mapStateToProps = ({ auth }) => ({
	auth
})

const enhance = compose(
	connect(mapStateToProps, { register }),
	branch(
		({ auth }) => auth === undefined || auth.loading,
		renderComponent(Loader)
	)
)

export default enhance(Register)
