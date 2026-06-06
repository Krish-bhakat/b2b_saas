const members = require('../models/members');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getGymMembers = async (req,res) => {
    try{
        const gym = req.user.gymId;
        const memberList = await members.find({gymid:gym, role:'Member'});
        res.status(200).json(memberList);
    }
    catch(err){
        res.status(500).json({message:'Server error', error:err.message});
    }
}

exports.createNewMember = async (req,res) =>{
    try{
        const gym = req.user.gymId;
        const {name,email,password,role,phone,membershipStartDate,membershipEndDate} = req.body;
        if(!name || !email || !password || !phone || !membershipStartDate || !membershipEndDate){
            return res.status(400).json({message:'Missing required fields'});
        }
        const hashedPaswword = await bcrypt.hash(password,10);
        const newMember = new members({
            gymid:gym,
            name,
            email,
            password:hashedPaswword,
            role: role || 'Member',
            phone,
            membershipStartDate,
            membershipEndDate
        });
        await newMember.save();
        res.status(201).json({message:'Member created successfully', member:newMember});
    }
    catch(err){
        res.status(500).json({message:'Server error', error:err.message});
    }
}