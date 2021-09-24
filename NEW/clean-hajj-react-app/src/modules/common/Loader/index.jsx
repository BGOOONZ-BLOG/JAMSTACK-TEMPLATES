import React from 'react'
import './styles.scss'

const Loader = () => (
	<div style={{ height: '100vh' }}>
		<div className="dl">
			<div className="dl__container">
				<div className="dl__corner--top" />
				<div className="dl__corner--bottom" />
			</div>
			<div className="dl__square" />
		</div>
	</div>
)

export { Loader }
