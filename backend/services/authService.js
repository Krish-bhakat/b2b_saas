const gym = require('../models/gym');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const members = require('../models/members');

class authService {
    async registerGym(ownerData){
        const {gymName,ownerName, email,password,planType} = ownerData;

        const existingGym = await gym.findOne({email});
        if(existingGym){
            throw new Error('Gym with this email already exists');
        }
        let memberLimit = 50; // Default Free Plan limit
        if (planType === 'basic') memberLimit = 200;
        if (planType === 'premium') memberLimit = 1000;

        const newgym = await Gym.create({
            name: gymName,
            email:email,
            subscription:{
                planType: planType || 'free',
                status: 'active'
            }
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        

        const newUser = await member.create({
            gymid: newgym._id,
            email: email,
            name:ownerName,
            paswword: hashedPassword,
            role:'Owner',
            phone:'0000000000',
            membershipStartDate: new Date(),
            membershipEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            isActive:true

        })

        return{
            gymId: newgym._id,
            gymName: newgym.name,
            ownerName: newUser.name,
            saasplan: newgym.subscription.planType,
        }
    }

    async loginGym(loginData){
        const {email,password} = loginData;
        const existingGym = await members.findOne({email});
        if(!existingGym){
            throw new Error('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, existingGym.password);
        if(!isMatch){
            throw new Error('Invalid email or password');
        }

        const gymDetails = await gym.findById(existingGym.gymid);
        if(!gymDetails) throw new Error('Gym not found');

        if(gymDetails.subscription.status !== 'active'){
            throw new Error('Your SaaS subscription is not active. Please contact support.');
        }

        const token = jwt.sign({ gymId: existingGym._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return {token, user:{
            id: existingGym._id,
            gymName: existingGym.name,
            email: existingGym.email,
            role: existingGym.role,
            plan: existingGym.subscription.planType,
        }};
    }
}

module.exports = new authService();