require('dotenv').config();

const config = {
  port: 5000,
  DB_FILE_NAME: "db.sqlite",
  API_KEY_JWT: process.env.API_KEY_JWT,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
};

module.exports = config;
