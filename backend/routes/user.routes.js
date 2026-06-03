const express = require('express');
const router = express.Router();
const {body} = require("express-validator")
const userController = require('../controllers/users');

router.post('/register',[
    body('gymName').notEmpty().withMessage('Gym name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 characters long')
],
    userController.registerUser
);

module.exports = router;