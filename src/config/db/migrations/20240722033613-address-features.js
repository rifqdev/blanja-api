'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('address', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      address_as: {
        type: Sequelize.STRING(10)
      },
      recipient_name: {
        type: Sequelize.STRING(50)
      },
      recipient_phone_number: {
        type: Sequelize.STRING(13)
      },
      full_address: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.STRING(50)
      },
      pos_code: {
        type: Sequelize.STRING(10)
      },
      user_id: {
        type: Sequelize.UUID
      },
      primary_address: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
          type: Sequelize.DATE
      },
      updatedAt: {
          type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('address')
  }
};
