const mongoose = require('mongoose')

const userDBSchema = mongoose.Schema({
    modelName: {
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
    dateTime: {
        type: String,
        required: true
    }
})

const UserDB = new mongoose.model('userDB', userDBSchema)

module.exports = UserDB