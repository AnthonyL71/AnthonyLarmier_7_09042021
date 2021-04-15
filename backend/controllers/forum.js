const db = require("../models");
const Post = db.post;
const Comments = db.comments;

// Search one sauce
exports.getone = (req, res, next) => {
    Post.findAll({ where: { id: req.params.id }})
    .then(
      (post) => {
        res.status(200).json(post)
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

// Search all
exports.viewall = (req, res, next) => {
    Post.findAll().then(
      (post) => {
        res.status(200).json(post);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

exports.create = (req, res, next) => {
    const article = {
        id: '',
        mail: req.body.mail,
        text: req.body.text,
        date: req.body.date
      };
    Post.create(article)
    Post.reload()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error create a new article."
        });
      });
};

exports.update = (req, res, next) => {
    Post.findOne({ where: { id: req.body.articlemodify.id } })
    .then(post => {
        Post.update({ text: req.body.articlemodify.text },{ where: { id: req.body.articlemodify.id } }).then(
        () => {
          res.status(201).json({
            message: 'Article updated successfully!'
          });
          console.log(post.text)
        }
      ).catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
      );
    })
      .catch(error => res.status(500).json({ error }));
};

exports.delete = (req, res, next) => {
    Post.findOne({ where: { id: req.body.id } })
        .then(post => {
        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }
            Post.destroy({ where: { id: req.body.id } })
            res.status(200).json({
            message: 'Post deleted.',
            });
        })
        .catch(error => res.status(500).json({ error }));
};