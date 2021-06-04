const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
          userId: user.id,
          profile: user.admin,
          token: jwt.sign(
            { userId: user._id },
            process.env.SECRET_RANDOM_TOKEN,
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
  // Regex for password complicated
  var regex = new RegExp("^(?=.{5,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
  if (regex.test(req.body.password) == false) {
     res.status(400).json({ error: 'Mot de passe pas assez sécurisé ! [A-Z and a-Z] ou [a-z and 0-9] minimum 5 caractères' }) 
  } else {
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
  }
  };

// Deleted user
exports.delete = (req, res, next) => {
  let userId = req.headers.authorization.split(' ')[3];
  let profil_user = req.headers.authorization.split(' ')[2];
  User.findOne({ where: { id: req.params.id } })
    .then(user => {
      if (user.id == userId) {
        User.destroy({ where: { id: req.params.id } })
        res.status(200).json({
          message: 'User deleted.',
        });
      } else {
        if (profil_user == 1) {
          User.destroy({ where: { id: req.params.id } })
          res.status(200).json({
            message: 'User deleted.',
          });
        }
    }
    })
    .catch(error => res.status(500).json({ error }));
};

// Deleted a new user
exports.searchuser = (req, res, next) => {
  User.findAll({})
    .then(user => {
        let list = {id: user.id, firstname: user.firstname, lastname: user.lastname, avatar: user.avatar};
        res.status(200).json(user);
      })
    .catch(error => res.status(500).json({ error }));
};
