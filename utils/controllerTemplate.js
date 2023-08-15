const fs = require('fs')
const path = require('path')

const controllerTemplate = (modelFileName, modelSchema, modelFilePath, controllerFilePath) => {

    // const modelSchema = JSON.parse(modelSchemaJSON);

    //extracting fields
    let fields = [];
    Object.keys(modelSchema).map(key => {
        // console.log(key)
        fields.push(key)
    });

    // let  stringfields =[];
    // for(i=0;i<fields.length;i++){
    //     stringfields[i]=`"${fields[i]}"`
    // }

    // console.log(stringfields)

    const data = `const ${modelFileName} = require('../../${modelFilePath}')\nconst { createError } = require('../../middleware/error')\n\nconst addData = async(req,res,next) =>{
        try{
            const {${fields.join(',')}} = req.body
            const modelInst = new ${modelFileName}({
                ${fields.join(',')}
            })
            await modelInst.save();

            res.status(201).json({message:"Data successfully added to database"})
        }catch(err){
            next(err)
        }
    }\n\nconst getData = async(req,res,next)=>{
        try{
            const data = await ${modelFileName}.find({})
            if(!data){
                res.status(200).json({message:"No Data to display."})
            }
            res.status(200).json({data})
        }catch(err){
            next(err)
        }
    }\n\nconst getDataById = async(req,res,next)=>{
        try{
            const {_id} = req.query
            const data = await ${modelFileName}.find({_id})
            if(data){
                res.status(200).json({data})
            }else{
                return next(createError(400, "No data entry found with this id! Orelse try sending ID as '_id'"))
            }
        }catch(err){
            next(err)
        }
    }\n\nconst updateDataById = async(req,res,next)=>{
        try{
            const {${fields.join(',')}} = req.body
            const{_id} = req.query
            if(!_id){
                return next(createError(400, "Please send ID of the data as '_id'"))
            }
            const modelInst = await ${modelFileName}.updateOne({_id},{
                $set:{
                    ${fields.join(',')}
                }
            })
            res.status(200).json({message:"Data successfully updated"})
        }catch(err){
            next(err)
        }
    }\n\nconst deleteDataById = async(req,res,next) =>{
        try{
            const{_id} = req.query
            if(!_id){
                return next(createError(400, "Please send ID of the data as '_id'"))
            }
            const modelInst = await ${modelFileName}.deleteOne({_id})
            res.status(200).json({message:"Data successfully deleted"})
        }catch(err){
            next(err)
        }
    }\n\nmodule.exports = {
        addData,
        getData,
        getDataById,
        updateDataById,
        deleteDataById
    }`

    const filePath = path.join(__dirname, `../${controllerFilePath}`)

    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error('Error creating the controller file:', err);
        } else {
            console.log('Controller File created successfully!');
        }
    });
}

module.exports = {
    controllerTemplate
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

//   controllerTemplate('samplename',modelSchemaJSON,'sample/path')