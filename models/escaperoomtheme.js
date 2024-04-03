"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EscapeRoomTheme extends Model {
    static associate(models) {
      // define association here
      EscapeRoomTheme.belongsTo(models.Category, {
        foreignKey: "categoryID", // foreignKey: "categoryID" 是 EscapeRoomTheme 表中用來連接 Category 表的外鍵。
        as: "categories", // 定義關聯的別名
      });

      EscapeRoomTheme.belongsToMany(models.Member, {
        through: models.MemberFavoriteTheme,
        foreignKey: "escapeRoomThemeId", // 這表示在 Memberfavoritetheme 表中會有一個 escapeRoomThemeId 列指向 EscapeRoomTheme 表的主鍵。
        as: "favoritedByMembers", // as 用於在 Sequelize 查詢中引用這些關聯。例如，如果您想獲得該密室主題有哪個會員收藏時候，您可以在查詢 EscapeRoomTheme 模型時使用 favoritedByMembers 這個別名。
      });

      // 對MemberReservations(會員預約)的關聯
      EscapeRoomTheme.hasMany(models.MemberReservation, {
        foreignKey: "escapeRoomThemeId",
        as: "reservationsByMembers",
      });

      // 對 QuestReservations(訪客預約)的關聯
      EscapeRoomTheme.hasMany(models.QuestReservation, {
        foreignKey: "escapeRoomThemeId",
        as: "reservationsByQuests",
      });
    }
  }
  EscapeRoomTheme.init(
    {
      categoryID: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      storyContent: { type: DataTypes.TEXT, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      difficultyLevel: DataTypes.INTEGER,
      minimumPlayers: { type: DataTypes.INTEGER, allowNull: false },
      maximumPlayers: { type: DataTypes.INTEGER, allowNull: false },
      duration: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      details: { type: DataTypes.JSON, allowNull: false },
      imageURL: { type: DataTypes.STRING, allowNull: false },
      slideImageUrls: { type: DataTypes.JSON, allowNull: false },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      sequelize,
      modelName: "EscapeRoomTheme",
      tableName: "escaperommthemes",
      charset: "utf8mb4", // 遇到與 Unicode 字符（如中文字符）存儲有關的問題時，您需要確保數據庫和數據表使用 utf8mb4 字符集
      collate: "utf8mb4_unicode_ci",
    }
  );
  return EscapeRoomTheme;
};
