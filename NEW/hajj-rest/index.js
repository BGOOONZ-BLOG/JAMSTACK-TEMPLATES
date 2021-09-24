const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// routes
const user = require('./routes/user')
const trashcan = require('./routes/trashcan')

// config
const { MONGO_URI } = require('./config/config.js')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose
	.connect(MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log('mongoDB connected'))
	.catch(err => console.log(err))

app.use('/api/user', user)
app.use('/api/trashcan', trashcan)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening to requests on port: ${port}`))
