const router = require('express').Router();
const orderRoutes = require('./api/orderController');
const menuItemRoutes = require('./api/menuItemController');
const tabRoutes = require('./api/tabController');

router.use('/api/menu', menuItemRoutes);
router.use('/api/menu/order', orderRoutes);
router.use('/api/tab', tabRoutes);

module.exports = router;