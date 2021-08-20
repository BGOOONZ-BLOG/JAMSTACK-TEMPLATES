import React from "react"
import './LayoutTemplate.css'

export default ({ children }) => {
	return (
		<section className="section">
			<div>Layout 2</div>
			<div className="container">
				{children}
			</div>

		</section>
	)
}

