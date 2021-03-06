const { Model, DataTypes } = require("sequelize");
const connection = require("../connection");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    product_price: {
      type: DataTypes.FLOAT(10),
      allowNull: false,
    },
    product_discount: {
      type: DataTypes.FLOAT(10),
      allowNull: false,
    },
    product_qty: {
      type: DataTypes.INTEGER(10),
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
  },
  {
    modelName: "Orders",
    sequelize: connection,
    paranoid: true,
    timestamps: true,
    underscored: true,
  }
);

module.exports = Order;
