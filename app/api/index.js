const auth = require('../middleware/auth');
const router = require('express').Router();
const orderPublicRoutes = require('./public/orderController');
const menuItemPrivateRoutes = require('./protected/menuItemController');
const menuItemPublicRoutes = require('./public/menuItemController');
const tabPublicRoutes = require('./public/tabController');
const categoryPrivateRoutes = require('./protected/categoryController');
const categoryPublicRoutes = require('./public/categoryController');
const userPublicRoute = require('./public/userController');
const userPrivateRoute = require('./protected/userController');
const organizationPrivateRoute = require('./protected/organizationController');

router.use('/api/category', categoryPublicRoutes);
router.use('/api/user', userPublicRoute);
router.use('/api/menu', menuItemPublicRoutes);
router.use('/api/table', tabPublicRoutes);
router.use('/api/menu/order', orderPublicRoutes);

router.use(auth);
router.use('/api/menu', menuItemPrivateRoutes);
router.use('/api/user', userPrivateRoute);
router.use('/api/organization', organizationPrivateRoute);
router.use('/api/category', categoryPrivateRoutes);

module.exports = router;
