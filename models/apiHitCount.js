const mongoose = require('mongoose')

const apiHitCountSchema = mongoose.Schema({
    Post: {
        type: Number,
        default: 0
    },
    Get: {
        type: Number,
        default: 0
    },
    GetById: {
        type: Number,
        default: 0
    },
    UpdateById: {
        type: Number,
        default: 0
    },
    DeleteById: {
        type: Number,
        default: 0
    },
    Mon: {
        type: Number,
        default: 0
    },
    Tues: {
        type: Number,
        default: 0
    },
    Wed: {
        type: Number,
        default: 0
    },
    Thu: {
        type: Number,
        default: 0
    },
    Fri: {
        type: Number,
        default: 0
    },
    Sat: {
        type: Number,
        default: 0
    },
    Sun: {
        type: Number,
        default: 0
    },
    totalDBCount: {
        type: Number,
        default: 0
    },
    totalGuiCount: {
        type: Number,
        default: 0
    },
    streakCount: {
        type: Number,
        default: 0
    },
    streakDate: {
        type: Date,
        default: null
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})


const apiHitCount = new mongoose.model('apiHitCount', apiHitCountSchema)

module.exports = apiHitCount