const mongoose=require('mongoose')

const ContactSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

const Contact= new mongoose.model('Contactus',ContactSchema)

module.exports=Contact