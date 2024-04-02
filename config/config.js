require("dotenv").config();

let url = process.env.CLEARDB_DATABASE_URL;
let match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^\/]+)\/([^?]+)/);

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    timezone: "+08:00", // 添加這行來設置時區為 UTC+8
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    timezone: "+08:00", // 添加這行來設置時區為 UTC+8
  },
  production: {
    username: match[1],
    password: match[2],
    database: match[4],
    host: match[3],
    dialect: "mysql",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    timezone: "+08:00", // 添加這行來設置時區為 UTC+8
  },
};
