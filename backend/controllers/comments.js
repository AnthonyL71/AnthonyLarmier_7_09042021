const db = require("../models");
const Post = db.post;
const Comments = db.comments;


// Search comments by Post
exports.getcomments = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id }})
  .then(
    (post) => {
      Comments.findAll({ where: { post_id: post.id }})
      .then(
        (comments) => {
          res.status(200).json(comments)
        }
      )
      .catch(
        (error) => {
          res.status(404).json({ error: error });
        }
      );
    }
  ).catch(
    (error) => {
      res.status(404).json({ error: error });
    }
  );
};

// Create new comments
exports.createcomments = (req, res, next) => {
  const newcomments = {
      profil_id: req.body.profil_id,
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      comment_date: req.body.date
  };
  Comments.create(newcomments)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({ message: err.message || "Error create a new comment." });
  });
};

// Update comments
exports.updatecomments = (req, res, next) => {
  Comments.findOne({ where: { id: req.params.id } })
  .then(comments => {
    if (comments.profil_id === req.body.profil_id) {
    Comments.update({ comment_text: req.body.comment_text },{ where: { id: req.params.id } })
    .then( () => {
      res.status(201).json({ message: 'Comments updated successfully!' });
    })
    .catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
    } else {
			res.status(403).json({error: "Is not your comments !" })
    }
  })
  .catch(error => res.status(500).json({ error }));
};

