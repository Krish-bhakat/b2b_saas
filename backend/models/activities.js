const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    gymid: {type: mongoose.Schema.Types.ObjectId, ref:'Gym', required:true},
    className: {type:String, required:true},
    trainerid: {type:mongoose.Schema.Types.ObjectId, ref:'Member', required:true},
    capacity: {type:Number, required:true},
    bookedCount: {type:Number, default:0},
    schedule: {
        day: {type:String, required:true},
        startTime: {type:String, required:true},
        endTime: {type:String,required:true}
    }
});

const bookingSchema = new mongoose.Schema({
    gymId: {type: mongoose.Schema.Types.ObjectId, ref:'Gym', required:true},
    memberId: {type: mongoose.Schema.Types.ObjectId, ref:'Member', required:true},
    classId: {type: mongoose.Schema.Types.ObjectId, ref:'Class', required:true},
    bookingDate: {type:Date, default:Date.now},
    status: {type:String, enum:['booked', 'cancelled'], default:'booked'}
});

module.exports = {
    Class: mongoose.model('Class', classSchema),
    Booking: mongoose.model('Booking', bookingSchema)
};