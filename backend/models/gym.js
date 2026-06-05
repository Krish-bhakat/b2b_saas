const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const gymSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    logo: {type:String},
    subscription:{
      planType: {type:String, required:true},
        status: {type:String, enum:['active','pending','cancelled']}
    }
});

const gymModel = mongoose.model('Gym', gymSchema);
module.exports = gymModel;