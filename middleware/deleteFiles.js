const UserDB = require('../models/userDB')
const path = require('path');
const { createError } = require('./error');
const { addAllRoute, addAppRoute } = require('../utils/addRoute')
const fs = require('fs').promises

const deleteModel = async (req, res, next) => {
    try {
        const { _id } = req.query;
        const userDB = await UserDB.findOne({ _id })
        const userID = req.user.userData._id

        const modelPath = path.join(__dirname, `../models/${userID}/${userDB.modelStoredAs}.js`);
        // console.log(modelPath)
        await fs.unlink(modelPath).then(()=>{
            req.isModelRemoved = true;
            next()
        })
    } catch (err) {
        next(err)
    }
}

const deleteController = async (req, res, next) => {
    try {
        const { _id } = req.query;
        const userDB = await UserDB.findOne({ _id })
        const userID = req.user.userData._id

        const controllerPath = path.join(__dirname, `../controllers/${userID}/${userDB.modelStoredAs}.js`);
        // console.log(controllerPath)
        await fs.unlink(controllerPath)
        req.isControllerRemoved = true;
        next()
    } catch (err) {
        next(err)
    }
}

const deleteRoutes = async (req, res, next) => {
    try {
        const { _id } = req.query;
        const userDB = await UserDB.findOne({ _id })
        const userID = req.user.userData._id

        const routePath = path.join(__dirname, `../routes/${userID}/${userDB.modelStoredAs}.js`);
        // console.log(routePath)
        await fs.unlink(routePath)
        req.isRoutesRemoved = true;
        next()
    } catch (err) {
        next(err)
    }
}

const deleteAllRoutes = async (req, res, next) => {
    try {
        const { _id } = req.query;
        const userDB = await UserDB.findOne({ _id })
        const userID = req.user.userData._id
        // console.log(userDB)

        // const allRoutePath = path.join(__dirname, `../utils/allRoutesData.txt`)
        // await fs.readFile(allRoutePath, 'utf-8', (err, data) => {
        //     if (err) {
        //         console.error('Error reading allRoutesData.txt :', err);
        //         return;
        //     }
        //     // console.log(data)
        //     const lineToRemove = `${userDB.modelStoredAs}: require('../routes/${userID}/${userDB.modelStoredAs}.js'),`;
        //     var newData = data.replace(lineToRemove, '');
        //     // console.log(newData.trim())
        //     newData = newData.trim()
        //     fs.writeFile(`${__dirname}/../utils/allRoutesData.txt`, newData, (err) => {
        //         if (err) {
        //             console.error('Error in adding data to allRoutes.js', err);
        //         } else {
        //             console.log('allRoutes.js successfully updated');
        //         }
        //     });
        //     //adding allroutes
        //     const allRoutesNewData = ``
        //     addAllRoute(allRoutesNewData)
        // }).then(() => {
        //     req.isAllRoutesRemoved = true
        //     next()
        // })

        const allRoutePath = path.join(__dirname, `../utils/allRoutesData.txt`);
        data = await fs.readFile(allRoutePath, 'utf-8');
        const lineToRemoveAllRoutes = `${userDB.modelStoredAs}: require('../routes/${userID}/${userDB.modelStoredAs}.js'),`;
        const newDataAllRoutes = data.replace(lineToRemoveAllRoutes, '');
        await fs.writeFile(`${__dirname}/../utils/allRoutesData.txt`, newDataAllRoutes)
        await addAllRoute('').then(() => {
            req.isAllRoutesRemoved = true
            next()
        }).catch((err) => {
            return next(createError(400, err))
        })
    } catch (err) {
        next(err)
    }
}

const deleteAppRoutes = async (req, res, next) => {
    try {
        const { _id } = req.query;
        const userDB = await UserDB.findOne({ _id })
        // console.log(userDB)

        // const appRoutePath = path.join(__dirname, `../utils/app-routeData.txt`)
        // await fs.readFile(appRoutePath, 'utf-8', (err, data) => {
        //     if (err) {
        //         console.error('Error reading app-routeData.txt :', err);
        //         return;
        //     }
        //     // console.log(data)
        //     const lineToRemove = `app.use(allRoutes.${userDB.modelStoredAs});`
        //     var newData = data.replace(lineToRemove, '');
        //     // console.log(newData.trim())
        //     newData = newData.trim()
        //     fs.writeFile(`${__dirname}/../utils/app-routeData.txt`, newData, (err) => {
        //         if (err) {
        //             console.error('Error in adding data to app-routes.js', err);
        //         } else {
        //             console.log('app-routes.js successfully updated');
        //         }
        //     });
        //     //adding approutes
        //     const appRoutesNewData = ``
        //     addAppRoute(appRoutesNewData)
        // }).then(() => {
        //     req.isAppRoutesRemoved = true
        //     next()
        // })

        const appRoutePath = path.join(__dirname, `../utils/app-routeData.txt`);
        let data = await fs.readFile(appRoutePath, 'utf-8');
        const lineToRemove = `app.use(allRoutes.${userDB.modelStoredAs});`;
        const newData = data.replace(lineToRemove, '');
        await fs.writeFile(`${__dirname}/../utils/app-routeData.txt`, newData)
        await addAppRoute('').then(() => {
            req.isAppRoutesRemoved = true
            next()
        }).catch((err) => {
            return next(createError(400, err))
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    deleteModel,
    deleteController,
    deleteRoutes,
    deleteAllRoutes,
    deleteAppRoutes
}