const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoutes = require('./homeRoutes');

router.use('/api', apiRoutes);
router.use('/home', homeRoutes);

module.exports = router;