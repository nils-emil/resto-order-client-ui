const auth = require('../middleware/auth');
const router = require('express').Router();
const orderPublicRoutes = require('./public/orderController');
const orderPrivateRoutes = require('./protected/orderController');
const menuItemPrivateRoutes = require('./protected/menuItemController');
const menuItemPublicRoutes = require('./public/menuItemController');
const tabPublicRoutes = require('./public/tableController');
const categoryPrivateRoutes = require('./protected/categoryController');
const categoryPublicRoutes = require('./public/categoryController');
const userPublicRoute = require('./public/userController');
const userPrivateRoute = require('./protected/userController');
const organizationPrivateRoute = require('./protected/organizationController');

router.use('/api/client/category', categoryPublicRoutes);
router.use('/api/user', userPublicRoute);
router.use('/api/menu', menuItemPublicRoutes);
router.use('/api/table', tabPublicRoutes);
router.use('/api/menu/order', orderPublicRoutes);

// TODO move under auth after testing
router.use('/api/menu/order', orderPrivateRoutes);

router.use(auth);
router.use('/api/menu', menuItemPrivateRoutes);
router.use('/api/user', userPrivateRoute);
router.use('/api/organization', organizationPrivateRoute);
router.use('/api/category', categoryPrivateRoutes);

module.exports = router;
