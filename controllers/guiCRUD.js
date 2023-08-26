const UserDB = require('../models/userDB')
const {createError} = require('../middleware/error')

const getFields = async(req,res,next)=>{
    try{
        const {_id} = req.query
        const userID = req.user.userData._id
        const userdb = await UserDB.find({_id})
        const modelCountPromises = userdb.map(async (item) => {
            const {modelSchema} = require(`../models/${userID}/${item.modelStoredAs}.js`);
            res.status(200).json({modelSchema:modelSchema.paths})
        });

        // Wait for all the model count promises to resolve
        await Promise.all(modelCountPromises);
    }catch(err){
        next(err)
    }
}

module.exports = {
    getFields
}