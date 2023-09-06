const { createError } = require('../middleware/error')
// const fs = require('fs');
const path = require('path');
// const { addAllRoute, addAppRoute } = require('../utils/addRoute')
const UserDB = require('../models/userDB')
const fs = require('fs').promises;
const util = require('util');
const { modelTemplate } = require('../utils/modelTemplate')
const apiHitCountModel = require('../models/apiHitCount')

const createCRUD = async (req, res, next) => {
    try {
        const { modelName, modelSchema, modelDescription } = req.body;
        const userID = req.user.userData._id

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

        const properties = Object.keys(modelSchema).map(key => {
            // console.log(key)
            const property = modelSchema[key];
            return `${key}: {
            type: ${property.type},
            ${property.required == 'true' ? "required: true," : "required: false,"}
            ${property.unique == 'true' ? "unique: true," : "unique: false,"}
        }`;
        });

        const content =
            `const mongoose = require('mongoose');
        const modelSchema = mongoose.Schema({
            ${properties.join(",\n")}
        });
        const model = mongoose.model('${modelFileName}', modelSchema);
        module.exports = {model,modelSchema}`;

        const filePath = path.join(__dirname, `../${modelFilePath}`)

        await userDB.save();
        const data = await apiHitCountModel.findOne({
            userID:userID
        })
        data.totalDBCount = data.totalDBCount + 1;
        await data.save();
        res.status(200).json({ message: "success" })
        fs.writeFile(filePath, content, async (err) => {
            if (err) {
                console.error('Error creating the model file:', err);
            } else {
                console.log('Model File created successfully!');
            }
        });

        // await modelTemplate(modelFileName, modelSchema, modelFilePath).then(async () => {
        //     await userDB.save();
        //     res.status(200).json({ message: "success" })
        // }).catch((err) => {
        //     return next(createError(400, err))
        // })

    } catch (err) {
        console.log(err)
        next(err)
    }
}

// const deleteCRUD = async (req, res, next) => {
//     try {
//         const { _id } = req.query;
//         const userDB = await UserDB.findOne({ _id })
//         // console.log(userDB)
//         if (req.isModelRemoved && req.isControllerRemoved && req.isRoutesRemoved && req.isAllRoutesRemoved && req.isAppRoutesRemoved) {
//             await UserDB.deleteOne({ _id });
//             res.status(200).json({ message: "database deleted successfully" });
//         } else {
//             res.status(400).json({ message: "an error occured" })
//         }
//     } catch (err) {
//         next(err)
//     }
// }

const deleteCRUD = async (req, res, next) => {
    try {
        const { _id } = req.query;
        const userDB = await UserDB.findOne({ _id });
        const userID = req.user.userData._id;

        // const appRoutePath = path.join(__dirname, `../utils/app-routeData.txt`);
        // let data = await fs.readFile(appRoutePath, 'utf-8');
        // const lineToRemove = `app.use(allRoutes.${userDB.modelStoredAs});`;
        // const newData = data.replace(lineToRemove, '');
        // await fs.writeFile(`${__dirname}/../utils/app-routeData.txt`, newData);

        // const allRoutePath = path.join(__dirname, `../utils/allRoutesData.txt`);
        // data = await fs.readFile(allRoutePath, 'utf-8');
        // const lineToRemoveAllRoutes = `${userDB.modelStoredAs}: require('../routes/${userID}/${userDB.modelStoredAs}.js'),`;
        // const newDataAllRoutes = data.replace(lineToRemoveAllRoutes, '');
        // await fs.writeFile(`${__dirname}/../utils/allRoutesData.txt`, newDataAllRoutes);

        // const controllerPath = path.join(__dirname, `./${userID}/${userDB.modelStoredAs}.js`);
        // await fs.unlink(controllerPath);

        const modelPath = path.join(__dirname, `../models/${userID}/${userDB.modelStoredAs}.js`);
        await fs.unlink(modelPath);

        // const routePath = path.join(__dirname, `../routes/${userID}/${userDB.modelStoredAs}.js`);
        // await fs.unlink(routePath);

        await UserDB.deleteOne({ _id });
        res.status(200).json({ message: "database deleted successfully" });
    } catch (err) {
        next(err);
    }
};


module.exports = {
    createCRUD,
    deleteCRUD
}