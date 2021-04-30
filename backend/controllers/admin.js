const db = require("../models");
const Post = db.post;
const Comments = db.comments;
const User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Mail or password wrong.' });
      }
      bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(404).json({ error: 'Mail or password wrong.' });
        }
        if (user.admin === 1) {
            res.status(200).json({
            message: 'Admin auth.',
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
            });
        } else {
        res.status(403).json({error: "Is not admin user !" })
        }
      })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  };

exports.deletepost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id  } })
    .then(post => {        
        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }
        Post.destroy({ where: { id: req.params.id } })
        res.status(200).json({ message: 'Post deleted.', });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.updatepost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
    .then(post => {
        Post.update({ description: req.body.description },{ where: { id: req.params.id } })
    .then( () => {
        res.status(201).json({ message: 'Article updated successfully!' });
    })
    .catch( (error) => {
        res.status(404).json({ error: error });
    });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deletecomment = (req, res, next) => {
    Comments.findOne({ where: { id: req.params.id } })
    .then(comments => {
        Comments.destroy({ where: { id: req.params.id } })
        .then( () => {
            res.status(201).json({ message: 'Comments updated successfully!' });
        })
        .catch( (error) => {
          res.status(404).json({ error: error });
        });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.updatecomment = (req, res, next) => {
    Comments.findOne({ where: { id: req.params.id } })
    .then(comments => {
      Comments.update({ comment_text: req.body.comment_text },{ where: { id: req.params.id } })
      .then( () => {
        res.status(201).json({ message: 'Comments updated successfully!' });
      })
      .catch( (error) => {
          res.status(404).json({ error: error });
        });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deleteuser = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
    .then(user => {
        if (!user) {
        return res.status(404).json({ error: 'User not found.' });
        }
        User.destroy({ where: { email: req.body.email } })
        res.status(200).json({
            message: 'User deleted.',
        });
    })
    .catch(error => res.status(500).json({ error }));
};

