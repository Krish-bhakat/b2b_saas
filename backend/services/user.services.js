const userModel = require('../models/user.model');

module.exports.createrUser = async ({
    gymName,email,password,subscriptionPlan,
}) => {
    if(!gymName || !email || !password){
        throw new Error('All fields are required');
    }

    const user = userModel.create({
        gymName,email,password,subscriptionPlan
    })
    return user;
}