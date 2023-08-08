const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectionParameters = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connection = mongoose.connect(process.env.MONGO_URL, connectionParameters).then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log(err);
})

module.exports = connection;