const mongoose = require('mongoose');
const moment = require('moment');
const mongoosePaginate = require('mongoose-paginate');

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		trim: true
	},
	category: {
		type: String,
		required: true,
		default: 'entertainment'
	},
	before_img: {
		type: String,
		required: true
	},
	after_img: {
		type: String,
		required: true
	},
	before_votes: [],
	after_votes: [],
	date: {
		type: Date,
		default: () => moment().utc()
	},
	comments: [],
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	_creator_username: {
		type: String,
		required: true
	},
	private: {
		type: Boolean,
		required: true,
		default: false
	},
	unbiased: {
		type: Boolean,
		default: false
	}
});

PostSchema.plugin(mongoosePaginate);

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };
