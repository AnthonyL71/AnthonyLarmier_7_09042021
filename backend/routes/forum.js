const express = require('express');
const router = express.Router();
const forumCtrl = require('../controllers/forum');

// Routes
// View all article
router.get('/', forumCtrl.viewall);
// View One article
router.get('/:id', forumCtrl.getone);
// Create article
router.post('/create', forumCtrl.create);
// Modified article
router.put('/update', forumCtrl.update);
// Deleted article
router.post('/delete', forumCtrl.delete);


module.exports = router;