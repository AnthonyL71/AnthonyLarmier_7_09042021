const db = require("../models");
const bcrypt = require('bcrypt');
const User = db.user;
const Op = db.Sequelize.Op;


 // Login user
 exports.login = (req, res, next) => {
  User.findOne({ where: { mail: req.body.mail } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Mail not found.' });
      }
      bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(404).json({ error: 'Password wrong.' });
        }
        res.status(200).json({
          message: 'User auth.',
          userId: user._id,
        });
      })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


// Create a new user
exports.create = (req, res) => {
  User.findOne({ where: { mail: req.body.mail } })
  .then(user => {
    if (user) {
      return res.status(404).json({ error: 'Mail already found !' });
    }
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const newuser = {
        mail: req.body.mail,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
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
exports.deleted = (req, res, next) => {
  User.findOne({ where: { mail: req.body.mail } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Mail not found.' });
      }
      bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(404).json({ error: 'Password wrong.' });
        }
        User.destroy({ where: { mail: req.body.mail } })
        // clé étrangere en mode cascade
        // ajout avatar
        res.status(200).json({
          message: 'Mail deleted.',
        });
      })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
