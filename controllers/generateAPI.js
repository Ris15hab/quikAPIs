const { createError } = require('../middleware/error')
// const fs = require('fs');
const path = require('path');
const { modelTemplate } = require('../utils/modelTemplate')
const { controllerTemplate } = require('../utils/controllerTemplate')
const { routeTemplate } = require('../utils/routeTemplate')
const { addAllRoute, addAppRoute } = require('../utils/addRoute')
const UserDB = require('../models/userDB')
const fs = require('fs').promises;
const util = require('util');

const createCRUD = async (req, res, next) => {
    try {
        const { modelName, modelSchema, modelDescription } = req.body;
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
        await modelTemplate(modelFileName, modelSchema, modelFilePath)

        //User's Controller Folder
        const userControllerFolder = path.join(__dirname, `./${userID}`);
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
        controllerTemplate(modelFileName, modelSchema, modelFilePath, controllerFilePath)

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
        routeTemplate(userID, modelFileName, controllerFilePath, routeFilePath)

        //adding allroutes
        const allRoutesNewData = `\n${modelFileName}: require('../${routeFilePath}'),`
        addAllRoute(allRoutesNewData)

        //adding approutes
        const appRoutesNewData = `\napp.use(allRoutes.${modelFileName});`
        addAppRoute(appRoutesNewData)

        //adding details to userDB model

        //api url
        let url = `${req.hostname}/${modelFileName}`

        if (req.hostname == "localhost") { modelAPI = `http://${req.hostname}:8000/${modelFileName}` }
        else { modelAPI = `https://${url}` }

        //getting time
        const date = new Date();

        // const istTimeOffset = 330; // IST timezone offset: UTC+5:30
        // const istTimeInMilliseconds = date.getTime() + istTimeOffset * 60 * 1000;

        // // Create a new date object with the IST time
        // const istDate = new Date(istTimeInMilliseconds);

        // Format the date and time
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

        const formattedDate = date.toLocaleDateString('en-IN', options);

        //saving model
        const userDB = new UserDB({
            modelName,
            modelStoredAs: modelFileName,
            modelDescription,
            modelAPI,
            dateTime: formattedDate,
            userID
        })
        await userDB.save();

        res.status(200).json({ message: "success" })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const deleteCRUD = async (req, res, next) => {
    try {
        const { _id } = req.query;
        const userDB = await UserDB.findOne({ _id })
        console.log(userDB)
        const userID = req.user.userData._id
        
        const appRoutePath = path.join(__dirname,`../utils/app-routeData.txt`)
        await fs.readFile(appRoutePath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading app-routeData.txt :', err);
                return;
            }
            // console.log(data)
            const lineToRemove = `app.use(allRoutes.${userDB.modelStoredAs});`
            var newData = data.replace(lineToRemove, '');
            // console.log(newData.trim())
            newData = newData.trim()
            fs.writeFile(`${__dirname}/../utils/app-routeData.txt`, newData, (err) => {
                if (err) {
                    console.error('Error in adding data to app-routes.js', err);
                } else {
                    console.log('app-routes.js successfully updated');
                }
            });
            //adding approutes
            const appRoutesNewData = ``
            addAppRoute(appRoutesNewData)
        })

        const allRoutePath = path.join(__dirname,`../utils/allRoutesData.txt`)
        await fs.readFile(allRoutePath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading allRoutesData.txt :', err);
                return;
            }
            // console.log(data)
            const lineToRemove = `${userDB.modelStoredAs}: require('../routes/${userID}/${userDB.modelStoredAs}.js'),`;
            var newData = data.replace(lineToRemove, '');
            // console.log(newData.trim())
            newData = newData.trim()
            fs.writeFile(`${__dirname}/../utils/allRoutesData.txt`, newData, (err) => {
                if (err) {
                    console.error('Error in adding data to allRoutes.js', err);
                } else {
                    console.log('allRoutes.js successfully updated');
                }
            });
            //adding allroutes
            const allRoutesNewData = ``
            addAllRoute(allRoutesNewData)
        })

        const controllerPath = path.join(__dirname, `./${userID}/${userDB.modelStoredAs}.js`);
        await fs.unlink(controllerPath);

        const modelPath = path.join(__dirname, `../models/${userID}/${userDB.modelStoredAs}.js`);
        await fs.unlink(modelPath);

        const routePath = path.join(__dirname, `../routes/${userID}/${userDB.modelStoredAs}.js`);
        await fs.unlink(routePath);

        await UserDB.deleteOne({ _id });
        res.status(200).json({ message: "database deleted successfully" });
    } catch (err) {
        next(err)
    }
}

// const deleteCRUD = async (req, res, next) => {
//     try {
//         const { _id } = req.query;
//         const userDB = await UserDB.findOne({ _id });
//         const userID = req.user.userData._id;

//         const appRoutePath = path.join(__dirname, `../utils/app-routeData.txt`);
//         let data = await fs.readFile(appRoutePath, 'utf-8');
//         const lineToRemove = `app.use(allRoutes.${userDB.modelStoredAs});`;
//         const newData = data.replace(lineToRemove, '');
//         await fs.writeFile(`${__dirname}/../utils/app-routeData.txt`, newData);

//         const allRoutePath = path.join(__dirname, `../utils/allRoutesData.txt`);
//         data = await fs.readFile(allRoutePath, 'utf-8');
//         const lineToRemoveAllRoutes = `${userDB.modelStoredAs}: require('../routes/${userID}/${userDB.modelStoredAs}.js'),`;
//         const newDataAllRoutes = data.replace(lineToRemoveAllRoutes, '');
//         await fs.writeFile(`${__dirname}/../utils/allRoutesData.txt`, newDataAllRoutes);

//         const controllerPath = path.join(__dirname, `./${userID}/${userDB.modelStoredAs}.js`);
//         await fs.unlink(controllerPath);

//         const modelPath = path.join(__dirname, `../models/${userID}/${userDB.modelStoredAs}.js`);
//         await fs.unlink(modelPath);

//         const routePath = path.join(__dirname, `../routes/${userID}/${userDB.modelStoredAs}.js`);
//         await fs.unlink(routePath);

//         await UserDB.deleteOne({ _id });
//         res.status(200).json({ message: "database deleted successfully" });
//     } catch (err) {
//         next(err);
//     }
// };


module.exports = {
    createCRUD,
    deleteCRUD
}