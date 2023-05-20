const express = require('express');
const router = express.Router();
const {logoutUser, registerUser, authUser, updateUserProfile, getUserProfile} = require('../controllers/userController')

router.post('/auth', authUser);
router.post('/', registerUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
module.exports = router;


