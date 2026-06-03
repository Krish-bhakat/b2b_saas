const gymModel = require('../models/gym.model');

module.exports.createrGym = async ({
    gymName,email,password,subscriptionPlan,
}) => {
    if(!gymName || !email || !password){
        throw new Error('All fields are required');
    }

    const gym = gymModel.create({
        gymName,email,password,subscriptionPlan
    })
    return gym;
}