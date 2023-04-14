const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const dbo = require('../db/conn');
const User = require('../models/user');

router.post(
    '/adddevice',
    async (req, res) => {
        try {
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

router.post(
    '/editdevice',
    async (req, res) => {
        try {

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

router.get(
    '/getdevice',
    async (req, res) => {
        try {

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;