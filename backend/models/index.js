
const Sequelize = require("sequelize");
const sequelize = new Sequelize( process.env.DB,  process.env.USER,  process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.dialect,
  operatorsAliases: false,

  pool: {
    max: process.env.pool.max,
    min: process.env.pool.min,
    acquire: process.env.pool.acquire,
    idle: process.env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./users.js")(sequelize, Sequelize);
db.post = require("./posts.js")(sequelize, Sequelize);
db.comments = require("./comments.js")(sequelize, Sequelize);


module.exports = db;