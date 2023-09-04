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
        const model = mongoose.model('testing3_210647_64f5f7fe3b81b5d6e1008e1c', modelSchema);
        module.exports = {model,modelSchema}