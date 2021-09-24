if (!process.env.NODE_ENV) {
	require('dotenv').config()
}

module.exports = {
	DB: process.env.DB,
	secret_key: process.env.SECRET_KEY,
}
