require('dotenv').config();

module.exports = {
  development: {
    username: process.env.LOCAL_USER,
    password: process.env.LOCAL_PWD,
    database: process.env.LOCAL_DB,
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
  },
  test: {
    username: process.env.LOCAL_USER,
    password: process.env.LOCAL_PWD,
    database: process.env.LOCAL_TDB,
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    operatorsAliases: false,
  },
  production: {
    use_env_variable: 'JAWSDB_URL',
    dialect: 'mysql',
  },
};
