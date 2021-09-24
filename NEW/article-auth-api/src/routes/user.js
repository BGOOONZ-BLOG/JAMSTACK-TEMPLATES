const express = require('express')
const { authenticate } = require('../middleware/authenticate')
const { User } = require('../models/user')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = new User({
      username,
      email,
      password,
    })

    await user.save()

    const token = await user.generateAuthToken()
    res.status(200).json({ user, token })
  } catch (err) {
    res.status(400).json({ error: 'Something went wrong' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email.toLowerCase(),
      req.body.password
    )
    const token = await user.generateAuthToken()
    res.status(200).json({ user, token })
  } catch (err) {
    res.status(400).json({ error: 'Wrong credentials' })
  }
})

router.get('/verify', authenticate, async (_req, res) => {
  try {
    res.status(200).json({ user: res.user, token: res.token })
  } catch (err) {
    res.status(404).json({ error: 'could not log you in' })
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

module.exports = router
