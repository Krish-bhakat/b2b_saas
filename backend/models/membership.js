const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    gymid: {type: mongoose.Schema.Types.ObjectId, ref:'Gym', required:true},
    planName: {type:String, required:true},
    price: {type:Number, required:true},
    durationInDays:{type:Number, required:true}
});

module.exports = mongoose.model('Membership', membershipSchema);