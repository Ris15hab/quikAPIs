const UserDB = require('../models/userDB');
const { createError } = require('../middleware/error')

// const getUserDB = async (req, res, next) => {
//     try {
//         const userID = req.user.userData._id;
//         const response = await UserDB.find({ userID });
//         await Object.keys(response).map(async (keys)=>{
//             const model = require(`../models/${userID}/${response[keys].modelStoredAs}.js`)
//             response[keys].count = await model.find({}).countDocuments();
//             // console.log(response)
//         })
//         console.log(response)
//         res.status(200).json({ response })
//     } catch (err) {
//         next(err)
//     }
// }

//Remember that using map with async functions can sometimes cause unexpected behavior because map doesn't wait for asynchronous operations to complete. In this case, using Promise.all is a better approach to ensure proper synchronization.

const getUserDB = async (req, res, next) => {
    try {
        const userID = req.user.userData._id;
        const response = await UserDB.find({ userID }).sort({ dateTime: -1 });
        const countCollection = await UserDB.find({ userID}).countDocuments();

        // Create an array to store promises for fetching model counts
        const modelCountPromises = response.map(async (item) => {
            const model = require(`../models/${userID}/${item.modelStoredAs}.js`);
            const modelCount = await model.find({}).countDocuments();
            item.count = modelCount; // Update the count for the current item
        });

        // Wait for all the model count promises to resolve
        await Promise.all(modelCountPromises);

        //console.log(response); // Now response should contain the updated counts

        res.status(200).json({ countCollection,response });
    } catch (err) {
        next(err);
    }
};

const getApiById = async (req, res, next) => {
    try {
        const _id = req.query;
        const data = await UserDB.find({ _id })
        // console.log(data[0].modelAPI)
        const response = {
            Add: `${data[0].modelAPI}/addData`,
            Get: `${data[0].modelAPI}/getData`,
            GetById: `${data[0].modelAPI}/getDataById?_id=`,
            UpdateById: `${data[0].modelAPI}/updateDataById?_id=`,
            DeleteById: `${data[0].modelAPI}/deleteDataById?_id=`
        };
        const name = data[0].modelName
        res.status(200).json({ name,APIs: response })
    } catch (err) {
        next(err)
    }
}

const getUserDBCollection = async (req, res, next) => {
    try {
        const { _id } = req.query;
        const userID = req.user.userData._id;
        const userDB = await UserDB.find({ _id })
        if (userDB) {
            const response ={}
            const modelCountPromises = userDB.map(async (item) => {
                const model = require(`../models/${userID}/${item.modelStoredAs}.js`);
                const data = await model.find({});
                const count = await model.find({}).countDocuments();

                response.data= data;
                response.count= count;
            });

            // Wait for all the model count promises to resolve
            await Promise.all(modelCountPromises);

            res.status(200).json({ name:userDB[0].modelName , response })
        } else {
            console.log(here)
            return next(createError(404, 'user database not found'))
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getUserDB,
    getApiById,
    getUserDBCollection
}