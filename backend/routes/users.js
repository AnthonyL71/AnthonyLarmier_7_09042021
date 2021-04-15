const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Routes
// Signup route
router.post('/signup', userCtrl.create);
// Login route
router.post('/login', userCtrl.login);
// Deleted route
router.post('/deleted', userCtrl.deleted);

module.exports = router;