const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const random = require('mongoose-simple-random');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const { secret_key } = require('../config/config');

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 20
	},
	lastName: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 20
	},
	username: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 12,
		trim: true,
		unique: true
	},
	avatar: {
		type: String,
		default:
      'https://res.cloudinary.com/dj8equdxc/image/upload/v1545631718/beaf/anonym.png'
	},
	type: {
		type: String,
		default: 'user',
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	bio: {
		type: String,
		default: '404 Bio not found!'
	},
	hasEmailVerified: {
		type: Boolean,
		default: false
	},
	isVerified: {
		type: Boolean,
		default: false
	},
	following: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	joined: {
		type: Date,
		default: () => moment().utc()
	},
	tokens: [
		{
			access: {
				type: String,
				required: true
			},
			token: {
				type: String,
				required: true
			}
		}
	]
});

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	return _.pick(userObject, [
		'_id',
		'firstName',
		'lastName',
		'username',
		'email',
		'type',
		'isVerified',
		'avatar',
		'bio',
		'followers',
		'following',
		'hasEmailVerified',
		'joined'
	]);
};

UserSchema.methods.generateAuthToken = async function () {
	const user = this;

	const access = 'auth';
	const token = jwt
		.sign({ _id: user._id.toHexString(), access }, secret_key)
		.toString();

	user.tokens.push({ access, token });
	await user.save();
	return token;
};

UserSchema.statics.findByToken = function (token) {
	const User = this;
	let decoded;

	try {
		decoded = jwt.verify(token, secret_key);
	} catch (err) {
		return Promise.reject();
	}

	return User.findOne({
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

UserSchema.methods.removeToken = function (token) {
	const user = this;

	return user.update({
		$pull: {
			tokens: { token }
		}
	});
};

UserSchema.statics.findByCredentials = function (email, password) {
	const User = this;

	return User.findOne({ email }).then(user => {
		if (!user) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					resolve(user);
				} else {
					reject();
				}
			});
		});
	});
};

UserSchema.pre('save', function (next) {
	const user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

UserSchema.plugin(uniqueValidator, {
	message: 'Error, expected {PATH} to be unique.'
});

UserSchema.plugin(random);

const User = mongoose.model('User', UserSchema);

module.exports = { User };
