const express = require('express');
const router = express.Router();
const {authMiddleware,authoriseRole} = require('../middleware/authMiddleware');
const memberController = require('../controllers/memberController');

router.use(authMiddleware); // Protect all member routes
router.get('/members',authoriseRole('Owner', 'Trainer'),memberController.getGymMembers);
router.post('/members',authoriseRole('Owner', 'Trainer'),memberController.createNewMember);

module.exports = router;