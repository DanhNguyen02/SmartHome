const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const dbo = require('../db/conn');
const User = require('../models/userModels');

module.exports = {

    register: async (req, res) => {
        await check('email').isEmail().run(req);
        await check('password').isLength({ min: 6 }).run(req);
        await check('confirmPassword').custom((value, { req }) => value === req.body.password).run(req);
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
            return res.status(500).send('Server Error');
        }
    },

    login: async (req, res) => {
        await check('email', 'Invalid email').isEmail().run(req);
        await check('password', 'Invalid password').exists().run(req);
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
            return res.status(201).json({ message: 'Successfully logged in', accessToken: token });
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    },

    verifyToken: async (req, res, next) => {
        try {
            const accessToken = req.headers['authorization'];
            const token = accessToken && accessToken.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.userEmail = decodedToken.user_data.email;
            if (next) next();
            else return res.status(200).json({ message: 'Authorized' });
        } catch {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
    
}

