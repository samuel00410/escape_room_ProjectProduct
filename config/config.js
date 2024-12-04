require("dotenv").config();

let url = process.env.GOOGLE_CLOUD_DATABASE_URL;

if (!url) {
  throw new Error(
    "GOOGLE_CLOUD_DATABASE_URL is not defined in the environment variables."
  );
}

// let match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^\/]+)\/([^?]+)/);
// if (!match) {
//   throw new Error("GOOGLE_CLOUD_DATABASE_URL format is invalid.");
// }

let match = url.match(
  /^mysql:\/\/([^:]+):([^@]+)@([^:\/]+)(?::(\d+))?\/([^?]+)$/
);
if (!match) {
  throw new Error(
    "GOOGLE_CLOUD_DATABASE_URL format is invalid. Ensure it follows the format: mysql://username:password@host:port/database"
  );
}

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
    database: match[5],
    host: match[3],
    port: match[4] || 3306, // 默認使用 3306 埠
    dialect: "mysql",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    timezone: "+08:00", // 添加這行來設置時區為 UTC+8
  },
};
