require('dotenv').config();

<<<<<<< HEAD
console.log('NODE ENV', process.env.NODE_ENV);
module.exports = {
  development: {
    username: process.env.LOCAL_USER,
    password: process.env.LOCAL_PWD,
    database: process.env.LOCAL_DB,
    host: 'localhost',
=======
module.exports = {
  development: {
    host: 'localhost',
    user: 'root',
    password: null,
>>>>>>> a3dfa12d3ab5e557aada909f0ff0c94cf7a03108
    dialect: 'mysql',
    operatorsAliases: false,
  },
  test: {
<<<<<<< HEAD
    username: process.env.LOCAL_USER,
    password: process.env.LOCAL_PWD,
    database: process.env.LOCAL_TDB,
=======
>>>>>>> a3dfa12d3ab5e557aada909f0ff0c94cf7a03108
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
