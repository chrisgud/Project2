require('dotenv').config();

module.exports = {
  development: {
    host: 'localhost',
    user: 'root',
    password: null,
    dialect: 'mysql',
    operatorsAliases: false,
  },
  test: {
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
