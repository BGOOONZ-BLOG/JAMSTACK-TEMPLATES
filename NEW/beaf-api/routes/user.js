const express = require('express')
const bcrypt = require('bcryptjs')
const sgMail = require('@sendgrid/mail')
const { ObjectID } = require('mongodb')
const { authenticate } = require('../middleware/authenticate')
const { User } = require('../models/user')
const { sendGrid_key } = require('../config/config')

const router = express.Router()

router.post('/register', async (req, res) => {
	try {
		const {
			username,
			email,
			password,
			firstName,
			lastName
		} = req.body
		const user = new User({
			username,
			email,
			password,
			firstName,
			lastName
		})

		await user.save()

		const token = await user.generateAuthToken()

		sgMail.setApiKey(sendGrid_key)
		const msg = {
			to: email,
			from: 'beafapp@gmail.com',
			subject: 'Welcome to Beaf!',
			text: 'We are glad to have you joined Beaf, please verify your email',
			html: `<div>We are glad to have you join Beaf! Please verify your email by clicking <a href="https://app.beafapp.com/email/confirm?token=${token}" target="__blank">this link</a>.<br /> Or paste this link into your browser: https://app.beafapp.com/email/confirm/?token=${token}</div>`,
		}

		sgMail.send(msg)

		res.status(200).json({ user, token })
	} catch (err) {
		res.status(400).json({ error: 'Something went wrong' })
	}
})

router.post('/resend/email', authenticate, async (req, res) => {
	try {
		sgMail.setApiKey(sendGrid_key)
		const msg = {
			to: res.user.email,
			from: 'beafapp@gmail.com',
			subject: 'Welcome to Beaf!',
			text: 'We are glad to have you joined Beaf, please verify your email',
			html: `<div>We are glad to have you join Beaf! Please verify your email by clicking <a href="https://app.beafapp.com/email/confirm?token=${res.token}" target="__blank">this link</a>.<br /> Or paste this link into your browser: https://app.beafapp.com/email/confirm/?token=${res.token}</div>`,
		}

		sgMail.send(msg)
		res.status(200).json({ success: true })
	} catch (err) {
		res.status(400).json({ error: 'Something went wrong' })
	}
})

router.get('/verify', authenticate, async (_req, res) => {
	try {
		res.status(200).json(res.user)
	} catch (err) {
		res.status(404).json({ error: 'could not log you in' })
	}
})

router.patch('/email/confirm', authenticate, async (_req, res) => {
	try {
		await User.findOneAndUpdate(
			{ _id: res.user._id },
			{ $set: { hasEmailVerified: true } },
			{ new: true }
		)

		res.status(200).json({ success: true })
	} catch (err) {
		res.status(404).json({ error: 'could not verify your email!' })
	}
})

router.patch('/reset/password', authenticate, async (req, res) => {
	try {
		if (req.body.password !== req.body.confirmPassword) {
			return res.status(400).json({ error: 'Passwords don\'t match' })
		}

		const user = await User.findById({ _id: res.user._id })
		user.password = req.body.password
		user.save()

		res.status(200).json({ success: true })
	} catch (err) {
		res.status(404).json({ error: 'could not reset your password!' })
	}
})

router.post('/forgotten/password', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email })

		if (!user) {
			return res.status(404).json({ error: 'We couldn\'t find an account with that email!' })
		}

		const token = await user.generateAuthToken()

		sgMail.setApiKey(sendGrid_key)
		const msg = {
			to: req.body.email,
			from: 'beafapp@gmail.com',
			subject: 'Forgotten password request',
			text: `Hi ${user.firstName}, Beaf recently received a request for a forgotten password.`,
			html: `<div>To change your Beaf password, please click on this <a href="https://app.beafapp.com/reset/password?token=${token}" target="__blank">link</a>.<br /> Or paste this link into your browser: https://app.beafapp.com/reset/password/?token=${token}</div>`,
		}

		sgMail.send(msg)

		res.status(200).json({ success: true })
	} catch (err) {
		res.status(404).json({ error: 'Something went wrong' })
	}
})

router.post('/users/all', async (req, res) => {
	try {
		const token = req.header('x-auth')
		const fields = {
			firstName: 1,
			lastName: 1,
			username: 1,
			avatar: 1,
			isVerified: 1,
			following: 1,
			followers: 1
		}
		const options = {
			skip: 10,
			limit: 5,
			count: 5,
			populate: [{
				path: 'followers',
				select: '_id avatar firstName lastName username followers following isVerified',
				options: { limit: 30 }
			}, {
				path: 'following',
				select: '_id avatar firstName lastName username followers following isVerified',
				options: { limit: 30 }
			}]
		}
		if (token) {
			try {
				const user = await User.findByToken(token)
				if (user) {
					const filter = { _id: { $ne: user._id } }
					if (user.type === 'admin') {
						await User.findRandom(filter, fields, options, (err, users) => {
							if (err) throw new Error(err)
							res.status(200).json(users)
						})
					} else {
						await User.findRandom(filter, fields, options, (err, users) => {
							if (err) throw new Error(err)
							res.status(200).json(users)
						})
					}
				} else {
					await User.findRandom({}, fields, options, (err, users) => {
						if (err) throw new Error(err)
						res.status(200).json(users)
					})
				}
			} catch (err) {
				await User.findRandom({}, fields, options, (err, users) => {
					if (err) throw new Error(err)
					res.status(200).json(users)
				})
			}
		} else {
			await User.findRandom({}, fields, options, (err, users) => {
				if (err) throw new Error(err)
				res.status(200).json(users)
			})
		}
	} catch (err) {
		res.status(404).json({ error: 'Unauthorized' })
	}
})

