const db = require("../models");
const Post = db.post;

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
  Post.findAll().then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({ error: error });
    }
  );
};

// Create new Post
exports.create = (req, res, next) => {
  const article = {
    profil_id: req.body.profil_id,
    media: req.body.media,
    description: req.body.description,
    posted_date: req.body.posted_date
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
  Post.findOne({ where: { id: req.params.id } })
  .then(post => {
    if (post.profil_id === req.body.profil_id) {
      Post.update({ description: req.body.description },{ where: { id: req.params.id } })
    .then( () => {
      res.status(201).json({ message: 'Article updated successfully!' });
    })
    .catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
    } else {
			res.status(403).json({error: "Is not your post !" })
    }
  })
  .catch(error => res.status(500).json({ error }));
};


exports.delete = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id  } })
    .then(post => {
      if (post.profil_id === req.body.profil_id) {
        if (!post) {
          return res.status(404).json({ error: 'Post not found.' });
        }
        Post.destroy({ where: { id: req.params.id } })
        res.status(200).json({ message: 'Post deleted.', });
      } else {
        res.status(403).json({error: "Is not your post !" })
      }
    })
    .catch(error => res.status(500).json({ error }));
};