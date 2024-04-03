"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("escaperoomthemes", "details", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {},
    });

    await queryInterface.addColumn("escaperoomthemes", "slideImageUrls", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("escaperoomthemes", "details");
    await queryInterface.removeColumn("escaperoomthemes", "slideImageUrls");
  },
};
