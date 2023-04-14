const express = require('express');
const router = express.Router();
const dbo = require('../db/conn');
const authToken = require('../controllers/auth');

router.get(
    '/profile',
    authToken,
    async (req, res) => {
        try {
            const user = await dbo.getDb().collection('user').findOne({ email: req.userEmail });
            res.status(200).json(user);
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Server error' });
        }
    }
)

router.post(
    '/profile',
    authToken,
    async (req, res) => {
        
    }
)

module.exports = router;