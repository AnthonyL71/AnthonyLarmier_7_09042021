module.exports = function(sequelize, Sequelize) {
  const Post = sequelize.define("post", {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mail: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    text: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    date: {
      type: Sequelize.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'post',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Post;
};
