"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      order_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      delivery_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      custommer_id: {
        type: Sequelize.UUID,
      },
      seller_id: {
        type: Sequelize.UUID,
      },
      custommer_address: {
        type: Sequelize.JSON,
      },
      status: {
        type: Sequelize.STRING,
      },
      products: {
        type: Sequelize.JSON,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("order");
  },
};
