"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING(10),
      },
      birth: {
        type: Sequelize.STRING(50),
      },
      photo: {
        type: Sequelize.STRING(255),
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
      },
      address: {
        type: Sequelize.TEXT,
      },
      account_type: {
        type: Sequelize.STRING(15),
      },
      store_name: {
        type: Sequelize.STRING(50),
      },
      store_description: {
        type: Sequelize.TEXT,
      },
      token: {
        type: Sequelize.STRING(32),
      },
      wallet: {
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
    await queryInterface.dropTable("users");
  },
};
