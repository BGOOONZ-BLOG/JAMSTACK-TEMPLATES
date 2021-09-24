import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const Button = ({ children, type = 'button', className = '', onClick, href }) => (
	<React.Fragment>
		{href ? (
			<Link to={href} className={`btn-primary ${className}`}>{children}</Link>
		) : (
			<button type={type} className={`btn-primary ${className}`} onClick={onClick}>{children}</button>
		)}
	</React.Fragment>
)

export { Button }
