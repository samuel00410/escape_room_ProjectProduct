const { DataTypes } = require("sequelize");
("use strict");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("questReservations", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "遊客姓名",
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "遊客電子郵件",
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "遊客電話號碼",
      },
      escapeRoomThemeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "escaperoomthemes",
          key: "id",
        },
        comment: "預訂的密室主題ID",
      },
      reservationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: "預訂的日期時間",
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
        type: Sequelize.ENUM("reserved", "completed", "cancelled"),
        allowNull: false,
        defaultValue: "reserved",
        comment:
          "預定狀態(reserved => '預約中',completed => '已遊玩,預約過期',cancelled => '取消預約')",
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
    await queryInterface.dropTable("questReservations");
  },
};
