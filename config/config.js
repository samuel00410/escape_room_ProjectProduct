require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    timezone: "+08:00",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    timezone: "+08:00",
  },
  production: {
    // 支持 Railway, 和其他云平台
    username: process.env.DB_USERNAME || process.env.MYSQLUSER || process.env.MYSQL_USER,
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD,
    database: process.env.DB_DATABASE || process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE,
    host: process.env.DB_HOST || process.env.MYSQLHOST || process.env.MYSQL_HOST,
    port: process.env.MYSQLPORT || process.env.MYSQL_PORT || 3306,
    dialect: "mysql",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    timezone: "+08:00",
  },
};
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
