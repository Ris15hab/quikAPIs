const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const otpSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    otp: {
        type: String,
        required: true,
    }
})

otpSchema.pre('save', async function (next) {
    if (this.isModified("otp")) {
        this.otp = await bcrypt.hash(this.otp, 10);
    }
    next();
})

const Otp = new mongoose.model('otp', otpSchema)

module.exports = Otp