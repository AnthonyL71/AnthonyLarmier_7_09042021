const db = require("../models");
const Post = db.post;
const fs = require('fs');

// Search one Post
exports.getone = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id }})
    .then(
      (post) => {
        res.status(200).json(post)
      }
    ).catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
};


// Search all Postes
exports.viewall = (req, res, next) => {
  Post.findAll({
    order: [['id', 'DESC']]}).then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({ error: error });
    }
  );
};

// Search post not validate for admin
exports.searchnotvalid = (req, res, next) => {
  let profil_user = req.headers.authorization.split(' ')[2];
    if (profil_user == 1) {
    Post.findAll({
      order: [['id', 'DESC']]}).then(
      (post) => {
        res.status(200).json(post);
      }
    ).catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
  } else {
    res.status(403).json({error: "You are not admin !" })
  }
};

// Validate new Post

exports.validateposts = (req, res, next) => {
  Post.findAll({ where: { id: req.params.id, }})
  .then(
    (post) => {
      let profil_user = req.headers.authorization.split(' ')[2];
        if (profil_user == 1) {
          Post.update({ validate: 1 },{ where: { id: req.params.id } })
          .then( () => {
            res.status(201).json({ message: 'Post validate!' });
          })
          .catch(
          (error) => {
            res.status(404).json({ error: error });
          }
          );
        } else {
          res.status(403).json({error: "You are not admin !" })
        }
      }
  )
  .catch(
    (error) => {
      res.status(404).json({ error: error });
    }
  );
};

// Create new Post
exports.create = (req, res, next) => {
  let userId = req.headers.authorization.split(' ')[3];
  console.log(req.file.filename);
  const article = {
    profil_id: userId,
		media: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename,
    description: req.body.description,
    posted_date: req.body.posted_date,
    validate: 0
  };
  Post.create(article)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({ message: err.message || "Error create a new article." });
  });
};

// Update Post
exports.update = (req, res, next) => {
  let userId = req.headers.authorization.split(' ')[3];
  Post.findOne({ where: { id: req.params.id } })
  .then(post => {
    if (post.profil_id == userId) {
      let img = post.media.split('/images/')[1];
      fs.unlink("images/"+ img, () => {
        Post.update({ description: req.body.description, media: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename, validate: 0 },{ where: { id: req.params.id } })
          .then( () => {
            res.status(201).json({ message: 'Article updated successfully!' });
          })
          .catch(
            (error) => {
              res.status(404).json({ error: error });
            }
          );
      });
    } else {
			res.status(403).json({error: "Is not your post !" })
    }
  })
  .catch(error => res.status(500).json({ error }));
};

// Deleted post
exports.delete = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id  } })
    .then(post => {
      let userId = req.headers.authorization.split(' ')[3];
      let profil_user = req.headers.authorization.split(' ')[2];
      let img = post.media.split('/images/')[1];
      if (post.profil_id == userId) {
        if (!post) {
          return res.status(404).json({ error: 'Post not found.' });
        }
        fs.unlink("images/"+ img, () => {
        Post.destroy({ where: { id: req.params.id } })
        res.status(200).json({ message: 'Post deleted.', });
        });
      } else {
        if (profil_user == 1) {
          fs.unlink("images/"+ img, () => {
            Post.destroy({ where: { id: req.params.id } }) 
            res.status(200).json({ message: 'Post deleted.', });
          });
        } else {
          res.status(403).json({error: "Is not your post !" })
        }
      }
    })
    .catch(error => res.status(500).json({ error }));
};