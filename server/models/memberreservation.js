"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MemberReservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MemberReservation.belongsTo(models.Member, { foreignKey: "memberId" });
      MemberReservation.belongsTo(models.EscapeRoomTheme, {
        foreignKey: "escapeRoomThemeId",
      });
    }
  }
  MemberReservation.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      memberId: { type: DataTypes.INTEGER, allowNull: false },
      escapeRoomThemeId: { type: DataTypes.INTEGER, allowNull: false },
      reservationDate: { type: DataTypes.DATE, allowNull: false },
      people: { type: DataTypes.INTEGER, allowNull: false },
      totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      status: {
        type: DataTypes.ENUM("reserved", "completed", "cancelled"), // 使用ENUM來限制可能的值
        allowNull: false,
        defaultValue: "reserved", // 預設值是已預約，可能的狀態如 'reserved'(已預約), 'completed'(已闖關,預約過期), 'cancelled'(取消預約)
      },
    },
    {
      sequelize,
      modelName: "MemberReservation",
      tableName: "memberreservations",
    }
  );
  return MemberReservation;
};
