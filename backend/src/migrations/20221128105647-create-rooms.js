'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.createTable('rooms', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          default: Sequelize.UUIDV4
        },
        name: {
          type: Sequelize.STRING
        },
        organizationId: {
          allowNull: null,
          type: Sequelize.UUID,
          references: {
            key: 'id',
            model: 'organizations'
          },
          onDelete: 'CASCADE'
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
    ]);
  },
  async down(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.dropTable('rooms')
    ])
  }
};