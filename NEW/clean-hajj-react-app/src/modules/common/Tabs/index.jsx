import React from 'react'
import { connect } from 'react-redux'
import { compose, branch, renderNothing } from 'recompose'
import { NavLink } from 'react-router-dom'
import { Avatar } from '../../common'
import dashboardIcon from '../../../assets/dashboard.svg'
import './styles.scss'

const Tabs = ({ auth }) => (
	<div className="tabs-container">
		{auth.user.type === 'customer' && (
			<div className="center tab">
				<p>{auth.user.points}</p>
				<p>points</p>
			</div>
		)}
		<div className="tab">
			<NavLink to="/profile" className="center">
				<Avatar size={24} type={auth.user.type} />
				<p>Profile</p>
			</NavLink>
		</div>
		<div className="tab">
			<NavLink to="/dashboard" className="center">
				<img src={dashboardIcon} width="24" height="24" alt="dashboard" />
				<p>Dashboard</p>
			</NavLink>
		</div>
	</div>
)

const mapStateToProps = ({ auth }) => ({
	auth
})

const enhance = compose(
	connect(mapStateToProps),
	branch(
		({ auth }) => !!auth.loading || !auth,
		renderNothing()
	)
)

export default enhance(Tabs)
