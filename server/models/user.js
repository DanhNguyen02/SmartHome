const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    feed: {
        type: String,
        trim: true,
        default: ''
    },
    type: {
        type: String,
        enum: ['light', 'fan', 'temp', 'humid']
    },
    room: {
        type: String,
        enum: ['living', 'bed', 'toilet', 'kitchen']
    },
    data: {
        type: Number,
        default: 0,
        lastUpdated: {
            type: Date,
            default: new Date()
        },
    },
    min: {
        type: Number,
        default: NaN
    },
    max: {
        type: Number,
        default: NaN
    },
    dataHistory: {
        type: [
            {
                data: Number,
                time: Date
            }
        ]
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    },
    adafruitUsername : {
        type: String,
        trim: true,
        default: ''
    },
    adafruitActivekey: {
        type: String,
        trim: true,
        default: ''
    },
    dob: {
        type: Date
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    avatar: {
        type: Buffer
    },
    timeCreated: {
        type: Date,
        default: new Date()
    },
    listDevices: {
        type: [deviceSchema],
        default: []
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
