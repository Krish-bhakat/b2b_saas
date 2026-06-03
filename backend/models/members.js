const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const memberSchema = new mongoose.Schema({
    gymid: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    role:{type:String, enum:['Owner','Trainer','Member']},
    profilePicture:{type: String},
    phone: {type:String, required:true},
    membershipStartDate: {type:Date, required:true},
    membershipEndDate: {type:Date, required:true},
    isActive: {type:Boolean, default:true}
}, 
    {timestamps:true}
);

module.exports = mongoose.model('Member', memberSchema);