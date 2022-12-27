const express = require('express');
const router = express.Router();
//setting routes***********************************

const admin = require('./adminRouter');
router.use('/admin', admin);

module.exports = router;
