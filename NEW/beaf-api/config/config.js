if (!process.env.NODE_ENV) {
	require('dotenv').config()
}

module.exports = {
	DB: process.env.DB,
	secret_key: process.env.SECRET_KEY,
	allowed_url: process.env.REACT_APP_URL,
	gatsby_site: process.env.GATSBY_SITE_URL,
	landing_page: process.env.LANDING_PAGE,
	sendGrid_key: process.env.SENDGRID_API_KEY
}
