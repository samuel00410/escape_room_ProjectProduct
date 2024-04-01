"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("EscapeRoomThemes", "details", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {},
    });

    await queryInterface.addColumn("EscapeRoomThemes", "slideImageUrls", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("EscapeRoomThemes", "details");
    await queryInterface.removeColumn("EscapeRoomThemes", "slideImageUrls");
  },
};
