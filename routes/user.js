const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { body, validationResult, check } = require('express-validator');

const User = require('../models/User');
const { json } = require('express');

// @route             POST api/user
// @desc              Add new user
// @access          Public
router.post(
    '/',
    [
        check('name', 'Please add name').notEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a stronger password').isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            user = new User({ name, email, password });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };
            jwt.sign(
                payload,
                process.env.JWTSECRET,
                {
                    expiresIn: 3600,
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                },
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },
);

module.exports = router;