router.post('/users/total', (req, res) => {
	try {
		const fields = {
			username: 1,
		}
		User.find({}, fields, {}, (err, users) => {
			if (err) throw new Error(err)
			res.status(200).json(users)
		})
	} catch (err) {
		res.status(404).json({ error: 'Unauthorized' })
	}
})

router.post('/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token = await user.generateAuthToken()
		res.status(200).json({ user, token })
	} catch (err) {
		res.status(400).json({ error: 'Wrong credentials' })
	}
})

router.delete('/logout', authenticate, async (_req, res) => {
	try {
		await res.user.removeToken(res.token)
		res.status(200).json({ message: 'logged out' })
	} catch (err) {
		res.status(502).json({ error: 'could not log you out' })
	}
})

router.post('/:id', async (req, res) => {
	try {
		const profile = await User.findById(req.params.id).populate({
			path: 'followers',
			select: '_id avatar firstName lastName username followers following isVerified',
			options: { limit: 30 }
		}).populate({
			path: 'following',
			select: '_id avatar firstName lastName username followers following isVerified',
			options: { limit: 30 }
		})
		res.status(200).json(profile)
	} catch (err) {
		res.status(404).json({ error: 'could not find that user' })
	}
})

router.patch('/edit', authenticate, async (req, res) => {
	try {
		const { firstName, lastName, bio, avatar } = req.body
		const profileFields = { firstName, lastName, avatar, bio }

		const profile = await User.findOneAndUpdate(
			{ _id: res.user._id },
			{ $set: profileFields },
			{ new: true }
		)

		res.status(200).json(profile)
	} catch (err) {
		res.status(404).json({ error: 'could not update your profile' })
	}
})

router.patch('/follow/:id', authenticate, async (req, res) => {
	try {
		const id = new ObjectID(req.params.id)

		// check if the id is a valid one
		if (!ObjectID.isValid(req.params.id)) {
			return res.status(404).json({ error: 'Invalid ID' })
		}

		// check if your id doesn't match the id of the use you want to follow
		if (res.user._id === req.params.id) {
			return res.status(400).json({ error: 'You cannot follow yourself' })
		}

		// add the id of the user you want to follow in following array
		const query = {
			_id: res.user._id,
			following: { $not: { $elemMatch: { $eq: id } } }
		}

		const update = {
			$addToSet: { following: id }
		}

		const updated = await User.updateOne(query, update)

		// add your id to the followers array of the user you want to follow
		const secondQuery = {
			_id: id,
			followers: { $not: { $elemMatch: { $eq: res.user._id } } }
		}

		const secondUpdate = {
			$addToSet: { followers: res.user._id }
		}

		const secondUpdated = await User.updateOne(secondQuery, secondUpdate)

		if (!updated || !secondUpdated) {
			return res.status(404).json({ error: 'Unable to follow that user' })
		}

		res.status(200).json(update)
	} catch (err) {
		res.status(400).send({ error: err.message })
	}
})

router.patch('/unfollow/:id', authenticate, async (req, res) => {
	try {
		const { id } = req.params

		// check if the id is a valid one
		if (!ObjectID.isValid(id)) {
			return res.status(404).json({ error: 'Invalid ID' })
		}

		// check if your id doesn't match the id of the use you want to unfollow
		if (res.user._id === id) {
			return res.status(400).json({ error: 'You cannot unfollow yourself' })
		}

		// remove the id of the user you want to unfollow in following array
		const query = {
			_id: res.user._id,
			following: { $elemMatch: { $eq: id } }
		}

		const update = {
			$pull: { following: id }
		}

		const updated = await User.updateOne(query, update)

		// remove your id from the followers array of the user you want to unfollow
		const secondQuery = {
			_id: id,
			followers: { $elemMatch: { $eq: res.user._id } }
		}

		const secondUpdate = {
			$pull: { followers: res.user._id }
		}

		const secondUpdated = await User.updateOne(secondQuery, secondUpdate)

		if (!updated || !secondUpdated) {
			return res.status(404).json({ error: 'Unable to unfollow that user' })
		}

		res.status(200).json(update)
	} catch (err) {
		res.status(400).send({ error: err.message })
	}
})

module.exports = router
