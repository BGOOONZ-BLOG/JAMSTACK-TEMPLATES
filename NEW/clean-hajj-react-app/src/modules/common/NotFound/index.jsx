import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../../common'
import './styles.scss'

const NotFound = () => (
	<Container className="full-height">
		<div className="vertical-align">
			<h2>404 - Page not Found</h2>
			<Link to="/">Go back home</Link>
		</div>
	</Container>
)

export { NotFound }
