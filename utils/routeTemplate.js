const fs = require('fs')
const path = require('path')

const routeTemplate = (userID, modelFileName, controllerFilePath, routeFilePath) => {
    return new Promise((resolve, reject) => {
        const content = `const {addData,getData,getDataById,updateDataById,deleteDataById} = require('../../${controllerFilePath}')
        const express = require('express')
        const router = express.Router()

        router.post('/${modelFileName}/addData',addData)
        router.get('/${modelFileName}/getData',getData)
        router.get('/${modelFileName}/getDataById',getDataById)
        router.put('/${modelFileName}/updateDataById',updateDataById)
        router.delete('/${modelFileName}/deleteDataById',deleteDataById)

        module.exports = router
        `;

        const filePath = path.join(__dirname, `../${routeFilePath}`)

        fs.writeFile(filePath, content, (err) => {
            if (err) {
                console.error('Error creating the Route file:', err);
                reject(err);
            } else {
                console.log('Route File created successfully!');
                resolve();
            }
        });
    })
}

module.exports = {
    routeTemplate
}