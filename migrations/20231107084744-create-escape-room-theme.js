"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EscapeRoomThemes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "categories", // 將 categoryID 設定成 外鍵(對應到 categories資料表 的主鍵 id)
          },
          key: "id", // categories 資料表的主鍵 id
        },
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      difficultyLevel: {
        type: Sequelize.INTEGER,
      },
      minimumPlayers: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      maximumPlayers: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      duration: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      imageURL: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("EscapeRoomThemes");
  },
};
