const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    gymid: {type: mongoose.Schema.Types.ObjectId, ref:'Gym', required:true},
    memberid: {type: mongoose.Schema.Types.ObjectId, ref:'Member', required:true},
    checkInTime: {type:Date, required:true},
    checkOutTime: {type:Date}
});

module.exports = mongoose.model('Attendance', attendanceSchema);