"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 首先為所有現有的 NULL 條目設置一個預設值
    await queryInterface.sequelize.query(
      `UPDATE \`EscapeRoomThemes\` SET \`isActive\`=true WHERE \`isActive\` IS NULL;`
    );

    // 然後變更欄位，添加 NOT NULL 約束和預設值
    await queryInterface.changeColumn("EscapeRoomThemes", "isActive", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // 移除 NOT NULL 約束時不需要處理現有數據
    await queryInterface.changeColumn("EscapeRoomThemes", "isActive", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    });
  },
};
