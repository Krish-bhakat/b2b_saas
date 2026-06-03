const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const gymSchema = new mongoose.Schema({
    gymName: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true, select:false},
    logo: {type:String},
    subscription:{
        subscriptionPlan: {type:String, required:true},
        status: {type:String, enum:['active','pending','cancelled']}
    }
});

gymSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
};

gymSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

gymSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

const gymModel = mongoose.model('Gym', gymSchema);
module.exports = gymModel;