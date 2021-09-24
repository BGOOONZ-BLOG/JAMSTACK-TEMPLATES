import React from 'react'

const Error = ({ children }) => (
	<div style={{ textAlign: 'center', marginBottom: '1rem' }}>
		<span style={{ color: 'red' }}>{children}</span>
	</div>
)

export { Error }
