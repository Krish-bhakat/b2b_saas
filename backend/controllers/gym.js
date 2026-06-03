const gymModel = require('../models/gym.model');
const gymService = require('../services/gym.services');
const {validationResult} = require('express-validator');


module.exports.registerGym = async (req,res,next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {gymName,email,password,subscriptionPlan} = req.body;
    const hashedPassword = await gymModel.hashPassword(password);
    const user = await userService.createrUser({
        gymName,email,password:hashedPassword,subscriptionPlan
    })
    const token = user.generateAuthToken();
    res.status(201).json({message:'User registered successfully',user, token});
}