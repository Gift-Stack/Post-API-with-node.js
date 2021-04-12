const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult, check } = require('express-validator');

const User = require('../models/User');
const Post = require('../models/Post');

// @route           GET api/post
// @desc            Get logged in user's post
// @access         Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id }).sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route           POST api/post
// @desc            Add post
// @access        Private
router.post('/', auth, async (req, res) => {
    const {
        user,
        landlordReview,
        locationReview,
        qualityReview,
        video,
        image,
    } = req.body;

    try {
        const newPost = new Post({
            user,
            landlordReview,
            locationReview,
            qualityReview,
            video,
            image,
            user: req.user.id,
        });

        const post = await newPost.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route           DELETE api/postt
// @desc            Delete post
// @access        Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await Post.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error...');
    }
});

module.exports = router;
