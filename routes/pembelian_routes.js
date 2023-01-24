const express = require('express');
const router = express.Router();
const {
    create,
    getAll,
    coreApi
} = require('../controllers/pembelian_controllers');
const { authentication } = require('../middlewares/auth_middlewares');

router.post('/', authentication,create);
router.get('/', authentication,getAll);
router.post('/order', authentication,coreApi);

module.exports = router;
