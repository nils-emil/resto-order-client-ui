var router = require('express').Router();

router.use('/api', require('./api/menuItem'));

module.exports = router;