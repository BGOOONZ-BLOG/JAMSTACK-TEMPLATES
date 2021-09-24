const express = require('express');
const { ObjectID } = require('mongodb');
const { authenticate } = require('../middleware/authenticate');
const { Post } = require('../models/post');
const { User } = require('../models/user');

const router = express.Router();

const categories = [
	'entertainment',
	'sports',
	'politics',
	'gaming',
	'movies',
	'memes',
	'automotive',
	'fashion',
	'food',
	'tech',
	'science',
	'animals',
	'photography',
	'travel'
];

router.post('/', authenticate, async (req, res) => {
	try {
		if (!categories.includes(req.body.category)) {
			return res.status(401).send({ error: 'Invalid category' });
		}

		const post = new Post({
			title: req.body.title,
			description: req.body.description,
			before_img: req.body.before_img,
			after_img: req.body.after_img,
			category: req.body.category,
			_creator: res.user._id,
			_creator_username: res.user.username,
			private: req.body.private,
			unbiased: req.body.unbiased
		});
		const doc = await post.save();

		res.status(200).json(doc);
	} catch (err) {
		res.status(400).send({ error: "Couldn't create a new post!" });
	}
});

router.post('/personal/:page', authenticate, async (req, res) => {
	try {
		const options = {
			sort: { date: -1 },
			page: req.params.page,
			limit: 20
		};
		const { docs, pages, page } = await Post.paginate(
			{
				_creator: res.user._id
			},
			options
		);
		res.status(200).json({ posts: docs, pages, page });
	} catch (err) {
		res.status(400).json({ error: 'This user has no posts added' });
	}
});

router.post('/all/:page', async (req, res) => {
	try {
		const token = req.header('x-auth');

		if (token) {
			try {
				const user = await User.findByToken(token);
				if (user) {
					// get following posts
					const options = {
						sort: { date: -1 },
						page: req.params.page,
						limit: 20
					};
					const { docs, pages, page } = await Post.paginate(
						{
							_creator: {
								$in: [user._id, ...user.following]
							}
						},
						options
					);
					res.status(200).json({ posts: docs, pages, page });
				} else {
					const options = {
						sort: { date: -1 },
						page: req.params.page,
						limit: 20
					};
					const { docs, pages, page } = await Post.paginate(
						{ private: false },
						options
					);
					res.status(200).json({ posts: docs, pages, page });
				}
			} catch (err) {
				const options = {
					sort: { date: -1 },
					page: req.params.page,
					limit: 20
				};
				const { docs, pages, page } = await Post.paginate(
					{ private: false },
					options
				);
				res.status(200).json({ posts: docs, pages, page });
			}
		} else {
			const options = {
				sort: { date: -1 },
				page: req.params.page,
				limit: 20
			};
			const { docs, pages, page } = await Post.paginate(
				{ private: false },
				options
			);
			res.status(200).json({ posts: docs, pages, page });
		}
	} catch (err) {
		res.status(400).json({ error: 'No posts are available' });
	}
});

router.post('/category/:category/:page', async (req, res) => {
	try {
		const token = req.header('x-auth');

		if (!categories.includes(req.params.category)) {
			return res.status(401).send({ error: 'Invalid category' });
		}

		if (token) {
			try {
				const user = await User.findByToken(token);
				if (user) {
					const options = {
						sort: { date: -1 },
						page: req.params.page,
						limit: 20
					};
					const { docs, pages, page } = await Post.paginate(
						{ category: req.params.category },
						options
					);
					res.status(200).json({ posts: docs, pages, page });
				} else {
					const options = {
						sort: { date: -1 },
						page: req.params.page,
						limit: 20
					};
					const { docs, pages, page } = await Post.paginate(
						{ category: req.params.category, private: false },
						options
					);
					res.status(200).json({ posts: docs, pages, page });
				}
			} catch (err) {
				const options = {
					sort: { date: -1 },
					page: req.params.page,
					limit: 20
				};
				const { docs, pages, page } = await Post.paginate(
					{ category: req.params.category, private: false },
					options
				);
				res.status(200).json({ posts: docs, pages, page });
			}
		} else {
			const options = {
				sort: { date: -1 },
				page: req.params.page,
				limit: 20
			};
			const { docs, pages, page } = await Post.paginate(
				{ category: req.params.category, private: false },
				options
			);
			res.status(200).json({ posts: docs, pages, page });
		}
	} catch (err) {
		res.status(400).json({ error: 'that category has no posts yet' });
	}
});

