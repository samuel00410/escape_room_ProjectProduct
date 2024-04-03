"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 對 Categories 資料表進行更新
    await queryInterface.sequelize.query(
      "ALTER TABLE `categories` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
    );

    // 對 EscapeRoomThemes 表進行更新
    await queryInterface.sequelize.query(
      "ALTER TABLE `escaperoomthemes` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
    );
  },

  async down(queryInterface, Sequelize) {
    // 回退 Categories 表的字符集到之前的設定
    await queryInterface.sequelize.query(
      "ALTER TABLE `categories` CONVERT TO CHARACTER SET latin1 COLLATE latin1_swedish_ci"
    );

    // 回退 EscapeRoomThemes 表的字符集到之前的設定
    await queryInterface.sequelize.query(
      "ALTER TABLE `escaperoomthemes` CONVERT TO CHARACTER SET latin1 COLLATE latin1_swedish_ci"
    );
  },
};
