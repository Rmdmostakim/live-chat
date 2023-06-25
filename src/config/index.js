require("dotenv").config();
const config = {};

const development = {
  port: process.env.DEVELOPMENT_SERVER_PORT,
  app_key: process.env.DEVELOPMENT_APP_KEY,
  db: process.env.DEVELOPMENT_DATABASE,
};
const production = {
  port: process.env.PRODUCTION_SERVER_PORT,
  app_key: process.env.PRODUCTION_APP_KEY,
  db: process.env.PRODUCTION_DATABASE,
};

const currentEnvironment = process.env.NODE_ENV;

config.environment = () => {
  if (
    typeof currentEnvironment === "string" &&
    currentEnvironment === "production"
  ) {
    return production;
  } else {
    return development;
  }
};

module.exports = config;