const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = {
                id: decoded.userId,
                gymId:decoded.gymId,
                role: decoded.role
            }
            next();
        }
        catch(err){
            return res.status(401).json({message:'Not authorised, token verification failed'});
        }
    }
    if(!token){
        return res.status(401).json({message:'Not authorised, no token provided'});

    }
}
const authoriseRole = (...allowedRoles) => {


    return (req, res, next) => {

        console.log("👥 Security Check - User Role:", req.user.role, " | Allowed Roles:", allowedRoles);
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({message:'Forbidden: Unauthorized role'});
        }
        next();
    }
}
module.exports = {
    authMiddleware,
    authoriseRole
}