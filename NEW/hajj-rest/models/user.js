const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const { secret_key } = require('../config/config')

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'firstName is required'],
		minlength: [2, 'firstName must contain over 2 characters'],
		maxlength: [20, 'firstName must not contain over 20 characters']
	},
	lastName: {
		type: String,
		required: [true, 'lastName is required'],
		minlength: [2, 'lastName must contain over 2 characters'],
		maxlength: [20, 'lastName must not contain over 20 characters']
	},
	username: {
		type: String,
		required: [true, 'username is required'],
		minlength: [1, 'Username is required'],
		maxlength: [12, 'Username must not contain over 12 characters'],
		trim: true
	},
	type: {
		type: String,
		default: 'customer'
	},
	points: {
		type: Number,
		default: 0
	},
	email: {
		type: String,
		required: [true, 'email is required'],
		minlength: 1,
		unique: true,
		trim: true,
		validate: {
			validator: validator.isEmail,
			message: 'invalid email'
		}
	},
	password: {
		type: String,
		required: [true, 'password is required'],
		minlength: [6, 'Password must contain over 6 characters']
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
})

UserSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()

	return _.pick(userObject, ['_id', 'firstName', 'lastName', 'points', 'type', 'username', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
	const user = this

	const access = 'auth'
	const token = jwt.sign({ _id: user._id.toHexString(), access }, secret_key).toString()

	user.tokens.push({ access, token })

	return user.save().then(() => {
		return token
	})
}

UserSchema.statics.findByToken = function (token) {
	const User = this
	let decoded

	try {
		decoded = jwt.verify(token, secret_key)
	} catch (err) {
		return Promise.reject()
	}

	return User.findOne({
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	})
}

UserSchema.methods.removeToken = function (token) {
	const user = this

	return user.update({
		$pull: {
			tokens: { token }
		}
	})
}

UserSchema.statics.findByCredentials = function (email, password) {
	const User = this

	return User.findOne({ email }).then((user) => {
		if (!user) {
			return Promise.reject()
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

UserSchema.pre('save', function (next) {
	const user = this

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

const User = mongoose.model('User', UserSchema)

module.exports = { User }
