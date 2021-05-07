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
router.post('/', auth, postsCtrl.create);
// Modified article
router.put('/:id', auth, postsCtrl.update);
// Deleted article
router.delete('/:id', auth, postsCtrl.delete);
// Validate new article
router.post('/validate/:id', auth, postsCtrl.validateposts);


// Routes Comments
// View all post 
router.get('/post/:id', auth, commentsCtrl.getcomments);
// Create post
router.post('/post', auth, commentsCtrl.createcomments);
// Modified comments
router.put('/post/:id', auth, commentsCtrl.updatecomments);
// Modified comments
router.delete('/post/:id', auth, commentsCtrl.deletecomments);
// Modified comments
router.post('/post/validate/:id', auth, commentsCtrl.validatecomments);


module.exports = router;