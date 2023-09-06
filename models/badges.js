const mongoose = require('mongoose')

const badgesSchema = mongoose.Schema({
    badge1:{
        type: Boolean,
        default: false
    },
    badge2:{
        type: Boolean,
        default: false
    },
    badge3:{
        type: Boolean,
        default: false
    },
    badge4:{
        type: Boolean,
        default: false
    },
    badge5:{
        type: Boolean,
        default: false
    },
    badge6:{
        type: Boolean,
        default: false
    },
    badge7:{
        type: Boolean,
        default: false
    },
    badge8:{
        type: Boolean,
        default: false
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})


const badges = new mongoose.model('badges', badgesSchema)

module.exports = badges