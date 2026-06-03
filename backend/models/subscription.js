const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    gymid: {type: mongoose.Schema.Types.ObjectId, ref:'Gym', required:true},
    memberid: {type: mongoose.Schema.Types.ObjectId, ref:'Member', required:true},
    planId: {type: mongoose.Schema.Types.ObjectId, ref:'Membership', required:true},
    startDate: {type:Date, required:true},
    endDate: {type:Date, required:true},
    status: {type:String, enum:['active', 'inactive', 'cancelled'], default:'active'},
    paymentMethod: {type:String}
});

module.exports = mongoose.model('Subscription', subscriptionSchema);