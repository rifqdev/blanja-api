"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cart", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      custommer_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      seller_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.STRING,
      },
      storage: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
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
    // Hapus constraint foreign key dari tabel 'products'
    // await queryInterface.removeConstraint("products", "products_product_id_foreign_idx");

    await queryInterface.dropTable("cart");
  },
};
