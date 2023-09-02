const {createError} = require('../middleware/error')

const addData = async(req,res,next) =>{
    try{
        const nameofthemodel = req.url.split('/')[1];
        const userIDoftheuser = nameofthemodel.split('_')[2];
        const fields = {}
        
        const {model,modelSchema} = require(`../models/${userIDoftheuser}/${nameofthemodel}`)

        Object.keys(modelSchema.tree).map(key=>{
            // console.log(key)
            if(key!='_id' && key!='__v' && key!='id'){
                let key = req.body
                fields[key]= key
            }
        })
        // console.log(fields)

        const modelInst = new model(fields['[object Object]'])
        await modelInst.save();
        res.status(201).json({message:"Data successfully added to database"})
    }catch(err){
        next(err)
    }
}

const getData = async(req,res,next)=>{
    try{
        const nameofthemodel = req.url.split('/')[1];
        const userIDoftheuser = nameofthemodel.split('_')[2];
        
        const {model} = require(`../models/${userIDoftheuser}/${nameofthemodel}`)
        const data = await model.find({})
        if(!data){
            res.status(200).json({message:"No Data to display."})
        }
        res.status(200).json({data})
    }catch(err){
        next(err)
    }
}

const getDataById = async(req,res,next)=>{
    try{
        const {_id} = req.query
        if(!_id){
            return next(createError(400, "Please send ID of the data as '_id'"))
        }

        const nameofthemodel = req.url.split('/')[1];
        const userIDoftheuser = nameofthemodel.split('_')[2];
        const {model} = require(`../models/${userIDoftheuser}/${nameofthemodel}`)
        const data = await model.findOne({_id})
        if(data){
            res.status(200).json({data})
        }else{
            return next(createError(400, "No data entry found with this id! Orelse try sending ID as '_id'"))
        }
    }catch(err){
        next(err)
    }
}

const updateDataById = async(req,res,next)=>{
    try{
        const{_id} = req.query
        if(!_id){
            return next(createError(400, "Please send ID of the data as '_id'"))
        }
        const nameofthemodel = req.url.split('/')[1];
        const userIDoftheuser = nameofthemodel.split('_')[2];
        const fields = {}
        
        const {model,modelSchema} = require(`../models/${userIDoftheuser}/${nameofthemodel}`)

        Object.keys(modelSchema.tree).map(key=>{
            // console.log(key)
            if(key!='_id' && key!='__v' && key!='id'){
                let key = req.body
                fields[key]= key
            }
        })

        const modelInst = await model.updateOne({_id},{
            $set:fields['[object Object]']
        })
        res.status(200).json({message:"Data successfully updated"})
    }catch(err){
        next(err)
    }
}

const deleteDataById = async(req,res,next) =>{
    try{
        const{_id} = req.query
        if(!_id){
            return next(createError(400, "Please send ID of the data as '_id'"))
        }
        const nameofthemodel = req.url.split('/')[1];
        const userIDoftheuser = nameofthemodel.split('_')[2];
        
        const {model} = require(`../models/${userIDoftheuser}/${nameofthemodel}`)
        const modelInst = await model.deleteOne({_id})
        res.status(200).json({message:"Data successfully deleted"})
    }catch(err){
        next(err)
    }
}

module.exports = {
    addData,
    getData,
    getDataById,
    updateDataById,
    deleteDataById
}