const express = require('express');
const router = express.Router();
const {
    createTodo
} = require('../controllers/todo_controllers');

router.post('/', createTodo);


module.exports = router;
