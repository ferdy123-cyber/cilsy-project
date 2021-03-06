'use strict';

const { DATE } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Orders',
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
        product_price: {
          type: Sequelize.FLOAT(10),
          allowNull:false
        },
        product_discount: {
          type: Sequelize.FLOAT(10),
          allowNull:false
        },
        product_qty: {
          type: Sequelize.INTEGER(10),
          allowNull:false
        },
        user_id: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDeleted: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        transaction_id: {
          type: Sequelize.UUID,
          references: {
            model: 'Transactions',
            key: 'id'
          },
          onDeleted: 'CASCADE',
          onUpdate: 'CASCADE'
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
    return queryInterface.dropTable('Orders')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
