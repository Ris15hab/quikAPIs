const UserDB = require('../models/userDB');
const { createError } = require('../middleware/error')

const getUserDB = async (req, res, next) => {
    try {
        const userID = req.user.userData._id;
        const response = await UserDB.find({ userID });
        const count = await UserDB.find({ userID }).countDocuments();
        res.status(200).json({ count, response })
    } catch (err) {
        next(err)
    }
}

const getApiById = async (req, res, next) => {
    try {
        const _id = req.query;
        const data = await UserDB.find({ _id })
        // console.log(data[0].modelAPI)
        const response = {
            Add:`${data[0].modelAPI}/addData`,
            Get:`${data[0].modelAPI}/getData`,
            GetById:`${data[0].modelAPI}/getDataById`,
            UpdateById:`${data[0].modelAPI}/updateDataById`,
            DeleteById:`${data[0].modelAPI}/deleteDataById`
        };
        res.status(200).json({ APIs: response })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getUserDB,
    getApiById
}