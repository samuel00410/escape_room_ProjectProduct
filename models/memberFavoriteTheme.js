"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MemberFavoriteTheme extends Model {
    static associate(models) {
      // define association here
      MemberFavoriteTheme.belongsTo(models.Member, { foreignKey: "memberId" }); // "memberId" 是指向 Member 表的外鍵
      MemberFavoriteTheme.belongsTo(models.EscapeRoomTheme, {
        foreignKey: "escapeRoomThemeId", // "escapeRoomThemeId" 是指向 EscapeRoomTheme 表的外鍵
      });
    }
  }
  MemberFavoriteTheme.init(
    {
      memberId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "members", // 注意這裡是資料表的名稱，可能需要根據您的實際資料表名稱進行調整
          },
          key: "id",
        },
      },
      escapeRoomThemeId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "escaperoomthemes", // 注意這裡是資料表的名稱，可能需要根據您的實際資料表名稱進行調整
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "MemberFavoriteTheme",
      tableName: "memberfavoritethemes",
    }
  );
  return MemberFavoriteTheme;
};
