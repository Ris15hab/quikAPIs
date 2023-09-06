const UserDB = require('../models/userDB')
const apiHitCount = require('../models/apiHitCount')
const Badges = require('../models/badges')

const getData = async (req, res, next) => {
    try {
        // console.log("in")
        const userID = req.user.userData._id
        let quikDbCount = await UserDB.find({ userID }).countDocuments();
        const quikApiCount = quikDbCount * 5;

        // getting top quikDBs
        const topQuikDbs = await UserDB.find({ userID }).sort({ dateTime: -1 });

        const modelCountPromises = topQuikDbs.map(async (item) => {
            const { model } = require(`../models/${userID}/${item.modelStoredAs}.js`);
            const modelCount = await model.find({}).countDocuments();
            item.count = modelCount; // Update the count for the current item
        });

        await Promise.all(modelCountPromises);

        topQuikDbs.sort((a, b) => b.count - a.count);
        const top2QuikDbs = topQuikDbs.slice(0, 2);

        const apiHits = await apiHitCount.findOne({ userID })
        const totalApiHitCount = apiHits.Post + apiHits.Get + apiHits.GetById + apiHits.UpdateById + apiHits.DeleteById

        const badges = await Badges.findOne({ userID })
        if(!badges.badge1){
            if(apiHits.totalDBCount>0){
                badges.badge1 = true;
            }
        }
        if(!badges.badge2){
            if(totalApiHitCount>24){
                badges.badge2 = true;
            }
        }
        if(!badges.badge3){
            if(apiHits.totalDBCount>4){
                badges.badge3 = true;
            }
        }
        if(!badges.badge4){
            if(apiHits.totalDBCount>9){
                badges.badge4 = true;
            }
        }
        if(!badges.badge5){
            if(totalApiHitCount>99){
                badges.badge5 = true;
            }
        }
        if(!badges.badge6){
            // if(apiHits.totalDBCount>0){
            //     badges.badge6 = true;
            // }
        }
        if(!badges.badge7){
            // if(apiHits.totalDBCount>0){
            //     badges.badge7 = true;
            // }
        }
        if(!badges.badge8){
            if(totalApiHitCount>499){
                badges.badge8 = true;
            }
        }
        // quikDbCount = apiHits.totalDBCount
        await badges.save();
        res.status(200).json({ quikDbCount, quikApiCount, top2QuikDbs, userData: req.user.userData, apiHits, totalApiHitCount, badges })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getData
}