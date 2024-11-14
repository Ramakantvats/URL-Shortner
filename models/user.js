const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory:[{timestamp:{type:Number}}]
},{timestamps:true})

const UserModel = mongoose.model("user" , UserSchema)

module.exports = UserModel