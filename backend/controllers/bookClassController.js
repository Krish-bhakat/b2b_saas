const {Class} = require('../models/activities');
const {Booking} = require('../models/activities');
const Subscription = require('../models/subscription');


exports.createClass = async(req,res) =>{
   try{
    const {className, trainerid, capacity, startTime, endTime} = req.body;
    const gymId = req.user.gymId;
    if(!className || !trainerid || !capacity || !startTime || !endTime){
        return res.status(400).json({
            message: "Please fill all the required fields"
        })
    }
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ message: 'Invalid date/time format provided.' });
        }
    
    if (start >= end) {
            return res.status(400).json({ message: 'Class startTime must be chronologically before the endTime.' });
        }
    
    if(parseInt(capacity) <= 0){
        return res.status(400).json({
            message:"Capacity of the class cannot be less than or equal to 0"
        })
    }
    
    const newClass = new Class({
        gymid:gymId,
        className,
        trainerid,
        capacity: parseInt(capacity),
        startTime,
        endTime,
        bookedCount:0
    })
    await newClass.save();

    return res.status(200).json({
        message:"Gym Class scheduled successfully",
        class:newClass
    });
}
    catch(err){
        return res.status(500).json({
                message: 'Server error while generating new class schedule',
                error: err.message
            });
    }

}

exports.bookClass = async(req,res) => {
    try {
        const {memberId,classId} = req.body
        const gymId = req.user.gymId;

        if(!memberId || !classId){
            return res.status(400).json({
                message:"Missing required parameters: memeberid, classid"
            })
        }
        const targetClass = await Class.findOne({_id:classId, gymid:gymId})
        if(!targetClass){
            return res.status(400).json({
                message:"Missing Class Details"
            })
        }
        if(targetClass.bookedCount >= targetClass.capacity){
            return res.status(400).json({
                message:"Member capacity exceeded. Class is full"
            })
        }

        const activeSubscription = await Subscription.findOne({
            memberid:memberId,
            gymid:gymId,
            status:'active',
            endDate: {$gt: new Date()}
        })

        if (!activeSubscription) {
            return res.status(403).json({ 
                message: 'Access Denied: Member must have an active, non-expired subscription plan to reserve class spots.' 
            });
        }

        const existingBooking = await Booking.findOne({
            memberid: memberId,
            classid: classId,
            status: 'booked'
        })
        if (existingBooking) {
            return res.status(400).json({ message: 'You have already reserved a confirmed spot in this class.' });
        }
        const newBooking = new Booking({
            gymid: gymId,
            memberid: memberId,
            classid: classId,
            status: 'confirmed'
        });

        await newBooking.save();

        targetClass.bookedCount += 1;
        await targetClass.save();
        return res.status(201).json({
            message: 'Class spot successfully reserved!',
            booking: newBooking,
            remainingSpots: targetClass.capacity - targetClass.bookedCount
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Server error while processing class reservation transaction',
            error: err.message
        });
    }
}