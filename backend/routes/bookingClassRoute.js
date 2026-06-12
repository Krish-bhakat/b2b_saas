const express = require('express');
const router = express.Router();
const {authMiddleware,authoriseRole} = require('../middleware/authMiddleware');
const bookingController = require('../controllers/bookClassController');

router.use(authMiddleware);

// Schedule Mutation Route
router.post('classes/create', authoriseRole('Owner'), bookingController.createClass);
router.post('bookings/reserve', authoriseRole('Owner', 'Trainer'), bookingController.bookClass);

module.exports = router;