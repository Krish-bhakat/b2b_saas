const express = require('express');
const { authMiddleware, authoriseRole } = require('../middleware/authMiddleware');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.use(authMiddleware);
router.post('/opt-in',authoriseRole('Owner','Trainer'),subscriptionController.optInPlan);
router.put('/upgrade-plan',authoriseRole('Owner', 'Trainer'),subscriptionController.updatePlan);
// Administrative Pricing Configuration
router.post('/create-plan', authoriseRole('Owner'), subscriptionController.createMembership);

module.exports=router;
