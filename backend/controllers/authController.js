const authService = require('../services/AuthService');

exports.registerGym = async (req, res) => {
    try {
        const gym = await authService.registerGym(req.body);
        if(!gymName || !email || !ownerName || !!password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        res.status(201).json({ message: 'Gym registered successfully', gym }); 
    const result = await authService.registerGym(req.body);
    return res.status(201).json({message: 'Gym profile created successfully', data: result});
    
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
        res.status(200).json({ message: 'Login successful', gym });
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}