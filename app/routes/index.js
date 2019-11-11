const auth = require('../middleware/auth');
const router = require('express').Router();
const orderPublicRoutes = require('./api/public/orderController');
const menuItemPrivateRoutes = require('./api/protected/menuItemController');
const menuItemPublicRoutes = require('./api/public/menuItemController');
const tabPublicRoutes = require('./api/public/tabController');
const categoryPrivateRoutes = require('./api/protected/categoryController');
const categoryPublicRoutes = require('./api/public/categoryController');
const userPublicRoute = require('./api/public/userController');
const userPrivateRoute = require('./api/protected/userController');
const organizationPrivateRoute = require('./api/protected/organizationController');

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
