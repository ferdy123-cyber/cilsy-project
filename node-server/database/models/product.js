const { Model, DataTypes } = require("sequelize");
const connection = require("../connection");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT(10),
      foreignKey: true,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT(10),
      foreignKey: true,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
  },
  {
    modelName: "Products",
    sequelize: connection,
    paranoid: true,
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

module.exports = Product;
