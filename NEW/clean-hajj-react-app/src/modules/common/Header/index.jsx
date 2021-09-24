import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, lifecycle } from 'recompose'
import { Link } from 'react-router-dom'
import { logout } from '../../auth/actions'
import { getTrashcans } from '../../dashboard/actions'
import { Container, Button, Avatar } from '../../common'
import logoutMobile from '../../../assets/logout.svg'
// import notificationIcon from '../../../assets/notification.svg'
import './styles.scss'

class Header extends Component {
	render() {
		const { logout, auth } = this.props
		return (
			<div className="header-container">
				<Container className="header">
					<h2>
						<Link to="/dashboard" style={{ textDecoration: 'none', color: '#212121' }}>Cleanify</Link>
					</h2>
					<div className="logout-mobile" onClick={logout}>
						<p>Logout</p>
						<img src={logoutMobile} alt="logout icon" />
					</div>
					<div className="left">
						<p>Hello {auth.user.username}!</p>
						{auth.user.type === 'customer' && <p>{auth.user.points} points</p>}
						{/* auth.user.type === 'worker' && reportedTrashcan !== undefined
						&& (
							<Link className="bell" data-bell="1" to={`/dashboard/${reportedTrashcan._id}`}
							style={{ marginRight: '.5rem' }}>
								<img src={notificationIcon} width="24" height="24" alt="notification" />
							</Link>
						) */}
						<Link to="/profile">
							<Avatar type={auth.user.type} />
						</Link>
						<Button onClick={logout}>Logout</Button>
					</div>
				</Container>
			</div>
		)
	}
}

const mapStateToProps = ({ auth, trashcan }) => ({
	auth,
	trashcan
})

const enhance = compose(
	connect(mapStateToProps, { logout, getTrashcans }),
	lifecycle({
		componentWillMount() {
			this.props.getTrashcans()
		}
	}),
	branch(
		({ auth }) => !!auth.loading || !auth,
		renderNothing()
	)
)

export default enhance(Header)
