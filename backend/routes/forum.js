const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postsCtrl = require('../controllers/posts');
const commentsCtrl = require('../controllers/comments');
const multer = require('../middleware/multer');

// Routes Postes
// View all article
router.get('/', auth, postsCtrl.viewall);
// View One article
router.get('/:id', auth, postsCtrl.getone);
// Create article
router.post('/create', auth, postsCtrl.create);
// Modified article
router.put('/update/:id', auth, postsCtrl.update);
// Deleted article
router.delete('/delete/:id', auth, postsCtrl.delete);


// Routes Comments
// View all post 
router.get('/post/:id', auth, commentsCtrl.getcomments);
// Create post
router.post('/post/create', auth, commentsCtrl.createcomments);
// Modified comments
router.put('/post/update/:id', auth, commentsCtrl.updatecomments);


module.exports = router;