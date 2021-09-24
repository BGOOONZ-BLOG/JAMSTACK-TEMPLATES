const { User } = require('../models/user')

const authenticate = async (req, res, next) => {
	try {
		const token = req.header('x-auth')
		const user = await User.findByToken(token).populate({
			path: 'followers',
			select: '_id avatar firstName lastName username followers following isVerified',
			options: { limit: 30 }
		}).populate({
			path: 'following',
			select: '_id avatar firstName lastName username followers following isVerified',
			options: { limit: 30 }
		})
		res.user = user
		res.token = token
		return next()
	} catch (err) {
		res.status(401).send()
	}
}

module.exports = { authenticate }
