const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbConfig = require("../config/config.js");
const User = db.user;

 // Login user
 exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Mail or password not found.' });
      }
      bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(404).json({ error: 'Mail or password wrong.' });
        }
        res.status(200).json({
          message: 'User auth.',
          userId: user._id,
          profile: user.admin,
          profil_id: user.id,
          token: jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          )
        });
      })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


// Create a new user
exports.create = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
  .then(user => {
    if (user) {
      return res.status(404).json({ error: 'Mail already found !' });
    }
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const newuser = {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        avatar: req.body.avatar,
        password: hash,
        admin: 0
      };
    User.create(newuser)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error created new user."
        });
      });
    });
  })
  .catch(error => res.status(500).json({ error }));
  };

// Deleted a new user
exports.delete = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => {
      let profil_user = req.headers.authorization.split(' ')[2];
      if (profil_user == 1) {
        User.destroy({ where: { id: req.params.id } })
      } else {
        if (!user) {
          return res.status(404).json({ error: 'Mail or password wrong.' });
        }
          User.destroy({ where: { id: req.params.id } })
          res.status(200).json({
            message: 'User deleted.',
          });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

// Deleted a new user
exports.searchuser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => {
        let list = {id: user.id, firstname: user.firstname, lastname: user.lastname, avatar: user.avatar, email: user.email};
        res.status(200).json(list);
      })
    .catch(error => res.status(500).json({ error }));
};
