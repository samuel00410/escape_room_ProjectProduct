// config/logger.js 日誌庫來將日誌寫入文件
const winston = require("winston");
const path = require("path");
const moment = require("moment");

// 定義日誌文件的存放目錄
const logDir = "logs";
// 定義錯誤日誌文件的完整路徑
const errorFilePath = path.join(logDir, "logErrors.log");
// 定義綜合日誌文件的完整路徑
const combinedFilePath = path.join(logDir, "logCombined.log");

// 配置日誌文件
const logger = winston.createLogger({
  // 層級
  level: "info",
  // 格式
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => moment().format("YYYY-MM-DD HH:mm:ss"), //自定義時間戳格式
    }),
    winston.format.json(), // 将日志信息格式化为 JSON
    winston.format.prettyPrint() // 以美观的方式打印日志信息
  ),
  // 定義輸出目標
  transports: [
    // 在控制台输出日志
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.colorize()
      ),
    }),
    // 将所有级别的日志记录到一个文件中
    new winston.transports.File({ filename: combinedFilePath }),
    // 将所有级别的日志记录到一个文件中
    new winston.transports.File({ level: "warn", filename: errorFilePath }),
  ], // 這將使 Sequelize 的所有查詢日誌被寫入到 combined.log 文件中 (日誌會同時記錄到 combined.log 文件和控制台。)
});

// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   );
// }

module.exports = logger;