router.post('/user/:user_id/:page', async (req, res) => {
	try {
		const token = req.header('x-auth');

		if (token) {
			try {
				const user = await User.findByToken(token);
				if (user) {
					const options = {
						sort: { date: -1 },
						page: req.params.page,
						limit: 20
					};
					const { docs, pages, page } = await Post.paginate(
						{
							_creator: req.params.user_id
						},
						options
					);
					res.status(200).json({ posts: docs, pages, page });
				} else {
					const options = {
						sort: { date: -1 },
						page: req.params.page,
						limit: 20
					};
					const { docs, pages, page } = await Post.paginate(
						{ private: false },
						options
					);
					res.status(200).json({ posts: docs, pages, page });
				}
			} catch (err) {
				const options = {
					sort: { date: -1 },
					page: req.params.page,
					limit: 20
				};
				const { docs, pages, page } = await Post.paginate(
					{ private: false },
					options
				);
				res.status(200).json({ posts: docs, pages, page });
			}
		} else {
			const options = {
				sort: { date: -1 },
				page: req.params.page,
				limit: 20
			};
			const { docs, pages, page } = await Post.paginate(
				{ _creator: req.params.user_id, private: false },
				options
			);
			res.status(200).json({ posts: docs, pages, page });
		}
	} catch (err) {
		res.status(400).json({ error: 'This user has no posts added' });
	}
});

router.post('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		if (!ObjectID.isValid(id)) {
			return res.status(404).json({ error: 'Invalid ID' });
		}

		const post = await Post.findOne({ _id: id });
		res.status(200).json(post);
	} catch (err) {
		res.status(400).json({ error: 'Unable to find that post' });
	}
});

router.delete('/:id', authenticate, async (req, res) => {
	try {
		const { id } = req.params;

		if (!ObjectID.isValid(id)) {
			return res.status(404).send('Invalid ID');
		}

		const post = await Post.findOneAndRemove({
			_id: id,
			_creator: res.user._id
		});

		if (!post) {
			return res.status(400).json({ error: 'Unable to delete that post' });
		}

		res.status(200).json({ error: 'Post has been removed successfully!' });
	} catch (err) {
		res.status(400).send({ error: 'Something went wrong' });
	}
});

router.patch('/:id', authenticate, async (req, res) => {
	try {
		const { id } = req.params;
		const body = {
			title: req.body.title,
			description: req.body.description,
			before_img: req.body.before_img,
			after_img: req.body.after_img
		};

		if (!ObjectID.isValid(id)) {
			return res.status(404).json({ error: 'Invalid ID' });
		}
		const post = await Post.findOneAndUpdate(
			{
				_id: id,
				_creator: res.user._id
			},
			{ $set: body },
			{ new: true }
		);

		if (!post) {
			return res.status(404).json({ error: 'Unable to update that post' });
		}

		res.status(200).json(post);
	} catch (err) {
		res.status(400).send({ error: 'Something went wrong' });
	}
});

router.patch('/vote/before/:id', authenticate, async (req, res) => {
	try {
		const { id } = req.params;

		if (!ObjectID.isValid(id)) {
			return res.status(404).json({ error: 'Invalid ID' });
		}

		const query = {
			_id: id,
			before_votes: { $not: { $elemMatch: { $eq: res.user._id } } },
			after_votes: { $not: { $elemMatch: { $eq: res.user._id } } }
		};

		const update = {
			$addToSet: { before_votes: res.user._id }
		};

		const updated = await Post.updateOne(query, update);

		if (!updated) {
			return res.status(404).json({ error: 'Unable to bevote on that post' });
		}

		res.status(200).json(updated);
	} catch (err) {
		res.status(400).send({ error: 'Something went wrong' });
	}
});

router.patch('/vote/after/:id', authenticate, async (req, res) => {
	try {
		const { id } = req.params;

		if (!ObjectID.isValid(id)) {
			return res.status(404).json({ error: 'Invalid ID' });
		}

		const query = {
			_id: id,
			after_votes: { $not: { $elemMatch: { $eq: res.user._id } } },
			before_votes: { $not: { $elemMatch: { $eq: res.user._id } } }
		};

		const update = {
			$addToSet: { after_votes: res.user._id }
		};

		const updated = await Post.updateOne(query, update);

		if (!updated) {
			return res.status(404).json({ error: 'Unable to bevote on that post' });
		}

		res.status(200).json(updated);
	} catch (err) {
		res.status(400).send({ error: 'Something went wrong' });
	}
});

router.post('/comment/:id', authenticate, async (req, res) => {
	try {
		const { id } = req.params;
		const { comment, generatedID } = req.body;

		const post = await Post.findById(id);
		const today = new Date();
		const newComment = {
			_id: generatedID,
			creator_id: res.user._id,
			creator_username: res.user.username,
			comment,
			date: today.toISOString()
		};

		await post.comments.unshift(newComment);
		await post.save();
		res.json(newComment);
	} catch (err) {
		res.status(404).json({ error: 'Something went wrong' });
	}
});

router.delete(
	'/comment/:post_id/:comment_id',
	authenticate,
	async (req, res) => {
		try {
			const { post_id, comment_id } = req.params;
			const post = await Post.findById(post_id);
			const removeIndex = post.comments
				.map(item => item._id.toString())
				.indexOf(comment_id);

			await post.comments.splice(removeIndex, 1);
			post.save();
			res.json({ message: 'Comment has been deleted', post: comment_id });
		} catch (err) {
			res.status(404).json({ error: 'Something went wrong' });
		}
	}
);

module.exports = router;
