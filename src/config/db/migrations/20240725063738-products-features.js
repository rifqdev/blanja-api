"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
      },
      price: {
        type: Sequelize.INTEGER,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      color: {
        type: Sequelize.JSON,
      },
      size: {
        type: Sequelize.JSON,
      },
      description: {
        type: Sequelize.TEXT,
      },
      photo: {
        type: Sequelize.JSON,
      },
      seller_id: {
        type: Sequelize.UUID,
      },
      category_id: {
        type: Sequelize.UUID,
      },
      sold: {
        type: Sequelize.INTEGER,
      },
      condition: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable("products");
  },
};
