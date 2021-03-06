'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Products',
      {
        id: {
          type: Sequelize.UUID,
          default: Sequelize.UUIDV4,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        description: {
          type: Sequelize.STRING
        },
        stock: {
          type: Sequelize.INTEGER(10),
          allowNull: false
        },
        price: {
          type: Sequelize.FLOAT(10),
          foreignKey: true,
          allowNull: false
        },
        discount: {
          type: Sequelize.FLOAT(10),
          foreignKey: true,
          allowNull: false
        },
        sex: {
          type: Sequelize.STRING(25),
          allowNull: false
        },
        color: {
          type: Sequelize.STRING(25),
          allowNull: false
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
    return queryInterface.dropTable('Products')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
