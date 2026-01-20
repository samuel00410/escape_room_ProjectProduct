const { DataTypes } = require("sequelize");
("use strict");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("memberreservations", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      memberId: {
        type: Sequelize.INTEGER,
        references: {
          model: "members",
          key: "id",
        },
        comment: "會員ID",
      },
      escapeRoomThemeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "escaperoomthemes",
          key: "id",
        },
        comment: "密室主題ID",
      },
      reservationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: "預約的日期時間",
      },
      people: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "人數",
      },
      totalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        comment: "總價格",
      },
      status: {
        type: Sequelize.ENUM("reserved", "completed", "cancelled"), // 使用ENUM來限制可能的值
        allowNull: false,
        defaultValue: "reserved", // 可能的狀態如 'reserved'(預約中), 'completed'(已闖關,預約過期), 'cancelled'(取消預約)
        comment:
          "'reserved'(預約中)、'completed'(已遊玩,預約過期)、'cancelled'(取消預約)",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("memberreservations");
  },
};
