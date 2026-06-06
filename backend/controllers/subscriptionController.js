const members = require ('../models/members');
const subscription = require('../models/subscription');
const membership = require('../models/membership');

exports.createMembership = async(req,res) => {
    try{
        const{planName,price,durationInDays} = req.body;
        const gymId = req.user.gymId;
        if(!planName || !durationInDays || !price){
            return res.status(401).json({message: "Please fill all the details"})
        }
        if (price < 0 || durationInDays <= 0) {
            return res.status(400).json({ 
                message: 'Price cannot be negative and durationInDays must be at least 1 day.' 
            });
        }
        const newPlan = new membership({
            gymid:gymId,
            planName,
            price,
            durationInDays
        })
        await newPlan.save();

        return res.status(200).json({message: "Plan created successfully", plan: newPlan});
       
    }
    catch(err){
        return res.status(500).json({
            message: 'Server error while generating new membership plan',
            error: err.message
        });
    }
}


exports.optInPlan = async(req,res) =>{
    try{
        const {planId,memberId,paymentMethod} = req.body;
        const gymId = req.user.gymId;

        if(!memberId || !planId) {
            return res.status(401).json({message:"missing memberid or planid"});
        }
        const plan = await membership.findOne({_id:planId, gymid:gymId })
        if(!plan){
          return res.status(401).json({message:"missing membership plan"});
        }
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + plan.durationInDays);

        const newSubscription = new subscription({
            gymid: gymId,
            memberid: memberId,
            planId: planId,
            startDate,
            endDate,
            status: 'active',
            paymentMethod:paymentMethod || "Cash"
        });

        await newSubscription.save();
        return res.status(201).json({
            message: 'Subscription plan activated successfully',
            subscription: newSubscription
        });
    }
    catch(err){
        return res.status(500).json({ 
            message: 'Server error while processing plan activation', 
            error: err.message 
        });
    }
}

exports.updatePlan = async (req,res) => {
    try{
        const{memberId,newPlanId} = req.body;
        const gymId = req.user.gymId

        if(!memberId || !newPlanId){
            return res.status(401).json({message:"Missing memberid or planid"})
        }

        const newPlan = await membership.findOne({_id:newPlanId, gymid:gymId})
        if(!newPlan){
             return res.status(401).json({message:"The requested membership plan does not exist for this gym"})
        }
        const currentSubscription = await subscription.findOne({
            memberid: memberId,
            gymid: gymId,
            status: 'active'
        })
        if(!currentSubscription){
            return res.status(401).json({message: "No active subscription found to upgrade. Please use the opt-in endpoint instead."})
        }
        currentSubscription.status = 'cancelled';
        currentSubscription.endDate = new Date();
        await currentSubscription.save();

        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + newPlan.durationInDays);

        const upgradedSubscription = new subscription({
            gymid: gymId,
            memberid: memberId,
            planId: newPlanId,
            startDate,
            endDate,
            status: 'active',
            paymentMethod
        });
        await upgradedSubscription.save();
        return res.status(200).json({
            message: 'Subscription tier upgraded successfully!',
            oldSubscriptionId: currentSubscription._id,
            newSubscription: upgradedSubscription
        });
    }
    catch(err){
        return res.status(500).json({
            message: 'Server error while executing plan upgrade mutation',
            error: err.message
        });
    }
}