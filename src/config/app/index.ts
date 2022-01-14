


import { $log } from "@tsed/logger";

/**
 * Return all the config from this file only
 */

const fs = require("fs"),
  nconf = require("nconf"),
  // env = process.env.NODE_ENV || "dev";
  env = "dev";

$log.info(`NODE_ENV was ===> ${env}`);


nconf
  .argv()
  .env()
  .file({ file: `src/config/app/config.${env}.json` });

const config: any = {};


//********DB-CONFIG********
config.database = nconf.get('database');
config.mongoUrl = (() => {
  const db = nconf.get("database");
  //when developing locally v/s when deployed in stage/prod env (there we use replica set)
  if (["local"].includes(env))
    return `${db.client}://${db.dev.host}:${db.dev.port1},${db.dev.host}:${db.dev.port2},${db.dev.host}:${db.dev.port3}/${db.db_name}`;
  else
    return `${db.client}://${db.replica_1.host}:${db.replica_1.port},${db.replica_2.host}:${db.replica_2.port},${db.replica_3.host}:${db.replica_3.port}/${db.db_name}`;
})();


//********APP-CONFIG********
config.isProd = (() => {
  if (process && process.env && process.env.NODE_ENV && process.env.NODE_ENV === "prod") {
    return true;
  } else {
    return false;
  }
})();

config.isDev = (() => {
  if (process && process.env && process.env.NODE_ENV && process.env.NODE_ENV === "dev") {
    return true;
  } else {
    return false;
  }
})();

config.isLocal = (() => {
  if (process && process.env && process.env.NODE_ENV && process.env.NODE_ENV === "local") {
    return true;
  } else {
    return false;
  }
})();

config.appName = (() => {
  return nconf.get("application").name;
})();

config.port = (() => {
  return nconf.get("application").port;
})();

config.dbName = (() => {
  return nconf.get("database").db_name;
})();









//********SWAGGER-CONFIG********
config.getSwaggerList = (() => {


  //swagger is not shown in PROD
  if (["prod"].includes(env)) {
    $log.info("SWAGGER ui is DISABLED...")
    return []
  } else {
    $log.info("SWAGGER ui is ENABLED...")
    return [
      {
        path: "/v2/docs",
        specVersion: "2.0",
        options: {
          tagsSorter: "alpha",
          operationsSorter: "method"
        }
      },
      {
        path: "/v3/docs",
        specVersion: "3.0.1",
        options: {
          tagsSorter: "alpha",
          operationsSorter: "method"
        }
      }
    ]
  }
})();







export const AppConfig = config;
