const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
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
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists' }] });
            }

            const avatar = normalize(
                gravatar.url(email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm',
                }),
                { forceHttps: true }
            );

            // Create User

            user = new User({
                name,
                email,
                avatar,
                password,
            });

            // Hash the password

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            // Save the user in the database

            await user.save();

            // Get the payload which includes the userID

            const payload = {
                user: {
                    id: user.id,
                },
            };

            /*
                Sign the token
                Pass in the payload
                Pass in the secret
                Set expiration on the token (optional but highly recommended)
                Use a callback to either get an error or a token
                If we don't get an error, send the token back to the client
            */

            jwt.sign(
                payload,
                JWT_SECRET,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
