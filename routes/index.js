const router = require('express').Router();

// Import your modular routers for /api and /html routes
const apiRouter = require('./apiRoutes');
const htmlRouter = require('./htmlRoutes');

// Use the modular routers
router.use('/api', apiRouter);
router.use('/', htmlRouter);

module.exports = router;
