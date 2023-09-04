const apiHitCountModel = require('../models/apiHitCount')
const { createError } = require('./error')

const apiHitCount = async (req, res, next) => {
    try {
        const date = new Date();
        const options = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' };
        const formattedDate = date.toLocaleDateString('en-IN', options);
        const day = formattedDate.split(',')[0]

        const split_url = req.url.split(/[/?]/)
        const method_url = split_url[2]
        const userID = split_url[1].split('_')[2]
        const apiModel = await apiHitCountModel.findOne({ userID: userID })
        if (apiModel) {
            if (method_url === 'addData') {
                apiModel.Post = apiModel.Post + 1
            } else if (method_url === 'getData') {
                apiModel.Get = apiModel.Get + 1
            } else if (method_url === 'getDataById') {
                apiModel.GetById = apiModel.GetById + 1
            } else if (method_url === 'updateDataById') {
                apiModel.UpdateById = apiModel.UpdateById + 1
            } else if (method_url === 'deleteDataById') {
                apiModel.DeleteById = apiModel.DeleteById + 1
            }
            if (day === 'Mon') {
                apiModel.Mon = apiModel.Mon + 1;
            } else if (day === 'Tue') {
                apiModel.Tues = apiModel.Tues + 1;
            } else if (day === 'Wed') {
                apiModel.Wed = apiModel.Wed + 1;
            } else if (day === 'Thu') {
                apiModel.Thu = apiModel.Thu + 1;
            } else if (day === 'Fri') {
                apiModel.Fri = apiModel.Mon + 1;
            } else if (day === 'Sat') {
                apiModel.Sat = apiModel.Sat + 1;
            } else if (day === 'Sun') {
                apiModel.Sun = apiModel.Sun + 1;
            }
            await apiModel.save();
            next();
        } else {
            return next(createError(400, 'apiHitCount model not found for the user'))
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    apiHitCount
}