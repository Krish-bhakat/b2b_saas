const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/register', authController.registerGym);
router.post('/login', authController.loginGym);

module.exports = router;