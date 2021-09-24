import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../../common'
import './styles.scss'

const Footer = () => (
	<div className="footer-part">
		<Container className="footer">
			<div>
				<h4>Cleanify</h4>
				<p>Help us clean the environment we live in together!</p>
				<p>To make the world a cleaner place</p>
			</div>
			<div>
				<h4>Links</h4>
				<ul>
					<li><Link to="/dashboard">Dashboard</Link></li>
				    <li><Link to="/profile">Profile</Link></li>
				    <li><Link to="/edit-profile">Edit profile</Link></li>
				</ul>
			</div>
			<div>
				<h4>Follow us on:</h4>
				<ul>
					<li><a href="#">Facebook</a></li>
					<li><a href="#">Twitter</a></li>
					<li><a href="#">Instagram</a></li>
				</ul>
			</div>
		</Container>
	</div>
)

export { Footer }
