const mongoose = require('mongoose')

const { Schema } = mongoose

const TrashSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	filled: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date,
		default: Date.now()
	},
	lat: {
		type: String,
		required: true
	},
	lng: {
		type: String,
		required: true
	},
	reports: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'User'
			},
			seen: {
				type: Boolean,
				default: false
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
})

const Trashcan = mongoose.model('Trashcan', TrashSchema)

module.exports = { Trashcan }
