const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

// Routes Users

// Signup route
router.post('/signup', auth, userCtrl.create);
// Login route
router.post('/login', userCtrl.login);
// Deleted route
router.delete('/delete/:id', auth, userCtrl.delete);
// List users
router.get('/user', auth, userCtrl.searchuser);


module.exports = router;