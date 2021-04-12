const express = require('express');
const router = express.Router();

// @route           GET api/post
// @desc            Get logged in user's post
// @access         Private
router.get('/', (req, res) => {
    res.send('Get post');
});

// @route           POST api/post
// @desc            Add post
// @access        Private
router.post('/', (req, res) => {
    res.send('Add post');
});

// @route           PUT api/post
// @desc            Update post
// @access        Private
router.put('/:id', (req, res) => {
    res.send('Update post');
});

// @route           DELETE api/postt
// @desc            Delete post
// @access        Private
router.delete('/:id', (req, res) => {
    res.send('Delete post');
});

module.exports = router;
