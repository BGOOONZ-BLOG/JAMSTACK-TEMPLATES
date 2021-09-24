import React from 'react'
import './styles.scss'

const Card = ({ children, className = '' }) => (
	<div className={`card ${className}`}>
		{children}
	</div>
)

export { Card }
