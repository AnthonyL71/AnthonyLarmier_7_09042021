var DataTypes = require("sequelize").DataTypes;
var _comments = require("./comments");
var _posts = require("./posts");
var _users = require("./users");

function initModels(sequelize) {
  var comments = _comments(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  comments.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(comments, { as: "comments", foreignKey: "post_id"});
  comments.belongsTo(users, { as: "profil", foreignKey: "profil_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "profil_id"});
  posts.belongsTo(users, { as: "profil", foreignKey: "profil_id"});
  users.hasMany(posts, { as: "posts", foreignKey: "profil_id"});

  return {
    comments,
    posts,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
