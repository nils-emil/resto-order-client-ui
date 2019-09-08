const router = require('express').Router();
const orderRoutes = require('./api/orderController');
const menuItemRoutes = require('./api/menuItemController');

router.use('/api/menu', menuItemRoutes);
router.use('/api/menu/order', orderRoutes);

module.exports = router;