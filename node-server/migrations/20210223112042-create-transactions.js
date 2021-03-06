'use strict';

const { UUIDV4 } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Transactions',
      {
        id: {
          type: Sequelize.UUID,
          default: Sequelize.UUIDV4,
          primaryKey: true
        },
        status: {
          type: Sequelize.STRING(25),
          allowNull: false
        },
        user_id: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        total_payment: {
          type: Sequelize.FLOAT(10),
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
    return queryInterface.dropTable('Transactions')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
