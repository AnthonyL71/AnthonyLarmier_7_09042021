const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postsCtrl = require('../controllers/posts');
const commentsCtrl = require('../controllers/comments');
const adminCtrl = require('../controllers/admin');

// Routes Admin
// Login admin
router.post('/login', adminCtrl.login);
// Delete post
router.delete('/post/delete/:id', auth, adminCtrl.deletepost);
// Modified post
router.put('/post/update/:id', auth, adminCtrl.updatepost);
// Delete comment
router.delete('/comment/delete/:id', auth, adminCtrl.deletecomment);
// Modified comment
router.put('/comment/update/:id', auth, adminCtrl.updatecomment);
// Delete user
router.delete('/user/:id', auth, adminCtrl.deleteuser);



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
router.post('/post', auth, commentsCtrl.createcomments);
// Modified comments
router.put('/post/:id', auth, commentsCtrl.updatecomments);


module.exports = router;