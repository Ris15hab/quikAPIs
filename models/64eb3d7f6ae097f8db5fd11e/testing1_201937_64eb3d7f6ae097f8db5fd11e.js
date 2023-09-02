const mongoose = require('mongoose');
        const modelSchema = mongoose.Schema({
            username: {
            type: String,
            required: true,
            unique: false,
        },
email: {
            type: String,
            required: true,
            unique: false,
        },
password: {
            type: String,
            required: true,
            unique: false,
        }
        });
        const model = mongoose.model('testing1', modelSchema);
        module.exports = {model,modelSchema}