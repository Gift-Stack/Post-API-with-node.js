const express = require('express');
const router = express.Router();

// @route             POST api/auth
// @desc              Add new user
// @access          Public
router.post('/', (req, res) => {
    res.send('Sign up user');
});

module.exports = router;
