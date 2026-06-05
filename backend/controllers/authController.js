const authService = require('../services/authService');

exports.registerGym = async (req, res) => {
     console.log("🎮 Controller Triggered! Received body:", req.body);
    try {
       const{email,password,gymName,ownerName} = req.body;
        if (!email || !password || !gymName || !ownerName) {
            return res.status(400).json({ message: 'Missing email or password' });
        }

        const gym = await authService.registerGym(req.body);
        return res.status(201).json({message: 'Gym profile created successfully', data: gym});
    
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.loginGym = async (req,res) => {
    try {
        const {email,password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing email or password' });
        }

        const gym = await authService.loginGym(req.body);
        return res.status(200).json({ message: 'Login successful', token:gym.token, user:gym.user });
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}