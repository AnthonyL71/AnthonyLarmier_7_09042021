const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

// Routes
// Signup route
router.post('/signup', userCtrl.create);
// Login route
router.post('/login', userCtrl.login);
// Deleted route
router.delete('/delete/:id', auth, userCtrl.delete);

router.get('/user/:id', auth, userCtrl.searchuser);


module.exports = router;