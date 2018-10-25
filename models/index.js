require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} 
else if (env === "test") {
  sequelize = new Sequelize(
    process.env.LOCAL_TDB,
    process.env.LOCAL_USER,
    process.env.LOCAL_PWD,
    config,
  );
} else if(process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize(
    "testdb",
    process.env.LOCAL_USER || "travis",
    process.env.LOCAL_PWD || null,
    config,
  );
} else {
  sequelize = new Sequelize(
    process.env.LOCAL_DB,
    process.env.LOCAL_USER,
    process.env.LOCAL_PWD,
    config,
  );
}

fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  ))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
