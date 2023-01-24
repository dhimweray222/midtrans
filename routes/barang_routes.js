const express = require('express');
const router = express.Router();
const {
    create,
    hardDelete,
    getAll,
    search
} = require('../controllers/barang_controllers');
const { authentication } = require('../middlewares/auth_middlewares');

router.post('/', authentication,create);
router.delete('/:id', authentication, hardDelete);
router.get('/', authentication,getAll);
router.get('/:searchQuery', search);

module.exports = router;
