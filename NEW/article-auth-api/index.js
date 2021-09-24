const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const user = require('./src/routes/user')
const { DB } = require('./src/config/config')

const app = express()

const corsOptions = {
	origin: true,
	credentials: true,
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

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening to requests on port: ${port}`))
