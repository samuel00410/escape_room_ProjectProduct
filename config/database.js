// // config/database.js  創建Sequelize實例，配置日誌選項
// const Sequelize = require("sequelize");
// const env = process.env.NODE_ENV || "development"; //確認當前環境
// const config = require("./config.json")[env]; // 從 config.json 加載對應環境的配置
// const logger = require("./logger"); // 引入 Winston 日誌記錄器

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   {
//     host: config.host,
//     dialect: config.dialect,
//     logging: (msg) => logger.info(msg), // 使用 Winston 記錄 SQL 日誌
//   }
// );

// module.exports = sequelize;
