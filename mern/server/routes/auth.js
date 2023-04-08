const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const dbo = require('../db/conn');
const User = require('../models/user');


// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post(
    '/register',
    [
        check('email', 'Email không hợp lệ').isEmail(),
        check('password', 'Mật khẩu phải tối thiểu 6 ký tự').isLength({ min: 6 }),
        check('confirmPassword', 'Xác nhận mật khẩu không khớp').custom((value, { req }) => value === req.body.password),   
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user_exist = await dbo.getDb().collection('user').findOne({ email });
            if (user_exist) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Tài khoản đã tồn tại' }] });
            }

            const user = new User({
                email,
                password,
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await dbo.getDb().collection('user').insertOne(user);
            const payload = {
                user: {
                    id: user.id,
                },
            };
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
            return res.status(201).json({ message: "Đăng ký thành công" });
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
        check('email', 'Email không hợp lệ').isEmail(),
        check('password', 'Mật khẩu không được để trống').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await dbo.getDb().collection('user').findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Tài khoản không tồn tại' }] });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                .status(400)
                .json({ errors: [{ msg: 'Mật khẩu không trùng khớp' }] });
            }
            const payload = {
                user: {
                    id: user.id,
                },
            };
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
            return res.status(201).json({ message: "Đăng nhập thành công" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
