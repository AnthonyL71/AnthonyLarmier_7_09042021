
const Sequelize = require("sequelize");
const sequelize = new Sequelize( process.env.BDD_DB,  process.env.BDD_USER,  process.env.BDD_PASSWORD, {
  host: process.env.BDD_HOST,
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./users.js")(sequelize, Sequelize);
db.post = require("./posts.js")(sequelize, Sequelize);
db.comments = require("./comments.js")(sequelize, Sequelize);


module.exports = db;