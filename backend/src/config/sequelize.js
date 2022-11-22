require('dotenv').config();

module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    port: process.env.PORT,
    host: process.env.DB_HOST,
    storage: process.env.DB_STORAGE,
    dialect: process.env.DB_DIALECT
};


