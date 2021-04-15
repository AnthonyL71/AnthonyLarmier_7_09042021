var DataTypes = require("sequelize").DataTypes;
var _comments = require("./comments");
var _post = require("./post");
var _user = require("./user");

function initModels(sequelize) {
  var comments = _comments(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    comments,
    post,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
