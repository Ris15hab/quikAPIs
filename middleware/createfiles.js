const { createError } = require('./error')
const { addAllRoute, addAppRoute } = require('../utils/addRoute')
const { modelTemplate } = require('../utils/modelTemplate')
const { controllerTemplate } = require('../utils/controllerTemplate')
const { routeTemplate } = require('../utils/routeTemplate')
const fs = require('fs').promises
const path = require('path')

const createModel = async (req, res, next) => {
    try {
        const { modelName, modelSchema } = req.body;
        const userID = req.user.userData._id;

        //User's Model Folder
        const userModelFolder = path.join(__dirname, `../models/${userID}`);
        // if (!fs.existsSync(userModelFolder)) {
        //     await fs.mkdir(userModelFolder);
        // }
        try {
            await fs.access(userModelFolder);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.mkdir(userModelFolder, { recursive: true });
            } else {
                // Handle other error cases
                next(error);
            }
        }

        //get time
        const currentTime = new Date();
        const hours = String(currentTime.getHours()).padStart(2, "0");
        const minutes = String(currentTime.getMinutes()).padStart(2, "0");
        const seconds = String(currentTime.getSeconds()).padStart(2, "0");
        const time = `_${hours}${minutes}${seconds}`

        //modelfilename 
        const modelFileName = modelName + time + '_' + userID
        const modelFilePath = `models/${userID}/${modelFileName}.js`
        await modelTemplate(modelFileName, modelSchema, modelFilePath).then(() => {
            req.isModelCreated = true;
            req.modelFileName = modelFileName
            req.modelFilePath = modelFilePath
            console.log(req.isModelCreated)
            next();
        }).catch((err)=>{
            return next(createError(400,err))
        })
    } catch (err) {
        next(err)
    }
}

const createController = async (req, res, next) => {
    try {
        const { modelName, modelSchema, modelDescription } = req.body;
        const userID = req.user.userData._id;
        const modelFileName = req.modelFileName
        const modelFilePath = req.modelFilePath

        //User's Controller Folder
        const userControllerFolder = path.join(__dirname, `../controllers/${userID}`);
        // if (!fs.existsSync(userControllerFolder)) {
        //     await fs.mkdir(userControllerFolder);
        // }
        try {
            await fs.access(userControllerFolder);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.mkdir(userControllerFolder, { recursive: true });
            } else {
                // Handle other error cases
                next(error);
            }
        }

        const controllerFilePath = `controllers/${userID}/${modelFileName}.js`
        await controllerTemplate(modelFileName, modelSchema, modelFilePath, controllerFilePath).then((value) => {
            req.isControllerCreated = true
            req.controllerFilePath = controllerFilePath
            console.log(req.isControllerCreated)
            next();
        }).catch((err)=>{
            return next(createError(400,err))
        })
    } catch (err) {
        next(err)
    }
}

const createRoutes = async (req, res, next) => {
    try {
        const userID = req.user.userData._id;
        const modelFileName = req.modelFileName
        const controllerFilePath = req.controllerFilePath

        //User's Route Folder
        const userRouteFolder = path.join(__dirname, `../routes/${userID}`);
        // if (!fs.existsSync(userRouteFolder)) {
        //     await fs.mkdir(userRouteFolder);
        // }
        try {
            await fs.access(userRouteFolder);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.mkdir(userRouteFolder, { recursive: true });
            } else {
                // Handle other error cases
                next(error);
            }
        }

        const routeFilePath = `routes/${userID}/${modelFileName}.js`
        await routeTemplate(userID, modelFileName, controllerFilePath, routeFilePath).then(() => {
            req.isRouteCreated = true
            req.routeFilePath = routeFilePath
            console.log(req.isRouteCreated)
            next();
        }).catch((err)=>{
            return next(createError(400,err))
        })
    } catch (err) {
        next(err)
    }
}

const appendAllRoutes = async (req, res, next) => {
    try {
        modelFileName = req.modelFileName
        routeFilePath = req.routeFilePath

        const allRoutesNewData = `\n${modelFileName}: require('../${routeFilePath}'),`
        await addAllRoute(allRoutesNewData).then(() => {
            req.isAllRoutesAdded = true
            next();
        }).catch((err)=>{
            return next(createError(400,err))
        })
    } catch (err) {
        next(err)
    }
}

const appendAppRoutes = async (req, res, next) => {
    try {
        modelFileName = req.modelFileName

        //adding approutes
        const appRoutesNewData = `\napp.use(allRoutes.${modelFileName});`
        await addAppRoute(appRoutesNewData).then(() => {
            req.isAppRoutesAdded = true
            next();
        }).catch((err)=>{
            return next(createError(400,err))
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createModel,
    createController,
    createRoutes,
    appendAllRoutes,
    appendAppRoutes
}