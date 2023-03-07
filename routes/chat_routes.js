const express = require('express');
const router = express.Router();
const {
    get_all_user,
    send,
    get_all_messages
} = require('../controllers/chat_controllers');
const { authentication } = require('../middlewares/auth_middlewares');

router.get('/get_users', authentication,get_all_user);
router.post('/:id', authentication,send);
router.get('/get_messages/:id',authentication,get_all_messages)


module.exports = router;
