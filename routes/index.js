const express = require('express');
const router = express.Router();
const errorHandler = require('../helpers/error_handlers');

const barangRoutes = require('./barang_routes');
const userRoutes = require('./user_routes');
const chatRoutes = require('./chat_routes');
const pembelianRoutes = require('./pembelian_routes');
const todoRoutes = require('./todo_routes');


router.use('/api/user', userRoutes);
router.use('/api/barang', barangRoutes);
router.use('/api/pembelian', pembelianRoutes);
router.use('/api/chat', chatRoutes);
router.use('/api/todo', todoRoutes);

router.use(errorHandler);

module.exports = router;
