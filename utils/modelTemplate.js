const fs = require('fs')
const path = require('path')

const modelTemplate = async (modelName, modelSchema,modelFilePath) => {

    // const schemaDetails = modelSchema
    // console.log(schemaDetails)

    // const modelSchema = JSON.parse(modelSchemaJSON);
    // console.log(modelSchema)

    const properties = Object.keys(modelSchema).map(key => {
        // console.log(key)
        const property = modelSchema[key];
        return `${key}: {
            type: ${property.type},
            ${property.required=='true' ? "required: true," : "required: false,"}
            ${property.unique=='true' ? "unique: true," : "unique: false,"}
        }`;
    });

    // console.log(properties)
    // console.log(Object.keys(modelSchema))
    // console.log(Object.values(modelSchema))

    const content =
    `const mongoose = require('mongoose');

    const ${modelName}Schema = mongoose.Schema({
        ${properties.join(",\n")}
    });
    const ${modelName} = mongoose.model('${modelName}', ${modelName}Schema);
    module.exports = ${modelName}`;

    const filePath = path.join(__dirname,`../${modelFilePath}`)

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error creating the model file:', err);
        } else {
            console.log('Model File created successfully!');
        }
    });
}

module.exports={
    modelTemplate
}

// const modelSchemaJSON = `{
//     "username": {
//       "type": "String",
//       "required": true
//     },
//     "email": {
//       "type": "String",
//       "required": true
//     },
//     "password": {
//       "type": "String",
//       "required": true
//     },
//     "isVerified": {
//       "type": "Boolean",
//       "default": false
//     }
//   }`;

// modelTemplate("rishab", modelSchemaJSON);