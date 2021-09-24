const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const user = require('./routes/user')
// const profile = require('./routes/profile')
const post = require('./routes/post')
const { DB, allowed_url, gatsby_site } = require('./config/config')

const app = express()

const whitelist = [allowed_url, gatsby_site]
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const connectDb = async () => {
	try {
		await mongoose.connect(DB, { useNewUrlParser: true })
		console.log('mongoDB connected')
	} catch (err) {
		console.log(err)
	}
}

connectDb()

app.use('/api/user', user)
app.use('/api/post', post)
// app.use('/api/profile', profile)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening to requests on port: ${port}`))
