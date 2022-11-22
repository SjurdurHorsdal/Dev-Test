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
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        OrganizationId: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: 'organizations',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
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