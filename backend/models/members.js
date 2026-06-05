const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const memberSchema = new mongoose.Schema({
    gymid: {type: mongoose.Schema.Types.ObjectId, ref:'Gym', required:true},
    name: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    role:{type:String, enum:['Owner','Trainer','Member']},
    profilePicture:{type: String},
    phone: {type:String, required:true},
    membershipStartDate: {type:Date, required:true},
    membershipEndDate: {type:Date, required:true},
    isActive: {type:Boolean, default:true}
}, 
    {timestamps:true}
);
memberSchema.index({email:1,gymid:1} , {unique:true});

module.exports = mongoose.model('Member', memberSchema);