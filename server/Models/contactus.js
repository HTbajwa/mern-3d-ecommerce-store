const mongoose=require('mongoose')

const contactschema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Message:{
        type:String,
        required:true
    },


},{ timestamps: true });

const contactus=mongoose.model("contactus",contactschema)

module.exports=contactus