const { Model, DataTypes } = require("sequelize");
const connection = require("../connection");

class Transaction extends Model {}

Transaction.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  status: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  total_payment: {
    type: DataTypes.FLOAT(10),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    default: new Date(),
  },
  updated_at: {
    type: DataTypes.DATE,
    default: new Date(),
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
}, {
    modelName: 'Transactions',
    sequelize: connection,
    paranoid: true,
    timestamps: true,
    underscored: true
});

module.exports = Transaction
