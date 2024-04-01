"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
      Category.hasMany(models.EscapeRoomTheme, {
        foreignKey: "categoryID",
        as: "escaperoomthemes", // 定義關聯的別名
      });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Category",
      charset: "utf8mb4", // 遇到與 Unicode 字符（如中文字符）存儲有關的問題時，您需要確保數據庫和數據表使用 utf8mb4 字符集
      collate: "utf8mb4_unicode_ci",
    }
  );
  return Category;
};
