const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const dbo = require('../db/conn');
const authToken = require('../controllers/auth');
const User = require('../models/user');


// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post(
    '/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid password').isLength({ min: 6 }),
        check('confirmPassword', 'Invalid confirm password').custom((value, { req }) => value === req.body.password),   
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email: email_req, password: password_req } = req.body;
        try {
            const user = await dbo.getDb().collection('user').findOne({ email: email_req });
            if (user) {
                return res.status(400).json({ message: 'Account is already exist' });
            }
            const user_data = new User({
                email: email_req,
                password: password_req,
            });
            const salt = await bcrypt.genSalt(10);
            user_data.password = await bcrypt.hash(password_req, salt);
            await dbo.getDb().collection('user').insertOne(user_data);
            return res.status(201).json({ message: 'Successfully registered' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/login',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid password').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email: email_req, password: password_req } = req.body;
        try {
            const user = await dbo.getDb().collection('user').findOne({ email: email_req});
            if (!user) {
                return res
                    .status(400)
                    .json({ message: 'Account is not exist' });
            }
            const isMatch = await bcrypt.compare(password_req, user.password);
            if (!isMatch) {
                return res
                .status(400)
                .json({ message: 'Password does not match' });
            }
            const payload = {
                user_data: {
                    id: user._id,
                    email: user.email
                },
            };
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '30d' },
            );
            res.status(201).json({ message: 'Successfully logged in', accessToken: token });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

router.get(
    '/verifyToken',
    (req, res) => {
        authToken(req, res);
    }
)

module.exports = router;
