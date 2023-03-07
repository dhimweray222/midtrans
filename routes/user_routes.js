const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getProfile,
    updateProfile
} = require('../controllers/user_controllers');

router.post('/', register);
router.post('/login',  login);
router.get('/:id', getProfile);
router.put('/:id', updateProfile);

module.exports = router;
