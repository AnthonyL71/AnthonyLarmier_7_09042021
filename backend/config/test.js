module.exports = {
  TOKEN: " xm+Zp7tc3Zl+Bq9x#BmZKPZFQ_uy@w",
  HOST: "localhost", // Adresse du server mysql
  USER: "OC", // Utilisateur de la base de données
  PASSWORD: "openclassrooms", // Password de l'utilisateur de la base de données
  DB: "test", // Nom de la base de donnée
  dialect: "mysql", // Type de serveur de base de données
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};