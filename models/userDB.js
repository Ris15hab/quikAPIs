const mongoose = require('mongoose')

const userDBSchema = mongoose.Schema({
    modelName: {
        type: String,
        required: true
    },
    modelStoredAs: {
        type: String,
        required: true
    },
    modelDescription: {
        type: String,
        required: true
    },
    modelAPI: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    count:{
        type: Number,
    },
    dateTime: {
        type: String,
        required: true
    }
})

const UserDB = new mongoose.model('userDB', userDBSchema)

module.exports = UserDB