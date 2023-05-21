const express = require('express');
const router = express.Router();
const {logoutUser, registerUser, authUser, updateUserProfile, getUserProfile} = require('../controllers/userController');
const protect = require ('../middleware/authMiddleware');

router.post('/auth', authUser);
router.post('/', registerUser);
router.post('/logout', logoutUser);
router
 .route('/profile')
 .get(protect, getUserProfile)
 .put(protect, updateUserProfile);

module.exports = router;


