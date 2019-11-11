const router = require('express').Router();
const orderRoutes = require('./api/orderController');
const menuItemRoutes = require('./api/menuItemController');
const tabRoutes = require('./api/tabController');
const categoryRoutes = require('./api/categoryController');
const userRoute = require('./api/userController');

router.use('/api/menu', menuItemRoutes);
router.use('/api/menu/order', orderRoutes);
router.use('/api/table', tabRoutes);
router.use('/api/category', categoryRoutes);
router.use('/api/user', userRoute);

module.exports = router;
