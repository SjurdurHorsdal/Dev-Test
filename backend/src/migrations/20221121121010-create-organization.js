'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.createTable('organizations', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          default: Sequelize.UUIDV4
        },
        name: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
    ])
  },
  async down(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.dropTable('organizations')
    ]);
  }
};