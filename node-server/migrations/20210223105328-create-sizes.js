'use strict';

const sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Sizes',
      {
        id: {
          type: Sequelize.UUID,
          default: Sequelize.UUIDV4,
          primaryKey: true
        },
        product_id: {
          type: Sequelize.UUID,
          references: {
            model: 'Products',
            key: 'id'
          },
          onDeleted: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        size: {
          type: sequelize.STRING(25),
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          default: new Date()
        },
        updated_at: {
          type: Sequelize.DATE,
          default: new Date()
        },
        deleted_at: {
          type: Sequelize.DATE
        }
      }
    )
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sizes')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
