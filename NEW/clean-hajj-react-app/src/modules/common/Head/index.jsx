import React from 'react'
import { Helmet } from 'react-helmet'

const MAIN_URL = 'https://app.cleanhajj.com'

const Head = ({
	url,
	title,
	description }) => {
	return (
		<Helmet>
			{/* TODO: Add structured data <script type="application/ld+json">{structuredData}</script> */}
			{title && <title>Cleanify | {title}</title>}
			<meta
				name="description"
				content={description || 'description'}
			/>
			<meta property="og:title" content={title || 'Clean hajj'} />
			<meta
				property="og:description"
				content={description || 'description'}
			/>
			<meta property="og:url" content={`${MAIN_URL}/${url}`} />
			<meta name="twitter:url" content={`${MAIN_URL}/${url}`} />
			<meta name="twitter:title" content={title || 'Clean hajj'} />
			<meta
				name="twitter:description"
				content={description || 'description'}
			/>
		</Helmet>
	)
}

export { Head }
