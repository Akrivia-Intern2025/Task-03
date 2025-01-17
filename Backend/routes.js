const express = require('express');
const authRoutes = require('./routes/authRoutes');
const router = express.Router();

router.use('/auth', authRoutes);

module.exports = router;