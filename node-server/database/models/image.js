const { Model, DataTypes } = require("sequelize");
const connection = require("../connection");

class Image extends Model {}

Image.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    modelName: "Images",
    sequelize: connection,
    paranoid: true,
    timestamps: true,
    underscored: true,
  }
);

module.exports = Image;
